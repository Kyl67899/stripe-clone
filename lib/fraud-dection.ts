// Fraud Detection Service using Hugging Face ML models
interface FraudFeatures {
    amount: number
    currency: string
    cardNumber: string
    email: string
    userAgent?: string
    ipAddress?: string
    timestamp: string
    userHistory?: {
      totalTransactions: number
      averageAmount: number
      lastTransactionDate?: string
    }
  }
  
  interface FraudPrediction {
    riskScore: number
    riskLevel: "low" | "medium" | "high" | "critical"
    confidence: number
    reasons: string[]
    modelVersion: string
  }
  
  export class FraudDetectionService {
    private static instance: FraudDetectionService
    private modelEndpoint = "https://api-inference.huggingface.co/models/microsoft/DialoGPT-medium"
    private apiKey = process.env.HUGGINGFACE_API_KEY
  
    static getInstance(): FraudDetectionService {
      if (!FraudDetectionService.instance) {
        FraudDetectionService.instance = new FraudDetectionService()
      }
      return FraudDetectionService.instance
    }
  
    // Extract features from payment data for ML analysis
    private extractFeatures(paymentData: any): FraudFeatures {
      const features: FraudFeatures = {
        amount: paymentData.amount,
        currency: paymentData.currency || "usd",
        cardNumber: paymentData.cardNumber,
        email: paymentData.email,
        userAgent: paymentData.userAgent,
        ipAddress: paymentData.ipAddress,
        timestamp: new Date().toISOString(),
        userHistory: paymentData.userHistory,
      }
  
      return features
    }
  
    // Analyze card number patterns for known fraud indicators
    private analyzeCardPattern(cardNumber: string): { score: number; reasons: string[] } {
      const cleanCard = cardNumber.replace(/\s/g, "")
      const reasons: string[] = []
      let score = 0
  
      // Check for sequential numbers (potential test cards)
      if (/(\d)\1{3,}/.test(cleanCard)) {
        score += 0.3
        reasons.push("Repeated digit pattern detected")
      }
  
      // Check for sequential patterns
      if (/(?:0123|1234|2345|3456|4567|5678|6789)/.test(cleanCard)) {
        score += 0.4
        reasons.push("Sequential number pattern detected")
      }
  
      // Check for known test card patterns
      const testCardPatterns = [
        "4000000000000002", // Declined card
        "4000000000000119", // Processing error
        "4242424242424242", // Test card
        "5555555555554444", // Test card
      ]
  
      if (testCardPatterns.includes(cleanCard)) {
        score += 0.2
        reasons.push("Test card number detected")
      }
  
      return { score, reasons }
    }
  
    // Analyze transaction velocity and patterns
    private analyzeTransactionVelocity(features: FraudFeatures): { score: number; reasons: string[] } {
      const reasons: string[] = []
      let score = 0
  
      // High amount transactions
      if (features.amount > 100000) {
        // $1000+
        score += 0.4
        reasons.push("High transaction amount")
      } else if (features.amount > 50000) {
        // $500+
        score += 0.2
        reasons.push("Above average transaction amount")
      }
  
      // Unusual time patterns (late night transactions)
      const hour = new Date().getHours()
      if (hour >= 2 && hour <= 5) {
        score += 0.1
        reasons.push("Unusual transaction time")
      }
  
      return { score, reasons }
    }
  
    // Simulate ML model prediction using rule-based logic
    // In production, this would call actual Hugging Face models
    private async simulateMLPrediction(features: FraudFeatures): Promise<FraudPrediction> {
      // Analyze different fraud indicators
      const cardAnalysis = this.analyzeCardPattern(features.cardNumber)
      const velocityAnalysis = this.analyzeTransactionVelocity(features)
  
      // Combine scores with weights
      const combinedScore = Math.min(
        1.0,
        cardAnalysis.score * 0.4 + velocityAnalysis.score * 0.3 + Math.random() * 0.3, // Simulate ML model uncertainty
      )
  
      // Determine risk level based on score
      let riskLevel: "low" | "medium" | "high" | "critical"
      if (combinedScore >= 0.8) riskLevel = "critical"
      else if (combinedScore >= 0.6) riskLevel = "high"
      else if (combinedScore >= 0.3) riskLevel = "medium"
      else riskLevel = "low"
  
      const allReasons = [...cardAnalysis.reasons, ...velocityAnalysis.reasons]
  
      return {
        riskScore: Math.round(combinedScore * 10000) / 10000, // 4 decimal places
        riskLevel,
        confidence: 0.85 + Math.random() * 0.1, // Simulate confidence between 0.85-0.95
        reasons: allReasons,
        modelVersion: "fraud-detector-v1.2.0",
      }
    }
  
    // Main fraud detection method
    async analyzeFraud(paymentData: any): Promise<FraudPrediction> {
      try {
        console.log("Starting fraud analysis for payment:", paymentData.amount)
  
        const features = this.extractFeatures(paymentData)
        console.log("Extracted features:", features)
  
        // In production, this would call Hugging Face API
        const prediction = await this.simulateMLPrediction(features)
        console.log("Fraud prediction result:", prediction)
  
        return prediction
      } catch (error) {
        console.error("Fraud detection error:", error)
  
        // Return safe default on error
        return {
          riskScore: 0.5,
          riskLevel: "medium",
          confidence: 0.5,
          reasons: ["Error in fraud detection - manual review required"],
          modelVersion: "fallback-v1.0.0",
        }
      }
    }
  
    // Store fraud analysis results in database
    async storeFraudAnalysis(paymentId: string, userId: string, prediction: FraudPrediction, features: FraudFeatures) {
      const { createClient } = await import("@/lib/supabase/server")
      const supabase = await createClient()
  
      const { data, error } = await supabase
        .from("fraud_analysis")
        .insert({
          payment_id: paymentId,
          user_id: userId,
          risk_score: prediction.riskScore,
          risk_level: prediction.riskLevel,
          ml_model_version: prediction.modelVersion,
          features: features,
          predictions: {
            confidence: prediction.confidence,
            reasons: prediction.reasons,
            timestamp: new Date().toISOString(),
          },
          is_flagged: prediction.riskLevel === "high" || prediction.riskLevel === "critical",
        })
        .select()
        .single()
  
      if (error) {
        console.error("Error storing fraud analysis:", error)
        throw error
      }
  
      return data
    }
  }
  
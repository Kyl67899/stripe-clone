import { type NextRequest, NextResponse } from "next/server"
import { createClient } from "@/lib/supabase/server"
import { FraudDetectionService } from "@/lib/fraud-detection"

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { email, cardNumber, expiryDate, cvv, name, amount, currency } = body

    // Basic validation
    if (!email || !cardNumber || !expiryDate || !cvv || !name || !amount) {
      return NextResponse.json({ error: "Missing required payment information" }, { status: 400 })
    }

    console.log("[v0] Starting fraud detection analysis")

    // Get user agent and IP for fraud analysis
    const userAgent = request.headers.get("user-agent") || ""
    const ipAddress = request.headers.get("x-forwarded-for") || request.headers.get("x-real-ip") || "unknown"

    // Prepare data for fraud detection
    const fraudAnalysisData = {
      amount: Number.parseInt(amount),
      currency: currency || "usd",
      cardNumber,
      email,
      userAgent,
      ipAddress,
    }

    // Run fraud detection
    const fraudService = FraudDetectionService.getInstance()
    const fraudPrediction = await fraudService.analyzeFraud(fraudAnalysisData)

    console.log("[v0] Fraud analysis complete:", fraudPrediction)

    // Block high-risk transactions
    if (fraudPrediction.riskLevel === "critical") {
      return NextResponse.json(
        {
          error: "Transaction blocked due to security concerns. Please contact support.",
          fraudReason: "High risk transaction detected",
        },
        { status: 400 },
      )
    }

    // Simulate payment processing logic
    const cleanCardNumber = cardNumber.replace(/\s/g, "")

    // Simulate different card scenarios for testing
    if (cleanCardNumber === "4000000000000002") {
      return NextResponse.json(
        { error: "Your card was declined. Please try a different payment method." },
        { status: 400 },
      )
    }

    if (cleanCardNumber === "4000000000000119") {
      return NextResponse.json({ error: "Processing error occurred. Please try again." }, { status: 400 })
    }

    // Generate a mock payment ID
    const paymentId = `pi_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`

    // Simulate processing delay
    await new Promise((resolve) => setTimeout(resolve, 2000))

    // Store payment record in database
    const supabase = await createClient()

    // Get current user for fraud analysis storage
    const {
      data: { user },
    } = await supabase.auth.getUser()

    const { data: payment, error: dbError } = await supabase
      .from("payments")
      .insert({
        stripe_payment_intent_id: paymentId,
        amount: Number.parseInt(amount),
        currency: currency || "usd",
        status: "succeeded",
        description: "Stripe Professional Plan",
        user_id: user?.id,
      })
      .select()
      .single()

    if (dbError) {
      console.error("Database error:", dbError)
      // Continue with success even if DB fails (for demo purposes)
    }

    if (payment && user) {
      try {
        await fraudService.storeFraudAnalysis(payment.id, user.id, fraudPrediction, fraudAnalysisData)
        console.log("[v0] Fraud analysis stored successfully")
      } catch (fraudError) {
        console.error("[v0] Error storing fraud analysis:", fraudError)
        // Continue with payment success even if fraud storage fails
      }
    }

    return NextResponse.json({
      success: true,
      paymentId,
      amount: Number.parseInt(amount),
      currency: currency || "usd",
      fraudAnalysis: {
        riskScore: fraudPrediction.riskScore,
        riskLevel: fraudPrediction.riskLevel,
        confidence: fraudPrediction.confidence,
      },
    })
  } catch (error) {
    console.error("Payment processing error:", error)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}

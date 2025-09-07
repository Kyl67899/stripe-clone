-- Create fraud_analysis table to store ML fraud detection results
CREATE TABLE IF NOT EXISTS public.fraud_analysis (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  payment_id UUID REFERENCES public.payments(id) ON DELETE CASCADE,
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  risk_score DECIMAL(5,4) NOT NULL, -- Risk score between 0.0000 and 1.0000
  risk_level TEXT NOT NULL CHECK (risk_level IN ('low', 'medium', 'high', 'critical')),
  ml_model_version TEXT NOT NULL,
  features JSONB NOT NULL, -- Store the features used for ML analysis
  predictions JSONB NOT NULL, -- Store ML model predictions and confidence scores
  is_flagged BOOLEAN DEFAULT FALSE,
  review_status TEXT DEFAULT 'pending' CHECK (review_status IN ('pending', 'approved', 'rejected', 'under_review')),
  reviewer_notes TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Enable RLS for fraud_analysis
ALTER TABLE public.fraud_analysis ENABLE ROW LEVEL SECURITY;

-- Create policies for fraud_analysis
CREATE POLICY "fraud_analysis_select_own" ON public.fraud_analysis FOR SELECT USING (auth.uid() = user_id);
CREATE POLICY "fraud_analysis_insert_own" ON public.fraud_analysis FOR INSERT WITH CHECK (auth.uid() = user_id);
CREATE POLICY "fraud_analysis_update_own" ON public.fraud_analysis FOR UPDATE USING (auth.uid() = user_id);

-- Create fraud_rules table for configurable fraud detection rules
CREATE TABLE IF NOT EXISTS public.fraud_rules (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  rule_name TEXT NOT NULL UNIQUE,
  rule_type TEXT NOT NULL CHECK (rule_type IN ('velocity', 'amount', 'location', 'device', 'behavioral')),
  threshold_value DECIMAL(10,2),
  is_active BOOLEAN DEFAULT TRUE,
  severity TEXT NOT NULL CHECK (severity IN ('low', 'medium', 'high', 'critical')),
  description TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Insert default fraud detection rules
INSERT INTO public.fraud_rules (rule_name, rule_type, threshold_value, severity, description) VALUES
('high_amount_transaction', 'amount', 1000.00, 'high', 'Transactions over $1000'),
('rapid_transactions', 'velocity', 5.00, 'medium', 'More than 5 transactions in 10 minutes'),
('unusual_amount_pattern', 'behavioral', 0.85, 'medium', 'Amount significantly different from user history'),
('suspicious_card_pattern', 'behavioral', 0.90, 'high', 'Card number patterns associated with fraud');

-- Create indexes for better performance
CREATE INDEX IF NOT EXISTS idx_fraud_analysis_payment_id ON public.fraud_analysis(payment_id);
CREATE INDEX IF NOT EXISTS idx_fraud_analysis_risk_score ON public.fraud_analysis(risk_score);
CREATE INDEX IF NOT EXISTS idx_fraud_analysis_risk_level ON public.fraud_analysis(risk_level);
CREATE INDEX IF NOT EXISTS idx_fraud_analysis_created_at ON public.fraud_analysis(created_at);

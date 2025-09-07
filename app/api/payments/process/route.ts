import { type NextRequest, NextResponse } from "next/server"
import { createClient } from "@/lib/supabase/server"

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { email, cardNumber, expiryDate, cvv, name, amount, currency } = body

    // Basic validation
    if (!email || !cardNumber || !expiryDate || !cvv || !name || !amount) {
      return NextResponse.json({ error: "Missing required payment information" }, { status: 400 })
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

    const { data: payment, error: dbError } = await supabase
      .from("payments")
      .insert({
        stripe_payment_intent_id: paymentId,
        amount: Number.parseInt(amount),
        currency: currency || "usd",
        status: "succeeded",
        description: "Stripe Professional Plan",
      })
      .select()
      .single()

    if (dbError) {
      console.error("Database error:", dbError)
      // Continue with success even if DB fails (for demo purposes)
    }

    return NextResponse.json({
      success: true,
      paymentId,
      amount: Number.parseInt(amount),
      currency: currency || "usd",
    })
  } catch (error) {
    console.error("Payment processing error:", error)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}

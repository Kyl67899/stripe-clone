import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import Link from "next/link"
import { CheckCircle, Download, ArrowRight } from "lucide-react"

export default async function SuccessPage({
  searchParams,
}: {
  searchParams: Promise<{ payment_id?: string }>
}) {
  const params = await searchParams
  const paymentId = params.payment_id || "payment_123456789"

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Navigation */}
      <nav className="border-b border-gray-200 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <Link href="/" className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-indigo-600 rounded-md flex items-center justify-center">
                <span className="text-white font-bold text-lg">S</span>
              </div>
              <span className="text-xl font-semibold text-gray-900">stripe</span>
            </Link>
          </div>
        </div>
      </nav>

      <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="text-center mb-8">
          <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <CheckCircle className="w-8 h-8 text-green-600" />
          </div>
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Payment successful!</h1>
          <p className="text-gray-600">Thank you for your purchase. Your payment has been processed successfully.</p>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>Payment confirmation</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-2 gap-4 text-sm">
              <div>
                <span className="text-gray-600">Payment ID:</span>
                <div className="font-mono text-gray-900">{paymentId}</div>
              </div>
              <div>
                <span className="text-gray-600">Amount:</span>
                <div className="font-semibold text-gray-900">$29.99 USD</div>
              </div>
              <div>
                <span className="text-gray-600">Date:</span>
                <div className="text-gray-900">{new Date().toLocaleDateString()}</div>
              </div>
              <div>
                <span className="text-gray-600">Status:</span>
                <div className="text-green-600 font-semibold">Completed</div>
              </div>
            </div>

            <div className="border-t pt-4">
              <h3 className="font-semibold text-gray-900 mb-2">Purchase details:</h3>
              <div className="bg-gray-50 p-4 rounded-lg">
                <div className="flex justify-between items-center">
                  <span>Stripe Professional Plan</span>
                  <span className="font-semibold">$29.99</span>
                </div>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row gap-3 pt-4">
              <Button className="flex-1 bg-indigo-600 hover:bg-indigo-700">
                <Download className="w-4 h-4 mr-2" />
                Download receipt
              </Button>
              <Button variant="outline" className="flex-1 bg-transparent" asChild>
                <Link href="/dashboard">
                  Go to dashboard
                  <ArrowRight className="w-4 h-4 ml-2" />
                </Link>
              </Button>
            </div>
          </CardContent>
        </Card>

        <div className="text-center mt-8">
          <p className="text-gray-600 mb-4">A confirmation email has been sent to your email address.</p>
          <Link href="/" className="text-indigo-600 hover:text-indigo-700 font-medium">
            Return to homepage
          </Link>
        </div>
      </div>
    </div>
  )
}

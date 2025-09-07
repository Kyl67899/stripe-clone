import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import Link from "next/link"
import { XCircle, ArrowLeft, RefreshCw } from "lucide-react"

export default async function ErrorPage({
  searchParams,
}: {
  searchParams: Promise<{ error?: string }>
}) {
  const params = await searchParams
  const error = params.error || "An unexpected error occurred"

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
          <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <XCircle className="w-8 h-8 text-red-600" />
          </div>
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Payment failed</h1>
          <p className="text-gray-600">We encountered an issue processing your payment.</p>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>Error details</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="bg-red-50 border border-red-200 rounded-lg p-4">
              <p className="text-red-800 text-sm">{decodeURIComponent(error)}</p>
            </div>

            <div className="space-y-2 text-sm text-gray-600">
              <p>
                <strong>Common solutions:</strong>
              </p>
              <ul className="list-disc list-inside space-y-1 ml-4">
                <li>Check that your card details are correct</li>
                <li>Ensure your card has sufficient funds</li>
                <li>Verify that your card supports online transactions</li>
                <li>Try a different payment method</li>
              </ul>
            </div>

            <div className="flex flex-col sm:flex-row gap-3 pt-4">
              <Button className="flex-1 bg-indigo-600 hover:bg-indigo-700" asChild>
                <Link href="/checkout">
                  <RefreshCw className="w-4 h-4 mr-2" />
                  Try again
                </Link>
              </Button>
              <Button variant="outline" className="flex-1 bg-transparent" asChild>
                <Link href="/pricing">
                  <ArrowLeft className="w-4 h-4 mr-2" />
                  Back to pricing
                </Link>
              </Button>
            </div>
          </CardContent>
        </Card>

        <div className="text-center mt-8">
          <p className="text-gray-600 mb-4">Need help? Contact our support team for assistance.</p>
          <Link href="/support" className="text-indigo-600 hover:text-indigo-700 font-medium">
            Contact support
          </Link>
        </div>
      </div>
    </div>
  )
}

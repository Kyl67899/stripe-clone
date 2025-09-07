import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import Link from "next/link"
import { ArrowRight, Check, X } from "lucide-react"

export default function PricingPage() {
  return (
    <div className="min-h-screen bg-white">
      {/* Navigation */}
      <nav className="border-b border-gray-200 bg-white/80 backdrop-blur-md sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center space-x-8">
              <Link href="/" className="flex items-center space-x-2">
                <div className="w-8 h-8 bg-indigo-600 rounded-md flex items-center justify-center">
                  <span className="text-white font-bold text-lg">S</span>
                </div>
                <span className="text-xl font-semibold text-gray-900">stripe</span>
              </Link>
              <div className="hidden md:flex items-center space-x-6">
                <Link href="/payments" className="text-gray-600 hover:text-gray-900 font-medium">
                  Payments
                </Link>
                <Link href="/pricing" className="text-indigo-600 font-medium">
                  Pricing
                </Link>
                <Link href="/docs" className="text-gray-600 hover:text-gray-900 font-medium">
                  Developers
                </Link>
                <Link href="/company" className="text-gray-600 hover:text-gray-900 font-medium">
                  Company
                </Link>
              </div>
            </div>
            <div className="flex items-center space-x-4">
              <Link href="/auth/login" className="text-gray-600 hover:text-gray-900 font-medium">
                Sign in
              </Link>
              <Button asChild className="bg-indigo-600 hover:bg-indigo-700">
                <Link href="/auth/signup">Start now</Link>
              </Button>
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="relative overflow-hidden bg-gradient-to-br from-indigo-50 via-white to-purple-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-20 pb-16">
          <div className="text-center">
            <h1 className="text-5xl md:text-6xl font-bold text-gray-900 mb-6 text-balance">
              Simple,
              <br />
              <span className="bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">
                transparent pricing
              </span>
            </h1>
            <p className="text-xl text-gray-600 mb-8 max-w-3xl mx-auto text-pretty">
              Pay as you grow. No setup fees, monthly fees, or hidden costs. Only pay for successful transactions.
            </p>
          </div>
        </div>
      </section>

      {/* Pricing Cards */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-3 gap-8">
            {/* Starter Plan */}
            <Card className="border-2 border-gray-200 hover:border-indigo-300 transition-colors">
              <CardHeader className="text-center pb-8">
                <CardTitle className="text-2xl font-bold text-gray-900">Starter</CardTitle>
                <p className="text-gray-600 mt-2">Perfect for small businesses and startups</p>
                <div className="mt-6">
                  <span className="text-4xl font-bold text-gray-900">2.9%</span>
                  <span className="text-gray-600 ml-2">+ 30¢</span>
                </div>
                <p className="text-sm text-gray-500 mt-2">per successful transaction</p>
              </CardHeader>
              <CardContent className="space-y-4">
                <ul className="space-y-3">
                  <li className="flex items-center">
                    <Check className="h-5 w-5 text-green-500 mr-3" />
                    <span className="text-gray-700">Accept online payments</span>
                  </li>
                  <li className="flex items-center">
                    <Check className="h-5 w-5 text-green-500 mr-3" />
                    <span className="text-gray-700">135+ currencies</span>
                  </li>
                  <li className="flex items-center">
                    <Check className="h-5 w-5 text-green-500 mr-3" />
                    <span className="text-gray-700">Fraud protection</span>
                  </li>
                  <li className="flex items-center">
                    <Check className="h-5 w-5 text-green-500 mr-3" />
                    <span className="text-gray-700">Dashboard & reporting</span>
                  </li>
                  <li className="flex items-center">
                    <Check className="h-5 w-5 text-green-500 mr-3" />
                    <span className="text-gray-700">24/7 support</span>
                  </li>
                  <li className="flex items-center">
                    <X className="h-5 w-5 text-gray-400 mr-3" />
                    <span className="text-gray-400">Advanced analytics</span>
                  </li>
                  <li className="flex items-center">
                    <X className="h-5 w-5 text-gray-400 mr-3" />
                    <span className="text-gray-400">Custom branding</span>
                  </li>
                </ul>
                <Button className="w-full mt-8 bg-indigo-600 hover:bg-indigo-700">Get started</Button>
              </CardContent>
            </Card>

            {/* Professional Plan */}
            <Card className="border-2 border-indigo-500 relative hover:border-indigo-600 transition-colors">
              <Badge className="absolute -top-3 left-1/2 transform -translate-x-1/2 bg-indigo-600 text-white">
                Most Popular
              </Badge>
              <CardHeader className="text-center pb-8">
                <CardTitle className="text-2xl font-bold text-gray-900">Professional</CardTitle>
                <p className="text-gray-600 mt-2">For growing businesses with advanced needs</p>
                <div className="mt-6">
                  <span className="text-4xl font-bold text-gray-900">2.4%</span>
                  <span className="text-gray-600 ml-2">+ 30¢</span>
                </div>
                <p className="text-sm text-gray-500 mt-2">per successful transaction</p>
              </CardHeader>
              <CardContent className="space-y-4">
                <ul className="space-y-3">
                  <li className="flex items-center">
                    <Check className="h-5 w-5 text-green-500 mr-3" />
                    <span className="text-gray-700">Everything in Starter</span>
                  </li>
                  <li className="flex items-center">
                    <Check className="h-5 w-5 text-green-500 mr-3" />
                    <span className="text-gray-700">Advanced analytics</span>
                  </li>
                  <li className="flex items-center">
                    <Check className="h-5 w-5 text-green-500 mr-3" />
                    <span className="text-gray-700">Custom branding</span>
                  </li>
                  <li className="flex items-center">
                    <Check className="h-5 w-5 text-green-500 mr-3" />
                    <span className="text-gray-700">Priority support</span>
                  </li>
                  <li className="flex items-center">
                    <Check className="h-5 w-5 text-green-500 mr-3" />
                    <span className="text-gray-700">Subscription billing</span>
                  </li>
                  <li className="flex items-center">
                    <Check className="h-5 w-5 text-green-500 mr-3" />
                    <span className="text-gray-700">Multi-party payments</span>
                  </li>
                  <li className="flex items-center">
                    <X className="h-5 w-5 text-gray-400 mr-3" />
                    <span className="text-gray-400">Dedicated account manager</span>
                  </li>
                </ul>
                <Button className="w-full mt-8 bg-indigo-600 hover:bg-indigo-700">Get started</Button>
              </CardContent>
            </Card>

            {/* Enterprise Plan */}
            <Card className="border-2 border-gray-200 hover:border-indigo-300 transition-colors">
              <CardHeader className="text-center pb-8">
                <CardTitle className="text-2xl font-bold text-gray-900">Enterprise</CardTitle>
                <p className="text-gray-600 mt-2">For large-scale businesses and platforms</p>
                <div className="mt-6">
                  <span className="text-4xl font-bold text-gray-900">Custom</span>
                </div>
                <p className="text-sm text-gray-500 mt-2">volume-based pricing</p>
              </CardHeader>
              <CardContent className="space-y-4">
                <ul className="space-y-3">
                  <li className="flex items-center">
                    <Check className="h-5 w-5 text-green-500 mr-3" />
                    <span className="text-gray-700">Everything in Professional</span>
                  </li>
                  <li className="flex items-center">
                    <Check className="h-5 w-5 text-green-500 mr-3" />
                    <span className="text-gray-700">Dedicated account manager</span>
                  </li>
                  <li className="flex items-center">
                    <Check className="h-5 w-5 text-green-500 mr-3" />
                    <span className="text-gray-700">Custom integrations</span>
                  </li>
                  <li className="flex items-center">
                    <Check className="h-5 w-5 text-green-500 mr-3" />
                    <span className="text-gray-700">Advanced security</span>
                  </li>
                  <li className="flex items-center">
                    <Check className="h-5 w-5 text-green-500 mr-3" />
                    <span className="text-gray-700">SLA guarantees</span>
                  </li>
                  <li className="flex items-center">
                    <Check className="h-5 w-5 text-green-500 mr-3" />
                    <span className="text-gray-700">White-label solutions</span>
                  </li>
                  <li className="flex items-center">
                    <Check className="h-5 w-5 text-green-500 mr-3" />
                    <span className="text-gray-700">24/7 phone support</span>
                  </li>
                </ul>
                <Button
                  variant="outline"
                  className="w-full mt-8 border-indigo-600 text-indigo-600 hover:bg-indigo-50 bg-transparent"
                >
                  Contact sales
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Additional Fees */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Additional services</h2>
            <p className="text-lg text-gray-600">Optional add-ons to enhance your payment processing</p>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            <Card className="border-0 shadow-sm">
              <CardContent className="p-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-2">Chargeback protection</h3>
                <p className="text-gray-600 mb-4">
                  Comprehensive protection against chargebacks with automated dispute handling.
                </p>
                <div className="text-2xl font-bold text-gray-900">0.4%</div>
                <p className="text-sm text-gray-500">per protected transaction</p>
              </CardContent>
            </Card>

            <Card className="border-0 shadow-sm">
              <CardContent className="p-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-2">Radar for Fraud Teams</h3>
                <p className="text-gray-600 mb-4">
                  Advanced machine learning tools for fraud detection and prevention.
                </p>
                <div className="text-2xl font-bold text-gray-900">0.05%</div>
                <p className="text-sm text-gray-500">per screened transaction</p>
              </CardContent>
            </Card>

            <Card className="border-0 shadow-sm">
              <CardContent className="p-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-2">Terminal</h3>
                <p className="text-gray-600 mb-4">
                  Accept in-person payments with our card readers and point-of-sale solutions.
                </p>
                <div className="text-2xl font-bold text-gray-900">2.7%</div>
                <p className="text-sm text-gray-500">+ 5¢ per transaction</p>
              </CardContent>
            </Card>

            <Card className="border-0 shadow-sm">
              <CardContent className="p-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-2">Climate</h3>
                <p className="text-gray-600 mb-4">
                  Remove carbon from the atmosphere with every purchase your customers make.
                </p>
                <div className="text-2xl font-bold text-gray-900">0.5%</div>
                <p className="text-sm text-gray-500">of transaction volume</p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="py-16 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Frequently asked questions</h2>
          </div>

          <div className="space-y-8">
            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">Are there any setup or monthly fees?</h3>
              <p className="text-gray-600">
                No, there are no setup fees, monthly fees, or hidden costs. You only pay for successful transactions.
              </p>
            </div>

            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">When do I get paid?</h3>
              <p className="text-gray-600">
                Stripe transfers funds to your bank account on a 2-day rolling basis. You can also set up instant
                payouts for an additional fee.
              </p>
            </div>

            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">What payment methods do you support?</h3>
              <p className="text-gray-600">
                We support all major credit and debit cards, digital wallets like Apple Pay and Google Pay, bank
                transfers, and many local payment methods.
              </p>
            </div>

            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">Is there a volume discount?</h3>
              <p className="text-gray-600">
                Yes, we offer custom pricing for businesses processing large volumes. Contact our sales team to discuss
                your specific needs.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 bg-indigo-600">
        <div className="max-w-4xl mx-auto text-center px-4 sm:px-6 lg:px-8">
          <h2 className="text-4xl font-bold text-white mb-4">Ready to get started?</h2>
          <p className="text-xl text-indigo-100 mb-8">Create your account and start accepting payments in minutes.</p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button
              size="lg"
              variant="secondary"
              className="bg-white text-indigo-600 hover:bg-gray-50 text-lg px-8 py-3"
            >
              Start now
              <ArrowRight className="ml-2 h-5 w-5" />
            </Button>
            <Button
              size="lg"
              variant="outline"
              className="border-white text-white hover:bg-white hover:text-indigo-600 text-lg px-8 py-3 bg-transparent"
            >
              Contact sales
            </Button>
          </div>
        </div>
      </section>
    </div>
  )
}

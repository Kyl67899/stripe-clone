"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import Link from "next/link"
import { ArrowRight, Globe, Shield, Zap, CreditCard, BarChart3, Users, Menu, X } from "lucide-react"
import { useState, useEffect } from "react"

export default function HomePage() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setIsMenuOpen(false)
      }
    }

    const handleClickOutside = (e: MouseEvent) => {
      const target = e.target as HTMLElement
      if (isMenuOpen && !target.closest(".mobile-menu") && !target.closest(".menu-button")) {
        setIsMenuOpen(false)
      }
    }

    document.addEventListener("keydown", handleEscape)
    document.addEventListener("click", handleClickOutside)

    return () => {
      document.removeEventListener("keydown", handleEscape)
      document.removeEventListener("click", handleClickOutside)
    }
  }, [isMenuOpen])

  useEffect(() => {
    if (isMenuOpen) {
      document.body.style.overflow = "hidden"
    } else {
      document.body.style.overflow = "unset"
    }

    return () => {
      document.body.style.overflow = "unset"
    }
  }, [isMenuOpen])

  const toggleMenu = () => {
    console.log("[v0] Menu toggle clicked, current state:", isMenuOpen)
    setIsMenuOpen(!isMenuOpen)
  }

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

              <div className="hidden lg:flex items-center space-x-6">
                <Link href="/payments" className="text-gray-600 hover:text-gray-900 font-medium transition-colors">
                  Payments
                </Link>
                <Link href="/pricing" className="text-gray-600 hover:text-gray-900 font-medium transition-colors">
                  Pricing
                </Link>
                <Link href="/docs" className="text-gray-600 hover:text-gray-900 font-medium transition-colors">
                  Developers
                </Link>
                <Link href="/company" className="text-gray-600 hover:text-gray-900 font-medium transition-colors">
                  Company
                </Link>
              </div>
            </div>

            <div className="flex items-center space-x-2 sm:space-x-4">
              <div className="hidden sm:flex items-center space-x-4">
                <Link href="/auth/login" className="text-gray-600 hover:text-gray-900 font-medium transition-colors">
                  Sign in
                </Link>
                <Button asChild className="bg-indigo-600 hover:bg-indigo-700">
                  <Link href="/auth/signup">Start now</Link>
                </Button>
              </div>

              <button
                onClick={toggleMenu}
                className="lg:hidden menu-button p-2 rounded-md text-gray-600 hover:text-gray-900 hover:bg-gray-100 transition-colors relative z-50"
                aria-label="Toggle menu"
                type="button"
              >
                {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
              </button>
            </div>
          </div>
        </div>

        {isMenuOpen && (
          <div className="lg:hidden mobile-menu fixed inset-0 z-[60] bg-white">
            <div className="flex flex-col h-full">
              {/* Mobile menu header */}
              <div className="flex justify-between items-center h-16 px-4 border-b border-gray-200">
                <Link href="/" className="flex items-center space-x-2" onClick={() => setIsMenuOpen(false)}>
                  <div className="w-8 h-8 bg-indigo-600 rounded-md flex items-center justify-center">
                    <span className="text-white font-bold text-lg">S</span>
                  </div>
                  <span className="text-xl font-semibold text-gray-900">stripe</span>
                </Link>
                <button
                  onClick={() => setIsMenuOpen(false)}
                  className="p-2 rounded-md text-gray-600 hover:text-gray-900 hover:bg-gray-100 transition-colors"
                  aria-label="Close menu"
                  type="button"
                >
                  <X className="h-6 w-6" />
                </button>
              </div>

              {/* Mobile menu content */}
              <div className="flex-1 overflow-y-auto">
                <div className="px-4 py-6 space-y-6">
                  {/* Navigation links */}
                  <div className="space-y-4">
                    <Link
                      href="/payments"
                      className="block text-lg font-medium text-gray-900 hover:text-indigo-600 transition-colors py-2"
                      onClick={() => setIsMenuOpen(false)}
                    >
                      Payments
                    </Link>
                    <Link
                      href="/pricing"
                      className="block text-lg font-medium text-gray-900 hover:text-indigo-600 transition-colors py-2"
                      onClick={() => setIsMenuOpen(false)}
                    >
                      Pricing
                    </Link>
                    <Link
                      href="/docs"
                      className="block text-lg font-medium text-gray-900 hover:text-indigo-600 transition-colors py-2"
                      onClick={() => setIsMenuOpen(false)}
                    >
                      Developers
                    </Link>
                    <Link
                      href="/company"
                      className="block text-lg font-medium text-gray-900 hover:text-indigo-600 transition-colors py-2"
                      onClick={() => setIsMenuOpen(false)}
                    >
                      Company
                    </Link>
                  </div>

                  {/* Divider */}
                  <div className="border-t border-gray-200"></div>

                  {/* Auth buttons */}
                  <div className="space-y-4">
                    <Link
                      href="/auth/login"
                      className="block text-lg font-medium text-gray-900 hover:text-indigo-600 transition-colors py-2"
                      onClick={() => setIsMenuOpen(false)}
                    >
                      Sign in
                    </Link>
                    <Button asChild className="w-full bg-indigo-600 hover:bg-indigo-700 text-lg py-3">
                      <Link href="/auth/signup" onClick={() => setIsMenuOpen(false)}>
                        Start now
                      </Link>
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </nav>

      {/* Hero Section */}
      <section className="relative overflow-hidden bg-gradient-to-br from-indigo-50 via-white to-purple-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-12 sm:pt-16 lg:pt-20 pb-16 sm:pb-20 lg:pb-24">
          <div className="text-center">
            <Badge
              variant="secondary"
              className="mb-4 sm:mb-6 bg-indigo-100 text-indigo-700 border-indigo-200 text-xs sm:text-sm"
            >
              New: Enhanced fraud detection powered by machine learning
            </Badge>
            <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold text-gray-900 mb-4 sm:mb-6 text-balance leading-tight">
              Financial infrastructure
              <br />
              <span className="bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">
                for the internet
              </span>
            </h1>
            <p className="text-lg sm:text-xl text-gray-600 mb-6 sm:mb-8 max-w-3xl mx-auto text-pretty px-4 sm:px-0">
              Millions of businesses of all sizes—from startups to large enterprises—use Stripe's software and APIs to
              accept payments, send payouts, and manage their businesses online.
            </p>
            <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center items-center mb-8 sm:mb-12 px-4 sm:px-0">
              <Button
                asChild
                size="lg"
                className="bg-indigo-600 hover:bg-indigo-700 text-base sm:text-lg px-6 sm:px-8 py-3 w-full sm:w-auto"
              >
                <Link href="/auth/signup">
                  Start now
                  <ArrowRight className="ml-2 h-4 w-4 sm:h-5 sm:w-5" />
                </Link>
              </Button>
              <Button
                asChild
                variant="outline"
                size="lg"
                className="text-base sm:text-lg px-6 sm:px-8 py-3 bg-transparent w-full sm:w-auto"
              >
                <Link href="/auth/login">Sign in</Link>
              </Button>
            </div>

            {/* Trust indicators */}
            <div className="flex flex-col sm:flex-row flex-wrap justify-center items-center gap-4 sm:gap-8 text-gray-500 text-xs sm:text-sm px-4">
              <span className="text-center">Trusted by millions of businesses</span>
              <div className="flex items-center gap-4 sm:gap-6 flex-wrap justify-center">
                <span className="font-semibold">Amazon</span>
                <span className="font-semibold">Google</span>
                <span className="font-semibold">Microsoft</span>
                <span className="font-semibold">Shopify</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Grid */}
      <section className="py-16 sm:py-20 lg:py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12 sm:mb-16">
            <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">A complete commerce toolkit</h2>
            <p className="text-lg sm:text-xl text-gray-600 max-w-3xl mx-auto px-4 sm:px-0">
              From checkout to global sales tax compliance, companies around the world use Stripe to simplify their
              payment stack.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6 sm:gap-8">
            <Card className="border-0 shadow-sm hover:shadow-md transition-shadow">
              <CardContent className="p-8">
                <div className="w-12 h-12 bg-indigo-100 rounded-lg flex items-center justify-center mb-4">
                  <CreditCard className="h-6 w-6 text-indigo-600" />
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-3">Payments</h3>
                <p className="text-gray-600 mb-4">
                  Accept payments online, in person, or through your platform. Stripe's payments platform lets you
                  accept credit cards, debit cards, and popular payment methods.
                </p>
                <Link href="/payments" className="text-indigo-600 font-medium hover:text-indigo-700 flex items-center">
                  Learn more <ArrowRight className="ml-1 h-4 w-4 sm:h-5 sm:w-5" />
                </Link>
              </CardContent>
            </Card>

            <Card className="border-0 shadow-sm hover:shadow-md transition-shadow">
              <CardContent className="p-8">
                <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center mb-4">
                  <Shield className="h-6 w-6 text-green-600" />
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-3">Fraud prevention</h3>
                <p className="text-gray-600 mb-4">
                  Stripe's machine learning models train on billions of data points and help increase revenue while
                  reducing fraud.
                </p>
                <Link href="/fraud" className="text-indigo-600 font-medium hover:text-indigo-700 flex items-center">
                  Learn more <ArrowRight className="ml-1 h-4 w-4 sm:h-5 sm:w-5" />
                </Link>
              </CardContent>
            </Card>

            <Card className="border-0 shadow-sm hover:shadow-md transition-shadow">
              <CardContent className="p-8">
                <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center mb-4">
                  <Globe className="h-6 w-6 text-purple-600" />
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-3">Global scale</h3>
                <p className="text-gray-600 mb-4">
                  Grow your business globally with support for 135+ currencies and payment methods used by customers
                  worldwide.
                </p>
                <Link href="/global" className="text-indigo-600 font-medium hover:text-indigo-700 flex items-center">
                  Learn more <ArrowRight className="ml-1 h-4 w-4 sm:h-5 sm:w-5" />
                </Link>
              </CardContent>
            </Card>

            <Card className="border-0 shadow-sm hover:shadow-md transition-shadow">
              <CardContent className="p-8">
                <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mb-4">
                  <BarChart3 className="h-6 w-6 text-blue-600" />
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-3">Revenue optimization</h3>
                <p className="text-gray-600 mb-4">
                  Increase authorization rates and reduce costs with Stripe's suite of revenue optimization features.
                </p>
                <Link href="/revenue" className="text-indigo-600 font-medium hover:text-indigo-700 flex items-center">
                  Learn more <ArrowRight className="ml-1 h-4 w-4 sm:h-5 sm:w-5" />
                </Link>
              </CardContent>
            </Card>

            <Card className="border-0 shadow-sm hover:shadow-md transition-shadow">
              <CardContent className="p-8">
                <div className="w-12 h-12 bg-orange-100 rounded-lg flex items-center justify-center mb-4">
                  <Zap className="h-6 w-6 text-orange-600" />
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-3">Fast integration</h3>
                <p className="text-gray-600 mb-4">
                  Get up and running quickly with Stripe's developer-friendly APIs, extensive documentation, and robust
                  SDKs.
                </p>
                <Link href="/docs" className="text-indigo-600 font-medium hover:text-indigo-700 flex items-center">
                  Learn more <ArrowRight className="ml-1 h-4 w-4 sm:h-5 sm:w-5" />
                </Link>
              </CardContent>
            </Card>

            <Card className="border-0 shadow-sm hover:shadow-md transition-shadow">
              <CardContent className="p-8">
                <div className="w-12 h-12 bg-pink-100 rounded-lg flex items-center justify-center mb-4">
                  <Users className="h-6 w-6 text-pink-600" />
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-3">24/7 support</h3>
                <p className="text-gray-600 mb-4">
                  Get help when you need it with 24/7 support, comprehensive documentation, and a thriving developer
                  community.
                </p>
                <Link href="/support" className="text-indigo-600 font-medium hover:text-indigo-700 flex items-center">
                  Learn more <ArrowRight className="ml-1 h-4 w-4 sm:h-5 sm:w-5" />
                </Link>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 sm:py-20 lg:py-24 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12 sm:mb-16">
            <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">Powering online commerce</h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-8 text-center">
            <div>
              <div className="text-4xl sm:text-5xl font-bold text-indigo-600 mb-2">$1T+</div>
              <div className="text-gray-600 text-sm sm:text-base">Payment volume processed annually</div>
            </div>
            <div>
              <div className="text-4xl sm:text-5xl font-bold text-indigo-600 mb-2">50M+</div>
              <div className="text-gray-600 text-sm sm:text-base">Businesses using Stripe</div>
            </div>
            <div>
              <div className="text-4xl sm:text-5xl font-bold text-indigo-600 mb-2">135+</div>
              <div className="text-gray-600 text-sm sm:text-base">Currencies and payment methods</div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 sm:py-20 lg:py-24 bg-indigo-600">
        <div className="max-w-4xl mx-auto text-center px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl sm:text-4xl font-bold text-white mb-4">Ready to get started?</h2>
          <p className="text-lg sm:text-xl text-indigo-100 mb-6 sm:mb-8">
            Join the millions of businesses that trust Stripe to handle their payments.
          </p>
          <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center">
            <Button
              asChild
              size="lg"
              variant="secondary"
              className="bg-white text-indigo-600 hover:bg-gray-50 text-base sm:text-lg px-6 sm:px-8 py-3 w-full sm:w-auto"
            >
              <Link href="/auth/signup">
                Start now
                <ArrowRight className="ml-2 h-4 w-4 sm:h-5 sm:w-5" />
              </Link>
            </Button>
            <Button
              asChild
              size="lg"
              variant="outline"
              className="border-white text-white hover:bg-white hover:text-indigo-600 text-base sm:text-lg px-6 sm:px-8 py-3 bg-transparent w-full sm:w-auto"
            >
              <Link href="/auth/login">Already have an account? Sign in</Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-12 sm:py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8">
            <div>
              <div className="flex items-center space-x-2 mb-4">
                <div className="w-8 h-8 bg-indigo-600 rounded-md flex items-center justify-center">
                  <span className="text-white font-bold text-lg">S</span>
                </div>
                <span className="text-xl font-semibold">stripe</span>
              </div>
              <p className="text-gray-400">Financial infrastructure for the internet.</p>
            </div>

            <div>
              <h3 className="font-semibold mb-4">Products</h3>
              <ul className="space-y-2 text-gray-400">
                <li>
                  <Link href="/payments" className="hover:text-white">
                    Payments
                  </Link>
                </li>
                <li>
                  <Link href="/billing" className="hover:text-white">
                    Billing
                  </Link>
                </li>
                <li>
                  <Link href="/connect" className="hover:text-white">
                    Connect
                  </Link>
                </li>
                <li>
                  <Link href="/radar" className="hover:text-white">
                    Radar
                  </Link>
                </li>
              </ul>
            </div>

            <div>
              <h3 className="font-semibold mb-4">Developers</h3>
              <ul className="space-y-2 text-gray-400">
                <li>
                  <Link href="/docs" className="hover:text-white">
                    Documentation
                  </Link>
                </li>
                <li>
                  <Link href="/api" className="hover:text-white">
                    API reference
                  </Link>
                </li>
                <li>
                  <Link href="/guides" className="hover:text-white">
                    Guides
                  </Link>
                </li>
                <li>
                  <Link href="/support" className="hover:text-white">
                    Support
                  </Link>
                </li>
              </ul>
            </div>

            <div>
              <h3 className="font-semibold mb-4">Company</h3>
              <ul className="space-y-2 text-gray-400">
                <li>
                  <Link href="/about" className="hover:text-white">
                    About
                  </Link>
                </li>
                <li>
                  <Link href="/customers" className="hover:text-white">
                    Customers
                  </Link>
                </li>
                <li>
                  <Link href="/jobs" className="hover:text-white">
                    Jobs
                  </Link>
                </li>
                <li>
                  <Link href="/newsroom" className="hover:text-white">
                    Newsroom
                  </Link>
                </li>
              </ul>
            </div>
          </div>

          <div className="border-t border-gray-800 mt-8 sm:mt-12 pt-6 sm:pt-8 flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
            <p className="text-gray-400 text-sm text-center md:text-left">© 2024 Stripe Clone. All rights reserved.</p>
            <div className="flex space-x-4 sm:space-x-6">
              <Link href="/privacy" className="text-gray-400 hover:text-white text-sm">
                Privacy
              </Link>
              <Link href="/terms" className="text-gray-400 hover:text-white text-sm">
                Terms
              </Link>
              <Link href="/cookies" className="text-gray-400 hover:text-white text-sm">
                Cookies
              </Link>
            </div>
          </div>
        </div>
      </footer>
    </div>
  )
}

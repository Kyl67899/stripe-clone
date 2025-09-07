import { redirect } from "next/navigation"
import { createClient } from "@/lib/supabase/server"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { DashboardLayout } from "@/components/dashboard/layout"
import { ArrowUpRight, ArrowDownRight, CreditCard, DollarSign, Shield, AlertTriangle } from "lucide-react"
import { cn } from "@/lib/utils"

export default async function DashboardPage() {
  const supabase = await createClient()

  const {
    data: { user },
    error,
  } = await supabase.auth.getUser()

  if (error || !user) {
    redirect("/auth/login")
  }

  // Fetch user profile
  const { data: profile } = await supabase.from("profiles").select("*").eq("id", user.id).single()

  // Fetch recent payments
  const { data: payments } = await supabase
    .from("payments")
    .select("*")
    .eq("user_id", user.id)
    .order("created_at", { ascending: false })
    .limit(5)

  let fraudAnalyses = null
  try {
    const { data: fraudData, error: fraudError } = await supabase
      .from("fraud_analysis")
      .select("*")
      .eq("user_id", user.id)
      .order("created_at", { ascending: false })

    if (!fraudError) {
      fraudAnalyses = fraudData
    }
  } catch (error) {
    console.log("[v0] Fraud analysis table may not exist yet:", error)
    fraudAnalyses = []
  }

  // Calculate stats with additional safety checks
  const totalRevenue = payments?.reduce((sum, payment) => sum + (payment?.amount || 0), 0) || 0
  const successfulPayments = payments?.filter((p) => p?.status === "succeeded").length || 0
  const totalPayments = payments?.length || 0

  const highRiskTransactions =
    fraudAnalyses?.length > 0
      ? fraudAnalyses.filter((f) => f?.risk_level === "high" || f?.risk_level === "critical").length || 0
      : 0

  const averageRiskScore =
    fraudAnalyses?.length > 0
      ? (
          fraudAnalyses.filter((f) => f?.risk_score != null).reduce((sum, f) => sum + (f.risk_score || 0), 0) /
          fraudAnalyses.length
        ).toFixed(3)
      : "0.000"

  return (
    <DashboardLayout user={user} profile={profile}>
      <div className="space-y-8">
        {/* Header */}
        <div>
          <h1 className="text-3xl font-bold text-gray-900">
            Welcome back, {profile?.full_name || user.email?.split("@")[0]}
          </h1>
          <p className="text-gray-600 mt-2">Here's what's happening with your account today.</p>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Revenue</CardTitle>
              <DollarSign className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-xl sm:text-2xl font-bold">${(totalRevenue / 100).toFixed(2)}</div>
              <p className="text-xs text-muted-foreground">
                <span className="text-green-600 flex items-center">
                  <ArrowUpRight className="h-3 w-3 mr-1" />
                  +20.1%
                </span>
                from last month
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Successful Payments</CardTitle>
              <CreditCard className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-xl sm:text-2xl font-bold">{successfulPayments}</div>
              <p className="text-xs text-muted-foreground">
                <span className="text-green-600 flex items-center">
                  <ArrowUpRight className="h-3 w-3 mr-1" />
                  +12.5%
                </span>
                from last month
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">High Risk Transactions</CardTitle>
              <AlertTriangle className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-xl sm:text-2xl font-bold">{highRiskTransactions}</div>
              <p className="text-xs text-muted-foreground">
                <span className="text-orange-600 flex items-center">
                  <Shield className="h-3 w-3 mr-1" />
                  AI-powered detection
                </span>
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Avg Risk Score</CardTitle>
              <Shield className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-xl sm:text-2xl font-bold">{averageRiskScore}</div>
              <p className="text-xs text-muted-foreground">
                <span className="text-green-600 flex items-center">
                  <ArrowDownRight className="h-3 w-3 mr-1" />
                  Lower is better
                </span>
              </p>
            </CardContent>
          </Card>
        </div>

        {fraudAnalyses && fraudAnalyses.length > 0 && (
          <Card>
            <CardHeader>
              <CardTitle className="text-lg sm:text-xl flex items-center">
                <Shield className="h-5 w-5 mr-2" />
                Fraud Detection Overview
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div className="text-center p-4 bg-green-50 rounded-lg">
                  <div className="text-2xl font-bold text-green-600">
                    {fraudAnalyses.filter((f) => f?.risk_level === "low").length || 0}
                  </div>
                  <div className="text-sm text-green-700">Low Risk</div>
                </div>
                <div className="text-center p-4 bg-yellow-50 rounded-lg">
                  <div className="text-2xl font-bold text-yellow-600">
                    {fraudAnalyses.filter((f) => f?.risk_level === "medium").length || 0}
                  </div>
                  <div className="text-sm text-yellow-700">Medium Risk</div>
                </div>
                <div className="text-center p-4 bg-red-50 rounded-lg">
                  <div className="text-2xl font-bold text-red-600">
                    {fraudAnalyses.filter((f) => f?.risk_level === "high" || f?.risk_level === "critical").length || 0}
                  </div>
                  <div className="text-sm text-red-700">High Risk</div>
                </div>
              </div>
              <div className="mt-4 text-center">
                <Button variant="outline" asChild>
                  <a href="/dashboard/fraud">View Detailed Analysis</a>
                </Button>
              </div>
            </CardContent>
          </Card>
        )}

        {/* Recent Payments */}
        <Card>
          <CardHeader>
            <CardTitle className="text-lg sm:text-xl">Recent Payments</CardTitle>
          </CardHeader>
          <CardContent>
            {payments && payments.length > 0 ? (
              <div className="space-y-3 sm:space-y-4">
                {payments.map((payment) => (
                  <div
                    key={payment.id}
                    className="flex flex-col sm:flex-row sm:items-center justify-between p-3 sm:p-4 border rounded-lg space-y-2 sm:space-y-0"
                  >
                    <div className="flex items-center space-x-3 sm:space-x-4">
                      <div className="w-8 h-8 sm:w-10 sm:h-10 bg-indigo-100 rounded-full flex items-center justify-center flex-shrink-0">
                        <CreditCard className="h-4 w-4 sm:h-5 sm:w-5 text-indigo-600" />
                      </div>
                      <div className="min-w-0 flex-1">
                        <p className="font-medium text-gray-900 text-sm sm:text-base truncate">
                          {payment.description || "Payment"}
                        </p>
                        <p className="text-xs sm:text-sm text-gray-500">
                          {new Date(payment.created_at).toLocaleDateString()}
                        </p>
                      </div>
                    </div>
                    <div className="flex items-center justify-between sm:justify-end space-x-3 sm:space-x-4 ml-11 sm:ml-0">
                      <Badge
                        variant={payment.status === "succeeded" ? "default" : "secondary"}
                        className={cn(
                          "text-xs",
                          payment.status === "succeeded"
                            ? "bg-green-100 text-green-800"
                            : "bg-yellow-100 text-yellow-800",
                        )}
                      >
                        {payment.status}
                      </Badge>
                      <span className="font-semibold text-gray-900 text-sm sm:text-base">
                        ${(payment.amount / 100).toFixed(2)} {payment.currency.toUpperCase()}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center py-8">
                <CreditCard className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                <h3 className="text-lg font-medium text-gray-900 mb-2">No payments yet</h3>
                <p className="text-gray-600 mb-4">Start accepting payments to see them here.</p>
                <Button className="bg-indigo-600 hover:bg-indigo-700">Start accepting payments</Button>
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </DashboardLayout>
  )
}

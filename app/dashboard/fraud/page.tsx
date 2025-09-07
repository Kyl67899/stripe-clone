"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { DashboardLayout } from "@/components/dashboard/layout"
import { createClient } from "@/lib/supabase/client"
import { useRouter } from "next/navigation"
import { Shield, AlertTriangle, Search, TrendingUp, Eye } from "lucide-react"

export default function FraudDashboardPage() {
  const [user, setUser] = useState<any>(null)
  const [profile, setProfile] = useState<any>(null)
  const [fraudAnalyses, setFraudAnalyses] = useState<any[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [searchTerm, setSearchTerm] = useState("")
  const router = useRouter()

  useEffect(() => {
    const fetchData = async () => {
      const supabase = createClient()
      const {
        data: { user },
        error,
      } = await supabase.auth.getUser()

      if (error || !user) {
        router.push("/auth/login")
        return
      }

      const { data: profile } = await supabase.from("profiles").select("*").eq("id", user.id).single()

      // Fetch fraud analyses
      const { data: fraudData } = await supabase
        .from("fraud_analysis")
        .select(`
          *,
          payments (
            stripe_payment_intent_id,
            amount,
            currency,
            description,
            created_at
          )
        `)
        .eq("user_id", user.id)
        .order("created_at", { ascending: false })

      setUser(user)
      setProfile(profile)
      setFraudAnalyses(fraudData || [])
      setIsLoading(false)
    }

    fetchData()
  }, [router])

  const filteredAnalyses = fraudAnalyses.filter(
    (analysis) =>
      analysis.payments?.stripe_payment_intent_id?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      analysis.risk_level?.toLowerCase().includes(searchTerm.toLowerCase()),
  )

  const getRiskBadgeColor = (riskLevel: string) => {
    switch (riskLevel) {
      case "low":
        return "bg-green-100 text-green-800"
      case "medium":
        return "bg-yellow-100 text-yellow-800"
      case "high":
        return "bg-orange-100 text-orange-800"
      case "critical":
        return "bg-red-100 text-red-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  const stats = {
    totalAnalyses: fraudAnalyses.length,
    highRisk: fraudAnalyses.filter((a) => a.risk_level === "high" || a.risk_level === "critical").length,
    flagged: fraudAnalyses.filter((a) => a.is_flagged).length,
    averageRisk:
      fraudAnalyses.length > 0
        ? (fraudAnalyses.reduce((sum, a) => sum + a.risk_score, 0) / fraudAnalyses.length).toFixed(3)
        : "0.000",
  }

  if (isLoading) {
    return (
      <DashboardLayout user={user} profile={profile}>
        <div className="flex items-center justify-center h-64">
          <div className="text-gray-600">Loading fraud analysis...</div>
        </div>
      </DashboardLayout>
    )
  }

  return (
    <DashboardLayout user={user} profile={profile}>
      <div className="space-y-8">
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Fraud Detection</h1>
            <p className="text-gray-600 mt-2">AI-powered fraud analysis and risk monitoring.</p>
          </div>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">Total Analyses</p>
                  <p className="text-2xl font-bold text-gray-900">{stats.totalAnalyses}</p>
                </div>
                <Shield className="h-8 w-8 text-blue-600" />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">High Risk</p>
                  <p className="text-2xl font-bold text-red-600">{stats.highRisk}</p>
                </div>
                <AlertTriangle className="h-8 w-8 text-red-600" />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">Flagged</p>
                  <p className="text-2xl font-bold text-orange-600">{stats.flagged}</p>
                </div>
                <Eye className="h-8 w-8 text-orange-600" />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">Avg Risk Score</p>
                  <p className="text-2xl font-bold text-gray-900">{stats.averageRisk}</p>
                </div>
                <TrendingUp className="h-8 w-8 text-indigo-600" />
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Search */}
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
          <Input
            placeholder="Search fraud analyses..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-10"
          />
        </div>

        {/* Fraud Analyses List */}
        <Card>
          <CardHeader>
            <CardTitle>Fraud Analysis Results</CardTitle>
          </CardHeader>
          <CardContent>
            {filteredAnalyses.length > 0 ? (
              <div className="space-y-4">
                {filteredAnalyses.map((analysis) => (
                  <div
                    key={analysis.id}
                    className="flex items-center justify-between p-4 border rounded-lg hover:bg-gray-50"
                  >
                    <div className="flex items-center space-x-4">
                      <div className="w-10 h-10 bg-indigo-100 rounded-full flex items-center justify-center">
                        <Shield className="h-5 w-5 text-indigo-600" />
                      </div>
                      <div>
                        <p className="font-medium text-gray-900">
                          {analysis.payments?.description || "Payment Analysis"}
                        </p>
                        <p className="text-sm text-gray-500 font-mono">{analysis.payments?.stripe_payment_intent_id}</p>
                        <p className="text-sm text-gray-500">
                          Risk Score: {analysis.risk_score} | Model: {analysis.ml_model_version}
                        </p>
                        <p className="text-sm text-gray-500">
                          {new Date(analysis.created_at).toLocaleDateString()} at{" "}
                          {new Date(analysis.created_at).toLocaleTimeString()}
                        </p>
                      </div>
                    </div>
                    <div className="flex items-center space-x-4">
                      <Badge className={getRiskBadgeColor(analysis.risk_level)}>{analysis.risk_level} risk</Badge>
                      {analysis.is_flagged && <Badge className="bg-red-100 text-red-800">Flagged</Badge>}
                      <span className="font-semibold text-gray-900 min-w-[100px] text-right">
                        ${(analysis.payments?.amount / 100).toFixed(2)}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center py-12">
                <Shield className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                <h3 className="text-lg font-medium text-gray-900 mb-2">
                  {searchTerm ? "No analyses found" : "No fraud analyses yet"}
                </h3>
                <p className="text-gray-600 mb-4">
                  {searchTerm
                    ? "Try adjusting your search terms"
                    : "Fraud analyses will appear here as payments are processed."}
                </p>
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </DashboardLayout>
  )
}

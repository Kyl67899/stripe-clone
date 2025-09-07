"use client"

import { debugEnvironmentVariables } from "@/lib/debug-env"
import { createClient } from "@/lib/supabase/client"
import { useEffect, useState } from "react"

export default function DebugPage() {
  const [debugInfo, setDebugInfo] = useState<any>(null)
  const [clientTest, setClientTest] = useState<string>("Not tested")

  useEffect(() => {
    // Test environment variables
    const envDebug = debugEnvironmentVariables()
    setDebugInfo(envDebug)

    // Test client creation
    try {
      const client = createClient()
      setClientTest("Client created successfully")
      console.log("Client test successful:", !!client)
    } catch (error) {
      setClientTest(`Client creation failed: ${error}`)
      console.error("Client test failed:", error)
    }
  }, [])

  return (
    <div className="min-h-screen bg-gray-50 p-8">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold mb-8">Environment Debug Page</h1>

        <div className="bg-white rounded-lg shadow p-6 mb-6">
          <h2 className="text-xl font-semibold mb-4">Environment Variables Status</h2>
          <div className="space-y-2 font-mono text-sm">
            <div>Supabase URL Configured: {debugInfo?.supabaseUrl ? "✅" : "❌"}</div>
            <div>Supabase Key Configured: {debugInfo?.supabaseAnonKey ? "✅" : "❌"}</div>
            <div>Configuration Valid: {debugInfo?.isValid ? "✅" : "❌"}</div>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow p-6 mb-6">
          <h2 className="text-xl font-semibold mb-4">Client Test</h2>
          <div className="font-mono text-sm">Status: {clientTest}</div>
        </div>

        {!debugInfo?.isValid && (
          <div className="p-4 bg-red-50 border border-red-200 rounded-lg mb-6">
            <h3 className="font-semibold text-red-800">Configuration Required</h3>
            <p className="text-red-700 mt-2">
              Your Supabase environment variables are not properly configured. Please follow these steps:
            </p>
            <ol className="list-decimal list-inside mt-2 text-red-700 space-y-1">
              <li>
                Create a <code className="bg-red-100 px-1 rounded">.env.local</code> file in your project root
              </li>
              <li>Add your Supabase project URL and anonymous key</li>
              <li>Restart your development server</li>
            </ol>
          </div>
        )}

        <div className="p-4 bg-blue-50 border border-blue-200 rounded-lg">
          <h3 className="font-semibold text-blue-800">How to Get Supabase Credentials</h3>
          <ol className="list-decimal list-inside mt-2 text-blue-700 space-y-1">
            <li>
              Go to{" "}
              <a href="https://supabase.com" className="underline" target="_blank" rel="noopener noreferrer">
                supabase.com
              </a>{" "}
              and sign in
            </li>
            <li>Create a new project or select an existing one</li>
            <li>Go to Settings → API in your project dashboard</li>
            <li>Copy the "Project URL" and "anon public" key</li>
            <li>Add them to your .env.local file</li>
          </ol>
        </div>
      </div>
    </div>
  )
}

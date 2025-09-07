// Debug utility to help identify environment variable issues
export function debugEnvironmentVariables() {
  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
  const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY

  console.log("Environment Variables Debug:")
  console.log("NEXT_PUBLIC_SUPABASE_URL exists:", !!supabaseUrl)
  console.log("NEXT_PUBLIC_SUPABASE_URL type:", typeof supabaseUrl)
  console.log("NEXT_PUBLIC_SUPABASE_URL length:", supabaseUrl?.length || 0)
  console.log("NEXT_PUBLIC_SUPABASE_URL value:", supabaseUrl ? `${supabaseUrl.substring(0, 20)}...` : "undefined")

  console.log("NEXT_PUBLIC_SUPABASE_ANON_KEY exists:", !!supabaseAnonKey)
  console.log("NEXT_PUBLIC_SUPABASE_ANON_KEY type:", typeof supabaseAnonKey)
  console.log("NEXT_PUBLIC_SUPABASE_ANON_KEY length:", supabaseAnonKey?.length || 0)

  // Test URL validation
  if (supabaseUrl) {
    try {
      new URL(supabaseUrl)
      console.log("URL validation: PASSED")
    } catch (error) {
      console.log("URL validation: FAILED", error)
    }
  }

  return {
    supabaseUrl,
    supabaseAnonKey,
    isValid: !!(supabaseUrl && supabaseAnonKey && supabaseUrl.trim() && supabaseAnonKey.trim()),
  }
}

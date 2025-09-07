import { createBrowserClient } from "@supabase/ssr"

export function createClient() {
  console.log("Creating Supabase client...")

  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
  const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY

  console.log("Environment check - URL exists:", !!supabaseUrl, "Key exists:", !!supabaseAnonKey)

  if (
    !supabaseUrl ||
    !supabaseAnonKey ||
    supabaseUrl.trim() === "" ||
    supabaseAnonKey.trim() === "" ||
    supabaseUrl === "undefined" ||
    supabaseAnonKey === "undefined"
  ) {
    console.warn("Supabase environment variables not configured. Returning mock client.")
    // Return a mock client that won't cause errors
    return {
      auth: {
        getUser: async () => ({ data: { user: null }, error: null }),
        signOut: async () => ({ error: null }),
        signInWithPassword: async () => ({ data: null, error: { message: "Supabase not configured" } }),
        signUp: async () => ({ data: null, error: { message: "Supabase not configured" } }),
      },
      from: () => ({
        select: () => ({ data: [], error: null }),
        insert: () => ({ data: null, error: null }),
        update: () => ({ data: null, error: null }),
        delete: () => ({ data: null, error: null }),
      }),
    } as any
  }

  try {
    new URL(supabaseUrl)
  } catch {
    console.warn("Invalid Supabase URL format. Please check your environment variables.")
    return {
      auth: {
        getUser: async () => ({ data: { user: null }, error: null }),
        signOut: async () => ({ error: null }),
        signInWithPassword: async () => ({ data: null, error: { message: "Invalid Supabase URL" } }),
        signUp: async () => ({ data: null, error: { message: "Invalid Supabase URL" } }),
      },
      from: () => ({
        select: () => ({ data: [], error: null }),
        insert: () => ({ data: null, error: null }),
        update: () => ({ data: null, error: null }),
        delete: () => ({ data: null, error: null }),
      }),
    } as any
  }

  return createBrowserClient(supabaseUrl, supabaseAnonKey)
}

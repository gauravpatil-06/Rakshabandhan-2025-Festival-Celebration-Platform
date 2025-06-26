import { createClient } from "@supabase/supabase-js"

// Use fallback values for development/preview
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || "https://your-project.supabase.co"
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || "your-anon-key"

export const supabase = createClient(supabaseUrl, supabaseAnonKey)

// Check if we have real environment variables
export const hasSupabaseConfig = () => {
  return process.env.NEXT_PUBLIC_SUPABASE_URL && process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
}

// Test connection function
export const testConnection = async () => {
  if (!hasSupabaseConfig()) {
    console.warn("Supabase not configured - using mock data")
    return false
  }

  try {
    const { data, error } = await supabase.from("wishes").select("count", { count: "exact" })
    if (error) {
      console.error("Supabase connection error:", error)
      return false
    }
    console.log("Supabase connected successfully")
    return true
  } catch (error) {
    console.error("Connection test failed:", error)
    return false
  }
}

// Types for our database tables
export interface Wish {
  id: string
  sender_name: string
  recipient_name: string
  message: string
  created_at: string
}

export interface Order {
  id: string
  customer_name: string
  email: string
  address: string
  phone?: string
  product_id: string
  product_name: string
  price: number
  payment_status: string
  created_at: string
}

export interface ContactMessage {
  id: string
  name: string
  email: string
  message: string
  created_at: string
}

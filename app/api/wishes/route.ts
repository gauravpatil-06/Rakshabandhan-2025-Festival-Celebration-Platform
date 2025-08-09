import { type NextRequest, NextResponse } from "next/server"
import { supabase, hasSupabaseConfig } from "@/lib/supabase"

// Mock data for when Supabase is not configured
const mockWishes = [
  {
    id: "1",
    sender_name: "Priya",
    recipient_name: "Rahul",
    message:
      "Happy Rakshabandhan! May our bond of love grow stronger with each passing year. You are the best brother anyone could ask for!",
    created_at: new Date().toISOString(),
  },
  {
    id: "2",
    sender_name: "Anjali",
    recipient_name: "Vikram",
    message:
      "Wishing you happiness, success, and all the love in the world. Thank you for always being my protector and guide.",
    created_at: new Date(Date.now() - 86400000).toISOString(),
  },
  {
    id: "3",
    sender_name: "Kavya",
    recipient_name: "Arjun",
    message: "On this special day, I pray for your good health and prosperity. Happy Rakshabandhan, dear brother!",
    created_at: new Date(Date.now() - 172800000).toISOString(),
  },
]

// Use a global variable to persist wishes across requests in demo mode
const localWishes = [...mockWishes]

export async function GET() {
  try {
    if (!hasSupabaseConfig()) {
      console.log("Using local wishes data")
      return NextResponse.json({ wishes: localWishes })
    }

    const { data, error } = await supabase.from("wishes").select("*").order("created_at", { ascending: false })

    if (error) {
      console.error("Supabase error:", error)
      return NextResponse.json({ wishes: localWishes })
    }

    return NextResponse.json({ wishes: data || [] })
  } catch (error) {
    console.error("API error:", error)
    return NextResponse.json({ wishes: localWishes })
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { sender_name, recipient_name, message } = body

    console.log("Received wish data:", { sender_name, recipient_name, message })

    if (!sender_name || !recipient_name || !message) {
      return NextResponse.json({ error: "All fields are required" }, { status: 400 })
    }

    if (!hasSupabaseConfig()) {
      // Add to local mock data
      const newWish = {
        id: Date.now().toString(),
        sender_name,
        recipient_name,
        message,
        created_at: new Date().toISOString(),
      }
      localWishes.unshift(newWish)
      console.log("Wish added to local data:", newWish)
      return NextResponse.json({ success: true, data: [newWish] })
    }

    const { data, error } = await supabase.from("wishes").insert([{ sender_name, recipient_name, message }]).select()

    if (error) {
      console.error("Supabase error:", error)
      // Fallback to mock data
      const newWish = {
        id: Date.now().toString(),
        sender_name,
        recipient_name,
        message,
        created_at: new Date().toISOString(),
      }
      localWishes.unshift(newWish)
      return NextResponse.json({ success: true, data: [newWish] })
    }

    console.log("Wish saved successfully:", data)
    return NextResponse.json({ success: true, data })
  } catch (error) {
    console.error("API error:", error)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}

// Export localWishes for use in delete route
export { localWishes }

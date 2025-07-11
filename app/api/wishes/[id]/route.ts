import { type NextRequest, NextResponse } from "next/server"
import { supabase, hasSupabaseConfig } from "@/lib/supabase"

// Import the local wishes array from the main wishes route
import { localWishes } from "../route"

export async function DELETE(request: NextRequest, { params }: { params: { id: string } }) {
  try {
    const wishId = params.id

    if (!hasSupabaseConfig()) {
      // For demo mode, remove from local array
      const index = localWishes.findIndex((wish) => wish.id === wishId)
      if (index > -1) {
        localWishes.splice(index, 1)
        console.log("Wish deleted from local data:", wishId)
      }
      return NextResponse.json({ success: true })
    }

    const { error } = await supabase.from("wishes").delete().eq("id", wishId)

    if (error) {
      console.error("Supabase error:", error)
      return NextResponse.json({ error: "Failed to delete wish" }, { status: 500 })
    }

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error("API error:", error)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}

"use client"

import { useState, useEffect } from "react"
import { motion } from "framer-motion"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { PageWrapper } from "../page-wrapper"
import { Heart, MessageCircle, Calendar, Loader2, RefreshCw, Trash2 } from "lucide-react"
import type { Wish } from "@/lib/supabase"
import { useToast } from "@/hooks/use-toast"

export default function WishesWallPage() {
  const [wishes, setWishes] = useState<Wish[]>([])
  const [loading, setLoading] = useState(true)
  const [refreshing, setRefreshing] = useState(false)
  const [deletingIds, setDeletingIds] = useState<Set<string>>(new Set())
  const [error, setError] = useState<string | null>(null)
  const { toast } = useToast()

  const fetchWishes = async (showRefreshing = false) => {
    if (showRefreshing) setRefreshing(true)
    setError(null)
    try {
      const response = await fetch("/api/wishes", {
        cache: "no-store",
      })

      if (response.ok) {
        const data = await response.json()
        console.log("Fetched wishes:", data.wishes)
        setWishes(data.wishes || [])
      } else {
        console.error("Failed to fetch wishes:", response.status)
        setError(`Failed to fetch wishes: ${response.status}`)
      }
    } catch (error) {
      console.error("Error fetching wishes:", error)
      setError("An error occurred while fetching wishes.")
    } finally {
      setLoading(false)
      if (showRefreshing) setRefreshing(false)
    }
  }

  const deleteWish = async (wishId: string) => {
    setDeletingIds((prev) => new Set(prev).add(wishId))

    try {
      const response = await fetch(`/api/wishes/${wishId}`, {
        method: "DELETE",
      })

      if (response.ok) {
        setWishes((prev) => prev.filter((wish) => wish.id !== wishId))
        toast({
          title: "Wish deleted successfully",
          description: "The wish has been removed from the wall.",
        })
      } else {
        throw new Error("Failed to delete wish")
      }
    } catch (error) {
      console.error("Error deleting wish:", error)
      toast({
        title: "Error deleting wish",
        description: "Please try again later.",
        variant: "destructive",
      })
    } finally {
      setDeletingIds((prev) => {
        const newSet = new Set(prev)
        newSet.delete(wishId)
        return newSet
      })
    }
  }

  useEffect(() => {
    fetchWishes()
  }, [])

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    })
  }

  return (
    <PageWrapper>
      {/* Hero Section */}
      <section className="py-16 bg-gradient-to-br from-orange-50 via-pink-50 to-yellow-50 dark:from-orange-950/20 dark:via-pink-950/20 dark:to-yellow-950/20">
        <div className="container px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center space-y-6"
          >
            <h1 className="text-4xl md:text-5xl font-bold font-poppins bg-gradient-to-r from-orange-600 to-pink-600 bg-clip-text text-transparent">
              Wishes Wall
            </h1>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Read beautiful Rakshabandhan messages shared by families around the world. Feel the love and warmth in
              every wish.
            </p>
            <div className="flex justify-center">
              <Button onClick={() => fetchWishes(true)} disabled={refreshing} variant="outline">
                {refreshing ? (
                  <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                ) : (
                  <RefreshCw className="h-4 w-4 mr-2" />
                )}
                Refresh Wishes
              </Button>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Wishes Grid */}
      <section className="py-16">
        <div className="container px-4">
          {loading ? (
            <div className="flex justify-center items-center py-12">
              <Loader2 className="h-8 w-8 animate-spin text-orange-500" />
              <span className="ml-2 text-muted-foreground">Loading wishes...</span>
            </div>
          ) : error ? (
            <div className="text-center py-12">
              <MessageCircle className="h-16 w-16 text-muted-foreground mx-auto mb-4" />
              <h3 className="text-xl font-semibold mb-2">Error</h3>
              <p className="text-muted-foreground">{error}</p>
            </div>
          ) : wishes.length === 0 ? (
            <div className="text-center py-12">
              <MessageCircle className="h-16 w-16 text-muted-foreground mx-auto mb-4" />
              <h3 className="text-xl font-semibold mb-2">No wishes yet</h3>
              <p className="text-muted-foreground">Be the first to share a beautiful Rakshabandhan message!</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {wishes.map((wish, index) => (
                <motion.div
                  key={wish.id}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  viewport={{ once: true }}
                >
                  <Card className="h-full hover:shadow-lg transition-shadow relative group">
                    {/* Delete Button */}
                    <Button
                      variant="destructive"
                      size="icon"
                      className="absolute top-2 right-2 h-8 w-8 opacity-0 group-hover:opacity-100 transition-opacity z-10"
                      onClick={() => deleteWish(wish.id)}
                      disabled={deletingIds.has(wish.id)}
                    >
                      {deletingIds.has(wish.id) ? (
                        <Loader2 className="h-4 w-4 animate-spin" />
                      ) : (
                        <Trash2 className="h-4 w-4" />
                      )}
                    </Button>

                    <CardContent className="p-6 space-y-4">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-2">
                          <Heart className="h-5 w-5 text-pink-500" />
                          <span className="font-semibold text-orange-600">{wish.sender_name}</span>
                        </div>
                        <div className="flex items-center space-x-1 text-xs text-muted-foreground">
                          <Calendar className="h-3 w-3" />
                          <span>{formatDate(wish.created_at)}</span>
                        </div>
                      </div>

                      <div className="text-center py-2">
                        <span className="text-sm text-muted-foreground">to</span>
                        <div className="font-semibold text-pink-600 mt-1">{wish.recipient_name}</div>
                      </div>

                      <div className="bg-gradient-to-r from-orange-50 to-pink-50 dark:from-orange-900/10 dark:to-pink-900/10 rounded-lg p-4">
                        <p className="text-sm leading-relaxed italic">"{wish.message}"</p>
                      </div>

                      <div className="flex justify-center">
                        <div className="w-8 h-1 bg-gradient-to-r from-orange-500 to-pink-500 rounded-full"></div>
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* Stats Section */}
      {wishes.length > 0 && (
        <section className="py-16 bg-muted/50">
          <div className="container px-4">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
              className="text-center space-y-8"
            >
              <h2 className="text-3xl md:text-4xl font-bold font-poppins">Spreading Love Worldwide</h2>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-2xl mx-auto">
                <div className="space-y-2">
                  <div className="text-3xl font-bold text-orange-600">{wishes.length}</div>
                  <div className="text-sm text-muted-foreground">Wishes Shared</div>
                </div>
                <div className="space-y-2">
                  <div className="text-3xl font-bold text-pink-600">
                    {new Set(wishes.map((w) => w.sender_name)).size}
                  </div>
                  <div className="text-sm text-muted-foreground">Happy Senders</div>
                </div>
                <div className="space-y-2">
                  <div className="text-3xl font-bold text-yellow-600">
                    {new Set(wishes.map((w) => w.recipient_name)).size}
                  </div>
                  <div className="text-sm text-muted-foreground">Loved Recipients</div>
                </div>
              </div>
            </motion.div>
          </div>
        </section>
      )}
    </PageWrapper>
  )
}

"use client"

import type React from "react"

import { useState } from "react"
import { motion } from "framer-motion"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { PageWrapper } from "../page-wrapper"
import { Send, Heart, MessageCircle } from "lucide-react"
import { useToast } from "@/hooks/use-toast"

export default function SendWishesPage() {
  const [formData, setFormData] = useState({
    senderName: "",
    recipientName: "",
    message: "",
  })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const { toast } = useToast()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)

    try {
      const response = await fetch("/api/wishes", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          sender_name: formData.senderName,
          recipient_name: formData.recipientName,
          message: formData.message,
        }),
      })

      const result = await response.json()

      if (response.ok) {
        toast({
          title: "Wish sent successfully! 🎉",
          description: "Your heartfelt message has been added to our wishes wall.",
        })
        setFormData({ senderName: "", recipientName: "", message: "" })
      } else {
        throw new Error(result.error || "Failed to send wish")
      }
    } catch (error) {
      console.error("Error sending wish:", error)
      toast({
        title: "Error sending wish",
        description: "Please try again later.",
        variant: "destructive",
      })
    } finally {
      setIsSubmitting(false)
    }
  }

  const sampleMessages = [
    "Happy Rakshabandhan! May our bond of love grow stronger with each passing year. You are the best brother/sister anyone could ask for!",
    "On this special day, I want to thank you for always being my protector and guide. Wishing you happiness, success, and all the love in the world.",
    "Distance may separate us, but our hearts are always connected. Happy Rakshabandhan! Missing you and sending lots of love.",
    "Thank you for making my childhood so memorable and for being my constant support. May this Rakhi bring you joy and prosperity.",
    "Happy Rakshabandhan to the most amazing sibling! May God bless you with good health, happiness, and success in everything you do.",
  ]

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
              Send Wishes
            </h1>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Share your heartfelt Rakshabandhan wishes with your beloved siblings. Your message will be added to our
              wishes wall for everyone to see.
            </p>
          </motion.div>
        </div>
      </section>

      <section className="py-16">
        <div className="container px-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            {/* Wish Form */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
            >
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center space-x-2">
                    <MessageCircle className="h-5 w-5 text-orange-500" />
                    <span>Share Your Wishes</span>
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <form onSubmit={handleSubmit} className="space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <label className="text-sm font-medium mb-2 block">Your Name</label>
                        <Input
                          required
                          value={formData.senderName}
                          onChange={(e) => setFormData({ ...formData, senderName: e.target.value })}
                          placeholder="Enter your name"
                        />
                      </div>
                      <div>
                        <label className="text-sm font-medium mb-2 block">Recipient's Name</label>
                        <Input
                          required
                          value={formData.recipientName}
                          onChange={(e) => setFormData({ ...formData, recipientName: e.target.value })}
                          placeholder="Brother/Sister's name"
                        />
                      </div>
                    </div>
                    <div>
                      <label className="text-sm font-medium mb-2 block">Your Message</label>
                      <Textarea
                        required
                        value={formData.message}
                        onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                        placeholder="Write your heartfelt Rakshabandhan message..."
                        rows={6}
                        className="resize-none"
                      />
                      <p className="text-xs text-muted-foreground mt-1">
                        Share your love, memories, and wishes for your sibling
                      </p>
                    </div>
                    <Button
                      type="submit"
                      disabled={isSubmitting}
                      className="w-full bg-gradient-to-r from-orange-500 to-pink-500 hover:from-orange-600 hover:to-pink-600"
                    >
                      <Send className="h-4 w-4 mr-2" />
                      {isSubmitting ? "Sending..." : "Send Wish"}
                    </Button>
                  </form>
                </CardContent>
              </Card>
            </motion.div>

            {/* Sample Messages */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
              className="space-y-6"
            >
              <div>
                <h2 className="text-2xl font-bold font-poppins mb-4 flex items-center">
                  <Heart className="h-6 w-6 text-pink-500 mr-2" />
                  Message Inspiration
                </h2>
                <p className="text-muted-foreground mb-6">
                  Need inspiration? Here are some beautiful message ideas to get you started:
                </p>
              </div>

              <div className="space-y-4">
                {sampleMessages.map((message, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 10 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.4, delay: index * 0.1 }}
                    viewport={{ once: true }}
                  >
                    <Card
                      className="hover:shadow-md transition-shadow cursor-pointer"
                      onClick={() => setFormData({ ...formData, message: message })}
                    >
                      <CardContent className="p-4">
                        <p className="text-sm text-muted-foreground italic">"{message}"</p>
                        <Button variant="ghost" size="sm" className="mt-2 text-xs">
                          Click to use this message
                        </Button>
                      </CardContent>
                    </Card>
                  </motion.div>
                ))}
              </div>

              <div className="bg-gradient-to-r from-orange-100 to-pink-100 dark:from-orange-900/20 dark:to-pink-900/20 rounded-lg p-6">
                <h3 className="font-semibold mb-2">💡 Tips for Writing Great Wishes:</h3>
                <ul className="text-sm text-muted-foreground space-y-1">
                  <li>• Share a favorite memory you have together</li>
                  <li>• Express gratitude for their support and love</li>
                  <li>• Include wishes for their future happiness</li>
                  <li>• Make it personal and from the heart</li>
                  <li>• Don't worry about perfect grammar - sincerity matters most</li>
                </ul>
              </div>
            </motion.div>
          </div>
        </div>
      </section>
    </PageWrapper>
  )
}

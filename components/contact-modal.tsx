"use client"

import type React from "react"

import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { X, Linkedin, Instagram, Facebook, Send } from "lucide-react"
import { useToast } from "@/hooks/use-toast"

interface ContactModalProps {
  isOpen: boolean
  onClose: () => void
}

export function ContactModal({ isOpen, onClose }: ContactModalProps) {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    message: "",
  })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const { toast } = useToast()

  // Phone number validation - only 10 digits
  const validatePhone = (phone: string) => {
    if (!phone) return true // Phone is optional
    const phoneRegex = /^[0-9]{10}$/
    return phoneRegex.test(phone)
  }

  const handlePhoneChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value.replace(/\D/g, "").slice(0, 10) // Only digits, max 10
    setFormData({ ...formData, phone: value })
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    // Validate phone number if provided
    if (formData.phone && !validatePhone(formData.phone)) {
      toast({
        title: "Invalid phone number",
        description: "Please enter a valid 10-digit phone number or leave it empty.",
        variant: "destructive",
      })
      return
    }

    setIsSubmitting(true)

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      })

      if (response.ok) {
        const result = await response.json()

        toast({
          title: "Message sent successfully! 🎉",
          description: "Admin has been notified at 7875335539. Thank you for reaching out!",
        })

        setFormData({ name: "", email: "", phone: "", message: "" })
        onClose()
      } else {
        const error = await response.json()
        throw new Error(error.error || "Failed to send message")
      }
    } catch (error) {
      console.error("Contact error:", error)
      toast({
        title: "Error sending message",
        description: "Please try again or contact us directly at 7875335539.",
        variant: "destructive",
      })
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/50"
            onClick={onClose}
          />
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            className="relative w-full max-w-2xl max-h-[90vh] overflow-y-auto"
          >
            <Card className="border-2 border-orange-200">
              <CardHeader className="relative bg-gradient-to-r from-orange-50 to-pink-50">
                <Button variant="ghost" size="icon" className="absolute right-2 top-2" onClick={onClose}>
                  <X className="h-4 w-4" />
                </Button>
                <CardTitle className="text-2xl">Contact Support</CardTitle>
                <CardDescription className="text-base">
                  Get in touch with our developer for support, custom development, or partnership opportunities
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6 p-6">
                {/* Contact Card */}
                <div className="flex items-start space-x-6 p-6 bg-gradient-to-r from-orange-50 to-pink-50 dark:from-orange-900/20 dark:to-pink-900/20 rounded-xl border-2 border-orange-200 dark:border-orange-800">
                  <div className="flex-shrink-0">
                    <Avatar className="h-24 w-24 border-4 border-white shadow-xl">
                      <AvatarImage
                        src="/gaurav-profile.png"
                        alt="Gaurav Patil - Developer"
                        className="w-full h-full object-cover rounded-full"
                      />
                      <AvatarFallback className="bg-gradient-to-r from-orange-500 to-pink-500 text-white text-xl font-bold">
                        GP
                      </AvatarFallback>
                    </Avatar>
                  </div>
                  <div className="flex-1 min-w-0">
                    <h3 className="font-bold text-xl text-gray-900 dark:text-white mb-1">Gaurav Patil</h3>
                    <p className="text-orange-600 dark:text-orange-400 font-semibold mb-3">
                      Full Stack Developer & Support
                    </p>
                    <div className="space-y-2">
                      <a
                        href="mailto:gp949958@gmail.com"
                        className="text-sm text-gray-700 dark:text-gray-300 hover:text-orange-500 transition-colors flex items-center"
                      >
                        <span className="mr-2">📧</span>
                        gp949958@gmail.com
                      </a>
                      <a
                        href="tel:+917875335539"
                        className="text-sm text-gray-700 dark:text-gray-300 hover:text-orange-500 transition-colors flex items-center font-semibold"
                      >
                        <span className="mr-2">📞</span>
                        7875335539
                      </a>
                    </div>
                    <div className="flex space-x-3 mt-4">
                      <a
                        href="https://www.linkedin.com/in/gaurav-pati06?utm_source=share&utm_campaign=share_via&utm_content=profile&utm_medium=android_app"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-gray-500 hover:text-orange-500 transition-colors"
                      >
                        <Linkedin className="h-6 w-6" />
                      </a>
                      <a
                        href="https://www.instagram.com/gaurav_patil__06?igsh=MWFkdXVhYnZiOXoxZw=="
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-gray-500 hover:text-orange-500 transition-colors"
                      >
                        <Instagram className="h-6 w-6" />
                      </a>
                      <a
                        href="https://www.facebook.com/profile.php?id=100081183411718&mibextid=ZbWKwL"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-gray-500 hover:text-orange-500 transition-colors"
                      >
                        <Facebook className="h-6 w-6" />
                      </a>
                    </div>
                  </div>
                </div>

                {/* Contact Form */}
                <form onSubmit={handleSubmit} className="space-y-5">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="text-sm font-semibold mb-2 block">Name *</label>
                      <Input
                        required
                        value={formData.name}
                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                        placeholder="Your name"
                        className="border-2 focus:border-orange-300"
                      />
                    </div>
                    <div>
                      <label className="text-sm font-semibold mb-2 block">Email *</label>
                      <Input
                        type="email"
                        required
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        placeholder="your.email@example.com"
                        className="border-2 focus:border-orange-300"
                      />
                    </div>
                  </div>
                  <div>
                    <label className="text-sm font-semibold mb-2 block">Phone Number (Optional)</label>
                    <div className="flex">
                      <div className="flex items-center px-3 bg-orange-50 border-2 border-r-0 border-orange-200 rounded-l-md">
                        <span className="text-sm font-medium text-orange-600">+91</span>
                      </div>
                      <Input
                        type="tel"
                        value={formData.phone}
                        onChange={handlePhoneChange}
                        placeholder="9876543210"
                        maxLength={10}
                        className="rounded-l-none border-2 border-l-0 focus:border-orange-300"
                      />
                    </div>
                    <p className="text-xs text-muted-foreground mt-1">
                      Admin will be notified at 7875335539 (optional)
                    </p>
                    {formData.phone && !validatePhone(formData.phone) && (
                      <p className="text-xs text-red-500 mt-1">Please enter a valid 10-digit phone number</p>
                    )}
                  </div>
                  <div>
                    <label className="text-sm font-semibold mb-2 block">Message *</label>
                    <Textarea
                      required
                      value={formData.message}
                      onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                      placeholder="How can we help you?"
                      rows={4}
                      className="border-2 focus:border-orange-300"
                    />
                  </div>
                  <Button
                    type="submit"
                    disabled={isSubmitting || (formData.phone && !validatePhone(formData.phone))}
                    className="w-full bg-gradient-to-r from-orange-500 to-pink-500 hover:from-orange-600 hover:to-pink-600 text-white font-semibold py-3 text-lg"
                  >
                    <Send className="h-5 w-5 mr-2" />
                    {isSubmitting ? "Sending..." : "Send Message"}
                  </Button>
                </form>
              </CardContent>
            </Card>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  )
}

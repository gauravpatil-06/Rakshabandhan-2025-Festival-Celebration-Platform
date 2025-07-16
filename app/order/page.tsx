"use client"

import type React from "react"

import { useState } from "react"
import { useSearchParams } from "next/navigation"
import { motion } from "framer-motion"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { PageWrapper } from "../page-wrapper"
import { ShoppingCart, CreditCard, Truck, CheckCircle, MessageCircle, Phone } from "lucide-react"
import { useToast } from "@/hooks/use-toast"

export default function OrderPage() {
  const searchParams = useSearchParams()
  const productId = searchParams.get("product")

  const [orderData, setOrderData] = useState({
    customerName: "",
    phone: "",
    address: "",
    paymentMethod: "",
  })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [orderComplete, setOrderComplete] = useState(false)
  const [orderDetails, setOrderDetails] = useState<any>(null)
  const { toast } = useToast()

  // Update the products object with proper image URLs
  const products = {
    "rakhi-1": {
      id: "rakhi-1",
      name: "Traditional Red Gold Rakhi",
      price: 299,
      image: "/traditional-rakhi-red-gold.png",
      description: "Classic red thread with golden embellishments and beads",
    },
    "rakhi-2": {
      id: "rakhi-2",
      name: "Colorful Beaded Rakhi",
      price: 199,
      image: "/handmade-rakhi-colorful-beads.png",
      description: "Vibrant handmade rakhi with colorful beads and patterns",
    },
    "rakhi-3": {
      id: "rakhi-3",
      name: "Elegant Silver Rakhi",
      price: 599,
      image: "/silver-rakhi-elegant.png",
      description: "Sophisticated silver design with intricate metalwork",
    },
    "rakhi-4": {
      id: "rakhi-4",
      name: "Kids Cartoon Rakhi",
      price: 149,
      image: "/cartoon-rakhi-kids-fun.png",
      description: "Fun cartoon-themed rakhi perfect for younger brothers",
    },
    "rakhi-5": {
      id: "rakhi-5",
      name: "Pearl White Rakhi",
      price: 399,
      image: "/pearl-rakhi-white-elegant.png",
      description: "Elegant white rakhi with beautiful pearl decorations",
    },
    "rakhi-6": {
      id: "rakhi-6",
      name: "Traditional Mauli Rakhi",
      price: 99,
      image: "/mauli-rakhi-traditional.png",
      description: "Simple yet meaningful traditional mauli thread",
    },
    "rakhi-7": {
      id: "rakhi-7",
      name: "Modern Designer Rakhi",
      price: 449,
      image: "/modern-designer-rakhi.png",
      description: "Contemporary design with modern aesthetics and style",
    },
    "rakhi-8": {
      id: "rakhi-8",
      name: "Royal Kundan Rakhi",
      price: 799,
      image: "/placeholder-xkigo.png",
      description: "Luxurious kundan work with royal appeal and elegance",
    },
    "rakhi-9": {
      id: "rakhi-9",
      name: "Floral Thread Rakhi",
      price: 249,
      image: "/placeholder.svg?height=300&width=300&text=🌸+Floral+Rakhi",
      description: "Beautiful floral patterns with colorful thread work",
    },
    "rakhi-10": {
      id: "rakhi-10",
      name: "Zardozi Embroidered Rakhi",
      price: 699,
      image: "/placeholder.svg?height=300&width=300&text=✨+Zardozi+Rakhi",
      description: "Traditional zardozi embroidery with golden threads",
    },
    "rakhi-11": {
      id: "rakhi-11",
      name: "Crystal Stone Rakhi",
      price: 549,
      image: "/placeholder.svg?height=300&width=300&text=💎+Crystal+Rakhi",
      description: "Sparkling crystal stones with elegant metalwork",
    },
    "rakhi-12": {
      id: "rakhi-12",
      name: "Silk Thread Rakhi",
      price: 179,
      image: "/placeholder.svg?height=300&width=300&text=🧵+Silk+Rakhi",
      description: "Soft silk threads woven in beautiful patterns",
    },
    "rakhi-13": {
      id: "rakhi-13",
      name: "Peacock Feather Rakhi",
      price: 329,
      image: "/placeholder.svg?height=300&width=300&text=🦚+Peacock+Rakhi",
      description: "Unique design inspired by peacock feathers",
    },
    "rakhi-14": {
      id: "rakhi-14",
      name: "Rudraksha Bead Rakhi",
      price: 399,
      image: "/placeholder.svg?height=300&width=300&text=🔮+Rudraksha+Rakhi",
      description: "Sacred rudraksha beads with spiritual significance",
    },
    "rakhi-15": {
      id: "rakhi-15",
      name: "Gota Patti Rakhi",
      price: 459,
      image: "/placeholder.svg?height=300&width=300&text=✨+Gota+Patti",
      description: "Traditional Rajasthani gota patti work with mirrors",
    },
    "rakhi-16": {
      id: "rakhi-16",
      name: "Bracelet Style Rakhi",
      price: 349,
      image: "/placeholder.svg?height=300&width=300&text=⌚+Bracelet+Style",
      description: "Modern bracelet-style rakhi for contemporary look",
    },
    "rakhi-17": {
      id: "rakhi-17",
      name: "Wooden Bead Rakhi",
      price: 189,
      image: "/placeholder.svg?height=300&width=300&text=🌿+Wooden+Beads",
      description: "Eco-friendly wooden beads with natural finish",
    },
    "rakhi-18": {
      id: "rakhi-18",
      name: "Velvet Base Rakhi",
      price: 629,
      image: "/placeholder.svg?height=300&width=300&text=👑+Velvet+Luxury",
      description: "Luxurious velvet base with golden embellishments",
    },
    "rakhi-19": {
      id: "rakhi-19",
      name: "Resham Thread Rakhi",
      price: 219,
      image: "/placeholder.svg?height=300&width=300&text=🌈+Resham+Thread",
      description: "Colorful resham threads in traditional patterns",
    },
    "rakhi-20": {
      id: "rakhi-20",
      name: "LED Light Rakhi",
      price: 899,
      image: "/placeholder.svg?height=300&width=300&text=💡+LED+Rakhi",
      description: "Modern LED light rakhi with battery-powered illumination",
    },
  }

  const selectedProduct = productId ? products[productId as keyof typeof products] : null

  // Phone number validation - only 10 digits
  const validatePhone = (phone: string) => {
    const phoneRegex = /^[0-9]{10}$/
    return phoneRegex.test(phone)
  }

  const handlePhoneChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value.replace(/\D/g, "").slice(0, 10) // Only digits, max 10
    setOrderData({ ...orderData, phone: value })
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!selectedProduct) return

    // Validate phone number
    if (!validatePhone(orderData.phone)) {
      toast({
        title: "Invalid phone number",
        description: "Please enter a valid 10-digit phone number.",
        variant: "destructive",
      })
      return
    }

    setIsSubmitting(true)

    try {
      const response = await fetch("/api/orders", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          customer_name: orderData.customerName,
          phone: orderData.phone,
          address: orderData.address,
          payment_method: orderData.paymentMethod,
          product_id: selectedProduct.id,
          product_name: selectedProduct.name,
          price: selectedProduct.price,
        }),
      })

      if (response.ok) {
        const result = await response.json()
        const order = result.data[0]
        setOrderDetails(order)
        setOrderComplete(true)

        // Save order to localStorage for order history
        const savedOrders = JSON.parse(localStorage.getItem("rakshabandhan-orders") || "[]")
        savedOrders.unshift(order)
        localStorage.setItem("rakshabandhan-orders", JSON.stringify(savedOrders))

        toast({
          title: "Order placed successfully! 🎉",
          description: "Admin has been notified via WhatsApp at 7875335539.",
        })
      } else {
        const error = await response.json()
        throw new Error(error.error || "Failed to place order")
      }
    } catch (error) {
      console.error("Order error:", error)
      toast({
        title: "Error placing order",
        description: "Please try again later or contact support at 7875335539.",
        variant: "destructive",
      })
    } finally {
      setIsSubmitting(false)
    }
  }

  if (orderComplete && orderDetails) {
    return (
      <PageWrapper>
        <section className="py-16">
          <div className="container px-4">
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6 }}
              className="max-w-2xl mx-auto text-center space-y-8"
            >
              <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto">
                <CheckCircle className="h-10 w-10 text-green-600" />
              </div>
              <h1 className="text-4xl font-bold font-poppins text-green-600">Order Confirmed!</h1>

              {/* Order Details Card */}
              <Card className="text-left border-2 border-green-200">
                <CardHeader className="bg-green-50">
                  <CardTitle className="text-center text-green-800">Order Details</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4 p-6">
                  <div className="grid grid-cols-2 gap-4 text-sm">
                    <div>
                      <span className="font-semibold">Order ID:</span>
                      <p className="text-muted-foreground">{orderDetails.id}</p>
                    </div>
                    <div>
                      <span className="font-semibold">Date:</span>
                      <p className="text-muted-foreground">
                        {new Date(orderDetails.created_at).toLocaleDateString("en-IN")}
                      </p>
                    </div>
                    <div>
                      <span className="font-semibold">Rakhi:</span>
                      <p className="text-muted-foreground">{orderDetails.product_name}</p>
                    </div>
                    <div>
                      <span className="font-semibold">Price:</span>
                      <p className="text-orange-600 font-bold">₹{orderDetails.price}</p>
                    </div>
                    <div>
                      <span className="font-semibold">Customer:</span>
                      <p className="text-muted-foreground">{orderDetails.customer_name}</p>
                    </div>
                    <div>
                      <span className="font-semibold">Phone:</span>
                      <p className="text-muted-foreground">+91 {orderDetails.phone}</p>
                    </div>
                  </div>
                  <div>
                    <span className="font-semibold">Delivery Address:</span>
                    <p className="text-muted-foreground">{orderDetails.address}</p>
                  </div>
                  <div>
                    <span className="font-semibold">Payment Method:</span>
                    <p className="text-muted-foreground capitalize">{orderDetails.payment_method}</p>
                  </div>
                  <div>
                    <span className="font-semibold">Status:</span>
                    <p className="text-green-600 font-semibold">Confirmed ✅</p>
                  </div>
                </CardContent>
              </Card>

              <div className="bg-blue-50 dark:bg-blue-900/20 rounded-lg p-6 space-y-4 border-2 border-blue-200">
                <h3 className="font-semibold flex items-center justify-center text-blue-800 dark:text-blue-200">
                  <MessageCircle className="h-5 w-5 mr-2" />
                  Admin Notified Successfully ✅
                </h3>
                <div className="space-y-3 text-sm text-blue-700 dark:text-blue-300">
                  <div className="flex items-center justify-center space-x-3">
                    <div className="w-6 h-6 bg-blue-500 text-white rounded-full flex items-center justify-center text-xs">
                      ✓
                    </div>
                    <span>Order notification sent to admin at 7875335539</span>
                  </div>
                  <div className="flex items-center justify-center space-x-3">
                    <div className="w-6 h-6 bg-orange-500 text-white rounded-full flex items-center justify-center text-xs">
                      1
                    </div>
                    <span>Admin will contact you within 30 minutes</span>
                  </div>
                  <div className="flex items-center justify-center space-x-3">
                    <div className="w-6 h-6 bg-orange-500 text-white rounded-full flex items-center justify-center text-xs">
                      2
                    </div>
                    <span>Your Rakhi will be prepared with special care</span>
                  </div>
                  <div className="flex items-center justify-center space-x-3">
                    <div className="w-6 h-6 bg-orange-500 text-white rounded-full flex items-center justify-center text-xs">
                      3
                    </div>
                    <span>Fast delivery to your doorstep (3-5 days)</span>
                  </div>
                </div>
              </div>

              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button
                  asChild
                  className="bg-gradient-to-r from-orange-500 to-pink-500 hover:from-orange-600 hover:to-pink-600"
                >
                  <a href="/gifts">Continue Shopping</a>
                </Button>
                <Button variant="outline" asChild>
                  <a href="/order-history">View Order History</a>
                </Button>
                <Button variant="outline" asChild>
                  <a href="tel:7875335539">
                    <Phone className="h-4 w-4 mr-2" />
                    Call 7875335539
                  </a>
                </Button>
              </div>
            </motion.div>
          </div>
        </section>
      </PageWrapper>
    )
  }

  if (!selectedProduct) {
    return (
      <PageWrapper>
        <section className="py-16">
          <div className="container px-4">
            <div className="max-w-2xl mx-auto text-center space-y-6">
              <h1 className="text-4xl font-bold font-poppins">No Rakhi Selected</h1>
              <p className="text-lg text-muted-foreground">
                Please select a Rakhi from our beautiful collection to place an order.
              </p>
              <Button asChild>
                <a href="/gifts">Browse Rakhis</a>
              </Button>
            </div>
          </div>
        </section>
      </PageWrapper>
    )
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
              Order Your Rakhi
            </h1>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Complete your order details below. We'll deliver your beautiful Rakhi with love and care.
            </p>
            <div className="flex items-center justify-center">
              <Button variant="outline" asChild>
                <a href="tel:7875335539">📞 Support: 7875335539</a>
              </Button>
            </div>
          </motion.div>
        </div>
      </section>

      <section className="py-16">
        <div className="container px-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            {/* Order Form */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
            >
              <Card className="border-2 border-orange-100 hover:border-orange-300 transition-colors">
                <CardHeader>
                  <CardTitle className="flex items-center space-x-2">
                    <ShoppingCart className="h-5 w-5 text-orange-500" />
                    <span>Order Details</span>
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <form onSubmit={handleSubmit} className="space-y-6">
                    <div>
                      <label className="text-sm font-medium mb-2 block">Full Name *</label>
                      <Input
                        required
                        value={orderData.customerName}
                        onChange={(e) => setOrderData({ ...orderData, customerName: e.target.value })}
                        placeholder="Enter your full name"
                        className="border-2 focus:border-orange-300"
                      />
                    </div>

                    <div>
                      <label className="text-sm font-medium mb-2 block">Phone Number *</label>
                      <div className="flex">
                        <div className="flex items-center px-3 bg-orange-50 border-2 border-r-0 border-orange-200 rounded-l-md">
                          <span className="text-sm font-medium text-orange-600">+91</span>
                        </div>
                        <Input
                          type="tel"
                          required
                          value={orderData.phone}
                          onChange={handlePhoneChange}
                          placeholder="9876543210"
                          maxLength={10}
                          className="rounded-l-none border-2 border-l-0 focus:border-orange-300"
                        />
                      </div>
                      <p className="text-xs text-muted-foreground mt-1">
                        Admin will be notified at 7875335539 and will contact you
                      </p>
                      {orderData.phone && !validatePhone(orderData.phone) && (
                        <p className="text-xs text-red-500 mt-1">Please enter a valid 10-digit phone number</p>
                      )}
                    </div>

                    <div>
                      <label className="text-sm font-medium mb-2 block">Delivery Address *</label>
                      <Textarea
                        required
                        value={orderData.address}
                        onChange={(e) => setOrderData({ ...orderData, address: e.target.value })}
                        placeholder="Enter complete delivery address with pincode"
                        rows={4}
                        className="border-2 focus:border-orange-300"
                      />
                    </div>

                    <div>
                      <label className="text-sm font-medium mb-2 block">Selected Rakhi *</label>
                      <div className="p-4 bg-gradient-to-r from-orange-50 to-pink-50 rounded-lg border-2 border-orange-200">
                        <div className="flex items-center space-x-3">
                          <img
                            src={selectedProduct.image || "/placeholder.svg"}
                            alt={selectedProduct.name}
                            className="w-16 h-16 object-cover rounded-lg border-2 border-white shadow-sm"
                          />
                          <div>
                            <p className="font-semibold text-gray-800">{selectedProduct.name}</p>
                            <p className="text-sm text-gray-600">{selectedProduct.description}</p>
                            <p className="text-lg font-bold text-orange-600">₹{selectedProduct.price}</p>
                          </div>
                        </div>
                      </div>
                    </div>

                    <div>
                      <label className="text-sm font-medium mb-2 block">Payment Method *</label>
                      <Select
                        required
                        value={orderData.paymentMethod}
                        onValueChange={(value) => setOrderData({ ...orderData, paymentMethod: value })}
                      >
                        <SelectTrigger className="border-2 focus:border-orange-300">
                          <SelectValue placeholder="Select payment method" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="Cash on Delivery">Cash on Delivery</SelectItem>
                          <SelectItem value="UPI Payment">UPI Payment</SelectItem>
                          <SelectItem value="Credit/Debit Card">Credit/Debit Card</SelectItem>
                          <SelectItem value="Net Banking">Net Banking</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>

                    <Button
                      type="submit"
                      disabled={isSubmitting || !validatePhone(orderData.phone)}
                      className="w-full bg-gradient-to-r from-orange-500 to-pink-500 hover:from-orange-600 hover:to-pink-600 text-white font-semibold py-3 text-lg"
                    >
                      <CreditCard className="h-5 w-5 mr-2" />
                      {isSubmitting ? "Placing Order..." : "Place Order"}
                    </Button>
                  </form>
                </CardContent>
              </Card>
            </motion.div>

            {/* Order Summary */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
              className="space-y-6"
            >
              <Card className="border-2 border-pink-100 hover:border-pink-300 transition-colors">
                <CardHeader>
                  <CardTitle>Order Summary</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex space-x-4">
                    <img
                      src={selectedProduct.image || "/placeholder.svg"}
                      alt={selectedProduct.name}
                      className="w-24 h-24 object-cover rounded-lg border-2 border-orange-200"
                    />
                    <div className="flex-1">
                      <h3 className="font-semibold text-lg">{selectedProduct.name}</h3>
                      <p className="text-sm text-muted-foreground">{selectedProduct.description}</p>
                      <p className="text-2xl font-bold text-orange-600 mt-2">₹{selectedProduct.price}</p>
                    </div>
                  </div>

                  <div className="border-t pt-4 space-y-2">
                    <div className="flex justify-between text-lg">
                      <span>Subtotal</span>
                      <span>₹{selectedProduct.price}</span>
                    </div>
                    <div className="flex justify-between text-lg">
                      <span>Delivery</span>
                      <span className="text-green-600 font-semibold">Free</span>
                    </div>
                    <div className="flex justify-between font-bold text-xl border-t pt-2">
                      <span>Total</span>
                      <span className="text-orange-600">₹{selectedProduct.price}</span>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="border-2 border-green-100">
                <CardContent className="p-6">
                  <div className="flex items-center space-x-3 mb-4">
                    <Truck className="h-6 w-6 text-green-600" />
                    <span className="font-semibold text-lg">Delivery & Support</span>
                  </div>
                  <div className="space-y-3 text-sm">
                    <div className="flex items-center space-x-2">
                      <span className="w-2 h-2 bg-green-500 rounded-full"></span>
                      <span>Free delivery across India</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <span className="w-2 h-2 bg-green-500 rounded-full"></span>
                      <span>Estimated delivery: 3-5 business days</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <span className="w-2 h-2 bg-green-500 rounded-full"></span>
                      <span>Special Rakshabandhan packaging</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <span className="w-2 h-2 bg-blue-500 rounded-full"></span>
                      <span>Admin notification to 7875335539</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <span className="w-2 h-2 bg-blue-500 rounded-full"></span>
                      <span>Personal contact within 30 minutes</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <span className="w-2 h-2 bg-orange-500 rounded-full"></span>
                      <span>Cash on delivery available</span>
                    </div>
                  </div>
                  <div className="mt-4 pt-4 border-t">
                    <Button variant="outline" className="w-full bg-transparent" asChild>
                      <a href="tel:7875335539">
                        <Phone className="h-4 w-4 mr-2" />
                        Call Support: 7875335539
                      </a>
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          </div>
        </div>
      </section>
    </PageWrapper>
  )
}

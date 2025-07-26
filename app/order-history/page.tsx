"use client"

import { useState, useEffect } from "react"
import { motion } from "framer-motion"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { PageWrapper } from "../page-wrapper"
import { Trash2, Package, Calendar, Phone, ShoppingCart } from "lucide-react"
import { useToast } from "@/hooks/use-toast"
import Link from "next/link"

interface Order {
  id: string
  product_name: string
  price: number
  customer_name: string
  phone: string
  address: string
  payment_method: string
  payment_status: string
  created_at: string
}

export default function OrderHistoryPage() {
  const [orders, setOrders] = useState<Order[]>([])
  const [loading, setLoading] = useState(true)
  const { toast } = useToast()

  useEffect(() => {
    // Load orders from localStorage
    const savedOrders = localStorage.getItem("rakshabandhan-orders")
    if (savedOrders) {
      setOrders(JSON.parse(savedOrders))
    }
    setLoading(false)
  }, [])

  const removeOrder = (orderId: string) => {
    const updatedOrders = orders.filter((order) => order.id !== orderId)
    setOrders(updatedOrders)
    localStorage.setItem("rakshabandhan-orders", JSON.stringify(updatedOrders))

    toast({
      title: "Order removed",
      description: "Order has been removed from your history.",
    })
  }

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("en-IN", {
      day: "2-digit",
      month: "2-digit",
      year: "numeric",
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
              Order History
            </h1>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              View and manage all your Rakhi orders. Track your purchases and remove orders if needed.
            </p>
            <div className="flex items-center justify-center space-x-4">
              <Button asChild variant="outline">
                <Link href="/gifts">
                  <ShoppingCart className="h-4 w-4 mr-2" />
                  Continue Shopping
                </Link>
              </Button>
              <Button asChild variant="outline">
                <a href="tel:7875335539">📞 Support: 7875335539</a>
              </Button>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Orders List */}
      <section className="py-16">
        <div className="container px-4">
          {loading ? (
            <div className="text-center py-12">
              <Package className="h-16 w-16 text-muted-foreground mx-auto mb-4 animate-pulse" />
              <p className="text-muted-foreground">Loading your orders...</p>
            </div>
          ) : orders.length === 0 ? (
            <div className="text-center py-12">
              <Package className="h-16 w-16 text-muted-foreground mx-auto mb-4" />
              <h3 className="text-xl font-semibold mb-2">No orders yet</h3>
              <p className="text-muted-foreground mb-6">
                You haven't placed any orders yet. Start shopping for beautiful Rakhis!
              </p>
              <Button asChild>
                <Link href="/gifts">Browse Rakhis</Link>
              </Button>
            </div>
          ) : (
            <div className="space-y-6">
              <div className="flex items-center justify-between">
                <h2 className="text-2xl font-bold">Your Orders ({orders.length})</h2>
              </div>

              <div className="grid gap-6">
                {orders.map((order, index) => (
                  <motion.div
                    key={order.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: index * 0.1 }}
                  >
                    <Card className="hover:shadow-lg transition-shadow border-2 border-orange-100 hover:border-orange-300">
                      <CardHeader className="bg-gradient-to-r from-orange-50 to-pink-50 dark:from-orange-900/20 dark:to-pink-900/20">
                        <div className="flex justify-between items-start">
                          <div>
                            <CardTitle className="text-lg">Order #{order.id}</CardTitle>
                            <div className="flex items-center space-x-2 mt-2">
                              <Calendar className="h-4 w-4 text-muted-foreground" />
                              <span className="text-sm text-muted-foreground">{formatDate(order.created_at)}</span>
                            </div>
                          </div>
                          <div className="flex items-center space-x-2">
                            <Badge className={order.payment_status === "confirmed" ? "bg-green-500" : "bg-yellow-500"}>
                              {order.payment_status}
                            </Badge>
                            <Button
                              variant="destructive"
                              size="icon"
                              className="h-8 w-8"
                              onClick={() => removeOrder(order.id)}
                            >
                              <Trash2 className="h-4 w-4" />
                            </Button>
                          </div>
                        </div>
                      </CardHeader>
                      <CardContent className="p-6">
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                          <div>
                            <h4 className="font-semibold text-sm text-muted-foreground mb-1">Product</h4>
                            <p className="font-medium">{order.product_name}</p>
                          </div>
                          <div>
                            <h4 className="font-semibold text-sm text-muted-foreground mb-1">Price</h4>
                            <p className="font-bold text-orange-600">₹{order.price}</p>
                          </div>
                          <div>
                            <h4 className="font-semibold text-sm text-muted-foreground mb-1">Customer</h4>
                            <p className="font-medium">{order.customer_name}</p>
                          </div>
                          <div>
                            <h4 className="font-semibold text-sm text-muted-foreground mb-1">Phone</h4>
                            <div className="flex items-center space-x-2">
                              <Phone className="h-4 w-4 text-muted-foreground" />
                              <a
                                href={`tel:+91${order.phone}`}
                                className="font-medium hover:text-orange-500 transition-colors"
                              >
                                +91 {order.phone}
                              </a>
                            </div>
                          </div>
                        </div>

                        <div className="mt-4 pt-4 border-t">
                          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div>
                              <h4 className="font-semibold text-sm text-muted-foreground mb-1">Delivery Address</h4>
                              <p className="text-sm">{order.address}</p>
                            </div>
                            <div>
                              <h4 className="font-semibold text-sm text-muted-foreground mb-1">Payment Method</h4>
                              <p className="text-sm capitalize">{order.payment_method}</p>
                            </div>
                          </div>
                        </div>

                        <div className="mt-4 pt-4 border-t flex justify-between items-center">
                          <div className="text-sm text-muted-foreground">
                            Order placed on {formatDate(order.created_at)}
                          </div>
                          <div className="flex space-x-2">
                            <Button variant="outline" size="sm" asChild>
                              <a href="tel:7875335539">
                                <Phone className="h-4 w-4 mr-2" />
                                Contact Support
                              </a>
                            </Button>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  </motion.div>
                ))}
              </div>
            </div>
          )}
        </div>
      </section>

      {/* Continue Shopping */}
      {orders.length > 0 && (
        <section className="py-16 bg-muted/50">
          <div className="container px-4 text-center">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
              className="space-y-6"
            >
              <h2 className="text-3xl md:text-4xl font-bold font-poppins">Continue Shopping</h2>
              <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                Discover more beautiful Rakhis for your beloved siblings and make this Rakshabandhan extra special.
              </p>
              <Button asChild size="lg">
                <Link href="/gifts">Browse More Rakhis</Link>
              </Button>
            </motion.div>
          </div>
        </section>
      )}
    </PageWrapper>
  )
}

"use client"

import { motion } from "framer-motion"
import Link from "next/link"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { PageWrapper } from "../page-wrapper"
import { ShoppingCart, Heart, Trash2, Star, Eye } from "lucide-react"
import { useWishlist } from "@/hooks/use-wishlist"
import { useToast } from "@/hooks/use-toast"

export default function WishlistPage() {
  const { wishlist, removeFromWishlist } = useWishlist()
  const { toast } = useToast()

  const handleRemove = (id: string, title: string) => {
    removeFromWishlist(id)
    toast({
      title: "Removed from wishlist",
      description: `${title} has been removed from your wishlist.`,
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
              My Wishlist
            </h1>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Your favorite Rakshabandhan gifts saved for later. Perfect for planning your special purchases.
            </p>
            <div className="flex items-center justify-center space-x-2">
              <Heart className="h-5 w-5 text-pink-500" />
              <span className="text-muted-foreground">{wishlist.length} items in your wishlist</span>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Wishlist Items */}
      <section className="py-16">
        <div className="container px-4">
          {wishlist.length === 0 ? (
            <div className="text-center py-12">
              <Heart className="h-16 w-16 text-muted-foreground mx-auto mb-4" />
              <h3 className="text-xl font-semibold mb-2">Your wishlist is empty</h3>
              <p className="text-muted-foreground mb-6">
                Start adding your favorite gifts to create your perfect Rakshabandhan collection!
              </p>
              <Button asChild>
                <Link href="/gifts">Browse Gifts</Link>
              </Button>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {wishlist.map((item, index) => (
                <motion.div
                  key={item.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                >
                  <Card className="h-full hover:shadow-lg transition-shadow group">
                    <div className="relative overflow-hidden">
                      <img
                        src={item.image || "/placeholder.svg"}
                        alt={item.title}
                        className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
                      />
                      <div className="absolute top-2 right-2 flex space-x-1">
                        <Button variant="secondary" size="icon" className="h-8 w-8" asChild>
                          <Link href={`/gifts?view=${item.id}`}>
                            <Eye className="h-4 w-4" />
                          </Link>
                        </Button>
                        <Button
                          variant="destructive"
                          size="icon"
                          className="h-8 w-8"
                          onClick={() => handleRemove(item.id, item.title)}
                        >
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>
                      {item.originalPrice && item.originalPrice > item.price && (
                        <div className="absolute top-2 left-2">
                          <Badge className="bg-red-500">
                            {Math.round(((item.originalPrice - item.price) / item.originalPrice) * 100)}% OFF
                          </Badge>
                        </div>
                      )}
                    </div>
                    <CardHeader className="pb-2">
                      <CardTitle className="text-lg line-clamp-1">{item.title}</CardTitle>
                      <div className="flex items-center space-x-1">
                        <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                        <span className="text-sm text-muted-foreground">{item.rating}</span>
                        <Badge variant="outline" className="ml-2 text-xs">
                          {item.category}
                        </Badge>
                      </div>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <p className="text-sm text-muted-foreground line-clamp-2">{item.description}</p>
                      <div className="flex items-center space-x-2">
                        <span className="text-xl font-bold text-orange-600">₹{item.price}</span>
                        {item.originalPrice && item.originalPrice > item.price && (
                          <span className="text-sm text-muted-foreground line-through">₹{item.originalPrice}</span>
                        )}
                      </div>
                      <div className="flex space-x-2">
                        <Button
                          asChild
                          className="flex-1 bg-gradient-to-r from-orange-500 to-pink-500 hover:from-orange-600 hover:to-pink-600"
                        >
                          <Link href={`/order?product=${item.id}`}>
                            <ShoppingCart className="h-4 w-4 mr-2" />
                            Order Now
                          </Link>
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* Continue Shopping */}
      {wishlist.length > 0 && (
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
                Discover more amazing gifts for your beloved siblings and make this Rakshabandhan extra special.
              </p>
              <Button asChild size="lg">
                <Link href="/gifts">Browse More Gifts</Link>
              </Button>
            </motion.div>
          </div>
        </section>
      )}
    </PageWrapper>
  )
}

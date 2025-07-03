"use client"

import { useRef } from "react"
import { motion } from "framer-motion"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { PageWrapper } from "./page-wrapper"
import {
  Heart,
  Gift,
  MessageCircle,
  Sparkles,
  Users,
  ChevronLeft,
  ChevronRight,
  ShoppingCart,
  Star,
} from "lucide-react"
import { useWishlist } from "@/hooks/use-wishlist"
import { useToast } from "@/hooks/use-toast"

export default function HomePage() {
  const scrollRef = useRef<HTMLDivElement>(null)
  const { toggleWishlist, isInWishlist } = useWishlist()
  const { toast } = useToast()

  const features = [
    {
      icon: MessageCircle,
      title: "Send Wishes",
      description: "Share heartfelt messages with your loved ones",
      href: "/send-wishes",
    },
    {
      icon: Sparkles,
      title: "Gallery",
      description: "Explore festive Rakhi designs",
      href: "/gallery",
    },
    {
      icon: Users,
      title: "Wishes Wall",
      description: "Read beautiful messages from others",
      href: "/wishes-wall",
    },
  ]

  // 20 Rakhi products with different prices under ₹1000
  const featuredProducts = [
    {
      id: "rakhi-1",
      title: "Traditional Red Gold Rakhi",
      description: "Classic red thread with golden embellishments and beads",
      price: 299,
      image: "/traditional-rakhi-red-gold.png",
      category: "traditional",
      rating: 4.8,
      inStock: true,
    },
    {
      id: "rakhi-2",
      title: "Colorful Beaded Rakhi",
      description: "Vibrant handmade rakhi with colorful beads and patterns",
      price: 199,
      image: "/handmade-rakhi-colorful-beads.png",
      category: "handmade",
      rating: 4.6,
      inStock: true,
    },
    {
      id: "rakhi-3",
      title: "Elegant Silver Rakhi",
      description: "Sophisticated silver design with intricate metalwork",
      price: 599,
      image: "/silver-rakhi-elegant.png",
      category: "premium",
      rating: 4.9,
      inStock: true,
    },
    {
      id: "rakhi-4",
      title: "Kids Cartoon Rakhi",
      description: "Fun cartoon-themed rakhi perfect for younger brothers",
      price: 149,
      image: "/cartoon-rakhi-kids-fun.png",
      category: "designer",
      rating: 4.7,
      inStock: true,
    },
    {
      id: "rakhi-5",
      title: "Pearl White Rakhi",
      description: "Elegant white rakhi with beautiful pearl decorations",
      price: 399,
      image: "/pearl-rakhi-white-elegant.png",
      category: "premium",
      rating: 4.8,
      inStock: true,
    },
    {
      id: "rakhi-6",
      title: "Traditional Mauli Rakhi",
      description: "Simple yet meaningful traditional mauli thread",
      price: 99,
      image: "/mauli-rakhi-traditional.png",
      category: "traditional",
      rating: 4.5,
      inStock: true,
    },
    {
      id: "rakhi-7",
      title: "Modern Designer Rakhi",
      description: "Contemporary design with modern aesthetics and style",
      price: 449,
      image: "/modern-designer-rakhi.png",
      category: "designer",
      rating: 4.9,
      inStock: true,
    },
    {
      id: "rakhi-8",
      title: "Royal Kundan Rakhi",
      description: "Luxurious kundan work with royal appeal and elegance",
      price: 799,
      image: "/placeholder-xkigo.png",
      category: "premium",
      rating: 4.6,
      inStock: true,
    },
    {
      id: "rakhi-9",
      title: "Floral Thread Rakhi",
      description: "Beautiful floral patterns with colorful thread work",
      price: 249,
      image: "/placeholder.svg?height=300&width=300&text=🌸+Floral+Rakhi",
      category: "handmade",
      rating: 4.7,
      inStock: true,
    },
    {
      id: "rakhi-10",
      title: "Zardozi Embroidered Rakhi",
      description: "Traditional zardozi embroidery with golden threads",
      price: 699,
      image: "/placeholder.svg?height=300&width=300&text=✨+Zardozi+Rakhi",
      category: "traditional",
      rating: 4.8,
      inStock: true,
    },
    {
      id: "rakhi-11",
      title: "Crystal Stone Rakhi",
      description: "Sparkling crystal stones with elegant metalwork",
      price: 549,
      image: "/placeholder.svg?height=300&width=300&text=💎+Crystal+Rakhi",
      category: "designer",
      rating: 4.6,
      inStock: true,
    },
    {
      id: "rakhi-12",
      title: "Silk Thread Rakhi",
      description: "Soft silk threads woven in beautiful patterns",
      price: 179,
      image: "/placeholder.svg?height=300&width=300&text=🧵+Silk+Rakhi",
      category: "handmade",
      rating: 4.9,
      inStock: true,
    },
    {
      id: "rakhi-13",
      title: "Peacock Feather Rakhi",
      description: "Unique design inspired by peacock feathers",
      price: 329,
      image: "/placeholder.svg?height=300&width=300&text=🦚+Peacock+Rakhi",
      category: "designer",
      rating: 4.7,
      inStock: true,
    },
    {
      id: "rakhi-14",
      title: "Rudraksha Bead Rakhi",
      description: "Sacred rudraksha beads with spiritual significance",
      price: 399,
      image: "/placeholder.svg?height=300&width=300&text=🔮+Rudraksha+Rakhi",
      category: "traditional",
      rating: 4.5,
      inStock: true,
    },
    {
      id: "rakhi-15",
      title: "Gota Patti Rakhi",
      description: "Traditional Rajasthani gota patti work with mirrors",
      price: 459,
      image: "/placeholder.svg?height=300&width=300&text=✨+Gota+Patti",
      category: "traditional",
      rating: 4.8,
      inStock: true,
    },
    {
      id: "rakhi-16",
      title: "Bracelet Style Rakhi",
      description: "Modern bracelet-style rakhi for contemporary look",
      price: 349,
      image: "/placeholder.svg?height=300&width=300&text=⌚+Bracelet+Style",
      category: "designer",
      rating: 4.6,
      inStock: true,
    },
    {
      id: "rakhi-17",
      title: "Wooden Bead Rakhi",
      description: "Eco-friendly wooden beads with natural finish",
      price: 189,
      image: "/placeholder.svg?height=300&width=300&text=🌿+Wooden+Beads",
      category: "handmade",
      rating: 4.9,
      inStock: true,
    },
    {
      id: "rakhi-18",
      title: "Velvet Base Rakhi",
      description: "Luxurious velvet base with golden embellishments",
      price: 629,
      image: "/placeholder.svg?height=300&width=300&text=👑+Velvet+Luxury",
      category: "premium",
      rating: 4.7,
      inStock: true,
    },
    {
      id: "rakhi-19",
      title: "Resham Thread Rakhi",
      description: "Colorful resham threads in traditional patterns",
      price: 219,
      image: "/placeholder.svg?height=300&width=300&text=🌈+Resham+Thread",
      category: "traditional",
      rating: 4.8,
      inStock: true,
    },
    {
      id: "rakhi-20",
      title: "LED Light Rakhi",
      description: "Modern LED light rakhi with battery-powered illumination",
      price: 899,
      image: "/placeholder.svg?height=300&width=300&text=💡+LED+Rakhi",
      category: "designer",
      rating: 4.6,
      inStock: true,
    },
  ]

  const scrollLeft = () => {
    if (scrollRef.current) {
      scrollRef.current.scrollBy({ left: -300, behavior: "smooth" })
    }
  }

  const scrollRight = () => {
    if (scrollRef.current) {
      scrollRef.current.scrollBy({ left: 300, behavior: "smooth" })
    }
  }

  const handleWishlistToggle = (product: any) => {
    toggleWishlist({
      id: product.id,
      title: product.title,
      price: product.price,
      image: product.image,
      description: product.description,
      category: product.category,
      rating: product.rating,
    })

    if (isInWishlist(product.id)) {
      toast({
        title: "Removed from wishlist",
        description: `${product.title} has been removed from your wishlist.`,
      })
    } else {
      toast({
        title: "Added to wishlist ❤️",
        description: `${product.title} has been added to your wishlist.`,
      })
    }
  }

  return (
    <PageWrapper>
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-gradient-to-br from-orange-50 via-pink-50 to-yellow-50 dark:from-orange-950/20 dark:via-pink-950/20 dark:to-yellow-950/20">
        <div className="absolute inset-0 bg-[url('/festive-rakhi-pattern.png')] opacity-5"></div>
        <div className="container px-4 py-16 md:py-24 relative">
          <div className="text-center space-y-8">
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }}>
              <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold font-poppins bg-gradient-to-r from-orange-600 via-pink-600 to-yellow-600 bg-clip-text text-transparent">
                Happy Rakshabandhan
              </h1>
              <div className="flex justify-center mt-4">
                <motion.div
                  animate={{ rotate: 360 }}
                  transition={{ duration: 20, repeat: Number.POSITIVE_INFINITY, ease: "linear" }}
                >
                  <Heart className="h-8 w-8 text-pink-500" />
                </motion.div>
              </div>
            </motion.div>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto"
            >
              Celebrate the beautiful bond between brothers and sisters with love, joy, and festive spirit. Share
              wishes, explore beautiful Rakhis, and create memories that last forever.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
              className="flex flex-col sm:flex-row gap-4 justify-center"
            >
              <Button
                asChild
                size="lg"
                className="bg-gradient-to-r from-orange-500 to-pink-500 hover:from-orange-600 hover:to-pink-600"
              >
                <Link href="/gifts">
                  <Gift className="mr-2 h-5 w-5" />
                  Shop Rakhis
                </Link>
              </Button>
              <Button asChild variant="outline" size="lg">
                <Link href="/gallery">
                  <Sparkles className="mr-2 h-5 w-5" />
                  Explore Gallery
                </Link>
              </Button>
              <Button asChild variant="outline" size="lg">
                <a href="tel:7875335539">📞 7875335539</a>
              </Button>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Featured Products Slider */}
      <section className="py-16 bg-muted/30">
        <div className="container px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl md:text-4xl font-bold font-poppins mb-4">Beautiful Rakhi Collection</h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Discover our complete collection of 20 amazing Rakhis with different designs and prices under ₹1000
            </p>
          </motion.div>

          <div className="relative">
            {/* Navigation Buttons */}
            <Button
              variant="outline"
              size="icon"
              className="absolute left-0 top-1/2 -translate-y-1/2 z-10 bg-background/80 backdrop-blur-sm border-2 border-orange-300 hover:border-orange-500"
              onClick={scrollLeft}
            >
              <ChevronLeft className="h-4 w-4" />
            </Button>
            <Button
              variant="outline"
              size="icon"
              className="absolute right-0 top-1/2 -translate-y-1/2 z-10 bg-background/80 backdrop-blur-sm border-2 border-orange-300 hover:border-orange-500"
              onClick={scrollRight}
            >
              <ChevronRight className="h-4 w-4" />
            </Button>

            {/* Products Slider */}
            <div
              ref={scrollRef}
              className="flex space-x-6 overflow-x-auto scrollbar-hide pb-4 px-12"
              style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
            >
              {featuredProducts.map((product, index) => (
                <motion.div
                  key={product.id}
                  initial={{ opacity: 0, x: 50 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.05 }}
                  viewport={{ once: true }}
                  className="flex-none w-80"
                >
                  <Card className="h-full hover:shadow-xl transition-all duration-300 group border-2 border-orange-100 hover:border-orange-300">
                    <div className="relative overflow-hidden">
                      <img
                        src={product.image || "/placeholder.svg"}
                        alt={product.title}
                        className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
                      />
                      <div className="absolute top-2 right-2 flex space-x-1">
                        <Button
                          variant="secondary"
                          size="icon"
                          className="h-8 w-8 bg-white/90 hover:bg-white"
                          onClick={() => handleWishlistToggle(product)}
                        >
                          <Heart
                            className={`h-4 w-4 ${
                              isInWishlist(product.id) ? "fill-pink-500 text-pink-500" : "text-gray-600"
                            }`}
                          />
                        </Button>
                      </div>
                      <div className="absolute top-2 left-2">
                        <Badge className="bg-green-500 text-white font-semibold">₹{product.price}</Badge>
                      </div>
                    </div>
                    <CardContent className="p-6 space-y-4">
                      <div className="space-y-2">
                        <h3 className="font-semibold text-lg line-clamp-1">{product.title}</h3>
                        <div className="flex items-center space-x-2">
                          <div className="flex items-center space-x-1">
                            <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                            <span className="text-sm text-muted-foreground">{product.rating}</span>
                          </div>
                          <Badge variant="outline" className="text-xs">
                            {product.category}
                          </Badge>
                        </div>
                        <p className="text-sm text-muted-foreground line-clamp-2">{product.description}</p>
                      </div>

                      <div className="flex items-center space-x-2">
                        <span className="text-2xl font-bold text-orange-600">₹{product.price}</span>
                      </div>

                      <div className="flex space-x-2">
                        <Button
                          asChild
                          className="flex-1 bg-gradient-to-r from-orange-500 to-pink-500 hover:from-orange-600 hover:to-pink-600"
                          disabled={!product.inStock}
                        >
                          <Link href={`/order?product=${product.id}`}>
                            <ShoppingCart className="h-4 w-4 mr-2" />
                            {product.inStock ? "Buy Now" : "Out of Stock"}
                          </Link>
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </div>
          </div>

          {/* View All Button */}
          <div className="text-center mt-8">
            <Button
              asChild
              variant="outline"
              size="lg"
              className="border-2 border-orange-300 hover:border-orange-500 bg-transparent"
            >
              <Link href="/gifts">
                <Gift className="mr-2 h-5 w-5" />
                View All 20 Rakhis
              </Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 bg-background">
        <div className="container px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl md:text-4xl font-bold font-poppins mb-4">Celebrate with Love</h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Discover all the ways to make this Rakshabandhan special for you and your loved ones
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-4xl mx-auto">
            {features.map((feature, index) => (
              <motion.div
                key={feature.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
              >
                <Card className="h-full hover:shadow-lg transition-shadow cursor-pointer group border-2 border-pink-100 hover:border-pink-300">
                  <Link href={feature.href}>
                    <CardContent className="p-8 text-center space-y-4">
                      <div className="mx-auto w-16 h-16 bg-gradient-to-r from-orange-500 to-pink-500 rounded-full flex items-center justify-center group-hover:scale-110 transition-transform">
                        <feature.icon className="h-8 w-8 text-white" />
                      </div>
                      <h3 className="font-semibold text-xl">{feature.title}</h3>
                      <p className="text-muted-foreground">{feature.description}</p>
                    </CardContent>
                  </Link>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-gradient-to-r from-orange-500 to-pink-500 text-white">
        <div className="container px-4 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="space-y-6"
          >
            <h2 className="text-3xl md:text-4xl font-bold font-poppins">Share the Joy of Rakshabandhan</h2>
            <p className="text-lg opacity-90 max-w-2xl mx-auto">
              Join thousands of families celebrating this beautiful festival. Contact us for support and assistance.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button asChild variant="secondary" size="lg">
                <Link href="/wishes-wall">
                  <Users className="mr-2 h-5 w-5" />
                  View Wishes Wall
                </Link>
              </Button>
              <Button
                asChild
                variant="outline"
                size="lg"
                className="border-white text-white hover:bg-white hover:text-orange-500 bg-transparent"
              >
                <a href="tel:7875335539">📞 Call 7875335539</a>
              </Button>
            </div>
          </motion.div>
        </div>
      </section>
    </PageWrapper>
  )
}

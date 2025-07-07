"use client"

import { useState, useEffect } from "react"
import { motion } from "framer-motion"
import Link from "next/link"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { PageWrapper } from "../page-wrapper"
import { ShoppingCart, Heart, Filter, Star, Eye, Info } from "lucide-react"
import { useWishlist } from "@/hooks/use-wishlist"
import { useToast } from "@/hooks/use-toast"
import { useSearchParams } from "next/navigation"

export default function GiftsPage() {
  const [selectedCategory, setSelectedCategory] = useState("all")
  const [selectedGift, setSelectedGift] = useState<any>(null)
  const [showInfo, setShowInfo] = useState<string | null>(null)
  const { wishlist, toggleWishlist, isInWishlist } = useWishlist()
  const { toast } = useToast()
  const searchParams = useSearchParams()

  const categories = [
    { id: "all", label: "All Rakhis" },
    { id: "traditional", label: "Traditional" },
    { id: "designer", label: "Designer" },
    { id: "handmade", label: "Handmade" },
    { id: "premium", label: "Premium" },
  ]

  // Update the gifts array with proper image URLs
  const gifts = [
    {
      id: "rakhi-1",
      title: "Traditional Red Gold Rakhi",
      description: "Classic red thread with golden embellishments and beads",
      price: 299,
      image: "/traditional-rakhi-red-gold.png",
      category: "traditional",
      rating: 4.8,
      inStock: true,
      features: ["Handcrafted Design", "Premium Materials", "Gift Box Included", "Free Delivery"],
      detailedInfo:
        "This traditional rakhi features classic red thread work with beautiful golden embellishments. Made with high-quality materials and traditional craftsmanship techniques.",
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
      features: ["Colorful Beads", "Handmade", "Unique Design", "Eco-Friendly"],
      detailedInfo:
        "Beautiful handcrafted rakhi with vibrant colorful beads arranged in attractive patterns. Each piece is unique and made with love by skilled artisans.",
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
      features: ["Silver Work", "Premium Quality", "Elegant Design", "Long Lasting"],
      detailedInfo:
        "Premium silver rakhi with intricate metalwork and elegant design. Perfect for brothers who appreciate sophisticated and classy accessories.",
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
      features: ["Cartoon Design", "Kid-Friendly", "Bright Colors", "Safe Materials"],
      detailedInfo:
        "Specially designed for kids with fun cartoon characters and bright colors. Made with safe, non-toxic materials perfect for younger brothers.",
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
      features: ["Pearl Decoration", "White Theme", "Elegant Look", "Premium Finish"],
      detailedInfo:
        "Sophisticated white rakhi adorned with beautiful pearls. The elegant design makes it perfect for special occasions and formal celebrations.",
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
      features: ["Traditional Mauli", "Simple Design", "Spiritual Significance", "Affordable"],
      detailedInfo:
        "Traditional mauli rakhi with deep spiritual significance. Simple yet meaningful design that represents the pure bond between siblings.",
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
      features: ["Modern Design", "Contemporary Style", "Unique Pattern", "Trendy Look"],
      detailedInfo:
        "Modern designer rakhi with contemporary aesthetics. Features unique patterns and trendy design elements perfect for style-conscious brothers.",
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
      features: ["Kundan Work", "Royal Design", "Luxurious Look", "Premium Craftsmanship"],
      detailedInfo:
        "Luxurious rakhi featuring traditional kundan work with royal appeal. Crafted with premium materials and exquisite attention to detail.",
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
      features: ["Floral Design", "Colorful Threads", "Handcrafted", "Natural Look"],
      detailedInfo:
        "Handcrafted rakhi with beautiful floral patterns made using colorful threads. The natural design brings freshness and beauty to the celebration.",
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
      features: ["Zardozi Work", "Golden Threads", "Traditional Art", "Handembroidered"],
      detailedInfo:
        "Exquisite rakhi featuring traditional zardozi embroidery work with golden threads. A masterpiece of traditional Indian craftsmanship.",
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
      features: ["Crystal Stones", "Sparkling Design", "Metalwork", "Eye-catching"],
      detailedInfo:
        "Stunning rakhi adorned with sparkling crystal stones and elegant metalwork. The design catches light beautifully and creates a mesmerizing effect.",
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
      features: ["Silk Threads", "Soft Texture", "Beautiful Patterns", "Comfortable"],
      detailedInfo:
        "Handwoven rakhi made with soft silk threads in beautiful patterns. The comfortable texture and elegant design make it perfect for daily wear.",
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
      features: ["Peacock Design", "Unique Pattern", "Colorful", "Nature Inspired"],
      detailedInfo:
        "Unique rakhi design inspired by beautiful peacock feathers. The colorful pattern and nature-inspired design make it truly special and eye-catching.",
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
      features: ["Rudraksha Beads", "Spiritual Significance", "Natural", "Blessed"],
      detailedInfo:
        "Sacred rakhi made with authentic rudraksha beads. Known for their spiritual significance and positive energy, perfect for devotional brothers.",
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
      features: ["Gota Patti Work", "Mirror Work", "Rajasthani Art", "Traditional"],
      detailedInfo:
        "Beautiful rakhi featuring traditional Rajasthani gota patti work with tiny mirrors. The intricate craftsmanship reflects the rich cultural heritage.",
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
      features: ["Bracelet Style", "Modern Look", "Adjustable", "Trendy Design"],
      detailedInfo:
        "Contemporary bracelet-style rakhi with modern design elements. Adjustable size and trendy look make it perfect for fashion-forward brothers.",
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
      features: ["Wooden Beads", "Eco-Friendly", "Natural Finish", "Sustainable"],
      detailedInfo:
        "Eco-friendly rakhi made with natural wooden beads. The sustainable materials and natural finish make it perfect for environmentally conscious celebrations.",
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
      features: ["Velvet Base", "Luxurious Feel", "Golden Work", "Premium Quality"],
      detailedInfo:
        "Luxurious rakhi with soft velvet base and beautiful golden embellishments. The premium materials and craftsmanship create an elegant and rich appearance.",
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
      features: ["Resham Threads", "Traditional Patterns", "Colorful", "Soft Texture"],
      detailedInfo:
        "Traditional rakhi made with colorful resham threads in classic patterns. The soft texture and vibrant colors represent the joy of the festival.",
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
      features: ["LED Lights", "Battery Powered", "Modern Tech", "Unique Design"],
      detailedInfo:
        "Innovative rakhi with LED lights and battery power. This modern technological twist on traditional rakhi creates a unique and memorable experience.",
    },
  ]

  const filteredGifts = selectedCategory === "all" ? gifts : gifts.filter((gift) => gift.category === selectedCategory)

  // Check if we need to show a specific gift modal from URL
  useEffect(() => {
    const viewId = searchParams.get("view")
    if (viewId) {
      const gift = gifts.find((g) => g.id === viewId)
      if (gift) {
        setSelectedGift(gift)
      }
    }
  }, [searchParams])

  const handleWishlistToggle = (gift: any) => {
    toggleWishlist({
      id: gift.id,
      title: gift.title,
      price: gift.price,
      image: gift.image,
      description: gift.description,
      category: gift.category,
      rating: gift.rating,
    })

    if (isInWishlist(gift.id)) {
      toast({
        title: "Removed from wishlist",
        description: `${gift.title} has been removed from your wishlist.`,
      })
    } else {
      toast({
        title: "Added to wishlist ❤️",
        description: `${gift.title} has been added to your wishlist.`,
      })
    }
  }

  const GiftModal = ({ gift, onClose }: { gift: any; onClose: () => void }) => {
    if (!gift) return null

    return (
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.9 }}
          className="bg-background rounded-lg max-w-4xl w-full max-h-[90vh] overflow-y-auto"
        >
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 p-6">
            {/* Image Section */}
            <div className="space-y-4">
              <div className="aspect-square bg-muted rounded-lg overflow-hidden">
                <img src={gift.image || "/placeholder.svg"} alt={gift.title} className="w-full h-full object-cover" />
              </div>
              <div className="grid grid-cols-3 gap-2">
                {[gift.image, gift.image, gift.image].map((img, idx) => (
                  <div key={idx} className="aspect-square bg-muted rounded-lg overflow-hidden">
                    <img
                      src={img || "/placeholder.svg"}
                      alt={`${gift.title} view ${idx + 1}`}
                      className="w-full h-full object-cover cursor-pointer hover:opacity-80"
                    />
                  </div>
                ))}
              </div>
            </div>

            {/* Details Section */}
            <div className="space-y-6">
              <div className="flex justify-between items-start">
                <div>
                  <h2 className="text-2xl font-bold">{gift.title}</h2>
                  <div className="flex items-center space-x-2 mt-2">
                    <div className="flex items-center space-x-1">
                      <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                      <span className="text-sm">{gift.rating}</span>
                    </div>
                    <Badge variant="secondary">{gift.category}</Badge>
                  </div>
                </div>
                <Button variant="ghost" onClick={onClose}>
                  ✕
                </Button>
              </div>

              <p className="text-muted-foreground">{gift.description}</p>

              {/* Detailed Information */}
              <div className="bg-muted/50 rounded-lg p-4">
                <h3 className="font-semibold mb-2">Product Details:</h3>
                <p className="text-sm text-muted-foreground">{gift.detailedInfo}</p>
              </div>

              <div className="space-y-2">
                <h3 className="font-semibold">Features:</h3>
                <ul className="space-y-1">
                  {gift.features.map((feature: string, idx: number) => (
                    <li key={idx} className="text-sm text-muted-foreground flex items-center">
                      <span className="w-2 h-2 bg-orange-500 rounded-full mr-2"></span>
                      {feature}
                    </li>
                  ))}
                </ul>
              </div>

              <div className="space-y-4">
                <div className="flex items-center space-x-4">
                  <span className="text-3xl font-bold text-orange-600">₹{gift.price}</span>
                </div>

                <div className="flex space-x-3">
                  <Button
                    asChild
                    className="flex-1 bg-gradient-to-r from-orange-500 to-pink-500 hover:from-orange-600 hover:to-pink-600"
                    disabled={!gift.inStock}
                  >
                    <Link href={`/order?product=${gift.id}`}>
                      <ShoppingCart className="h-4 w-4 mr-2" />
                      {gift.inStock ? "Order Now" : "Out of Stock"}
                    </Link>
                  </Button>
                  <Button variant="outline" size="icon" onClick={() => handleWishlistToggle(gift)}>
                    <Heart className={`h-4 w-4 ${isInWishlist(gift.id) ? "fill-pink-500 text-pink-500" : ""}`} />
                  </Button>
                </div>

                <div className="bg-muted/50 rounded-lg p-4 space-y-2">
                  <h4 className="font-semibold text-sm">Delivery Information:</h4>
                  <div className="text-sm text-muted-foreground space-y-1">
                    <p>• Free delivery across India</p>
                    <p>• Estimated delivery: 3-5 business days</p>
                    <p>• Special Rakshabandhan packaging</p>
                    <p>• Support: 7875335539</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
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
              Beautiful Rakhi Collection
            </h1>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Discover our exclusive collection of 20 beautiful Rakhis with different designs and prices. From
              traditional to modern, find the perfect Rakhi for your beloved brother.
            </p>
            <div className="flex items-center justify-center space-x-4">
              <Button asChild variant="outline">
                <Link href="/wishlist">
                  <Heart className="h-4 w-4 mr-2" />
                  My Wishlist ({wishlist.length})
                </Link>
              </Button>
              <Button asChild variant="outline">
                <Link href="/order-history">📋 Order History</Link>
              </Button>
              <Button asChild variant="outline">
                <a href="tel:7875335539">📞 7875335539</a>
              </Button>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Category Filter */}
      <section className="py-8 bg-background border-b">
        <div className="container px-4">
          <div className="flex flex-wrap justify-center gap-2">
            {categories.map((category) => (
              <Button
                key={category.id}
                variant={selectedCategory === category.id ? "default" : "outline"}
                size="sm"
                onClick={() => setSelectedCategory(category.id)}
                className={selectedCategory === category.id ? "bg-gradient-to-r from-orange-500 to-pink-500" : ""}
              >
                <Filter className="h-4 w-4 mr-2" />
                {category.label}
              </Button>
            ))}
          </div>
        </div>
      </section>

      {/* Gifts Grid */}
      <section className="py-16">
        <div className="container px-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {filteredGifts.map((gift, index) => (
              <motion.div
                key={gift.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
              >
                <Card className="h-full hover:shadow-lg transition-shadow group border-2 border-orange-100 hover:border-orange-300">
                  <div className="relative overflow-hidden">
                    <img
                      src={gift.image || "/placeholder.svg"}
                      alt={gift.title}
                      className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                    {!gift.inStock && (
                      <div className="absolute inset-0 bg-black/50 flex items-center justify-center">
                        <Badge variant="secondary">Out of Stock</Badge>
                      </div>
                    )}
                    <div className="absolute top-2 right-2 flex space-x-1">
                      <Button variant="secondary" size="icon" className="h-8 w-8" onClick={() => setSelectedGift(gift)}>
                        <Eye className="h-4 w-4" />
                      </Button>
                      <Button
                        variant="secondary"
                        size="icon"
                        className="h-8 w-8"
                        onClick={() => handleWishlistToggle(gift)}
                      >
                        <Heart className={`h-4 w-4 ${isInWishlist(gift.id) ? "fill-pink-500 text-pink-500" : ""}`} />
                      </Button>
                    </div>
                    <div className="absolute top-2 left-2">
                      <Badge className="bg-green-500 text-white font-semibold">₹{gift.price}</Badge>
                    </div>
                  </div>
                  <CardHeader className="pb-2">
                    <CardTitle className="text-lg line-clamp-1">{gift.title}</CardTitle>
                    <div className="flex items-center space-x-1">
                      <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                      <span className="text-sm text-muted-foreground">{gift.rating}</span>
                    </div>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <p className="text-sm text-muted-foreground line-clamp-2">{gift.description}</p>

                    {/* Read More Button */}
                    <Button
                      variant="ghost"
                      size="sm"
                      className="text-xs p-0 h-auto"
                      onClick={() => setShowInfo(showInfo === gift.id ? null : gift.id)}
                    >
                      <Info className="h-3 w-3 mr-1" />
                      {showInfo === gift.id ? "Show Less" : "Read More"}
                    </Button>

                    {/* Detailed Info */}
                    {showInfo === gift.id && (
                      <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: "auto" }}
                        exit={{ opacity: 0, height: 0 }}
                        className="text-xs text-muted-foreground bg-muted/50 rounded p-2"
                      >
                        {gift.detailedInfo}
                      </motion.div>
                    )}

                    <div className="flex items-center space-x-2">
                      <span className="text-xl font-bold text-orange-600">₹{gift.price}</span>
                    </div>
                    <div className="flex space-x-2">
                      <Button
                        asChild
                        className="flex-1 bg-gradient-to-r from-orange-500 to-pink-500 hover:from-orange-600 hover:to-pink-600"
                        disabled={!gift.inStock}
                      >
                        <Link href={`/order?product=${gift.id}`}>
                          <ShoppingCart className="h-4 w-4 mr-2" />
                          {gift.inStock ? "Buy Now" : "Out of Stock"}
                        </Link>
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Gift Modal */}
      {selectedGift && <GiftModal gift={selectedGift} onClose={() => setSelectedGift(null)} />}

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
            <h2 className="text-3xl md:text-4xl font-bold font-poppins">Need Help Choosing?</h2>
            <p className="text-lg opacity-90 max-w-2xl mx-auto">
              Contact our support team for personalized Rakhi recommendations and assistance.
            </p>
            <Button variant="secondary" size="lg" asChild>
              <a href="tel:7875335539">📞 Call 7875335539</a>
            </Button>
          </motion.div>
        </div>
      </section>
    </PageWrapper>
  )
}

"use client"

import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { PageWrapper } from "../page-wrapper"
import { X, Download, Heart } from "lucide-react"
import { useToast } from "@/hooks/use-toast"

export default function GalleryPage() {
  const [selectedImage, setSelectedImage] = useState<number | null>(null)
  const { toast } = useToast()

  const images = [
    {
      id: 1,
      src: "/traditional-rakhi-red-gold.png",
      title: "Traditional Red & Gold Rakhi",
      description: "Classic design with red thread and golden embellishments",
    },
    {
      id: 2,
      src: "/handmade-rakhi-colorful-beads.png",
      title: "Handmade Beaded Rakhi",
      description: "Colorful beaded design perfect for younger brothers",
    },
    {
      id: 3,
      src: "/silver-rakhi-elegant.png",
      title: "Elegant Silver Rakhi",
      description: "Sophisticated silver design with intricate patterns",
    },
    {
      id: 4,
      src: "/cartoon-rakhi-kids-fun.png",
      title: "Kids Cartoon Rakhi",
      description: "Fun cartoon-themed rakhi for little brothers",
    },
    {
      id: 5,
      src: "/pearl-rakhi-white-elegant.png",
      title: "Pearl White Rakhi",
      description: "Elegant white rakhi with pearl decorations",
    },
    {
      id: 6,
      src: "/mauli-rakhi-traditional.png",
      title: "Traditional Mauli Rakhi",
      description: "Simple yet meaningful traditional mauli thread",
    },
    {
      id: 7,
      src: "/modern-designer-rakhi.png",
      title: "Designer Modern Rakhi",
      description: "Contemporary design with modern aesthetics",
    },
    {
      id: 8,
      src: "/placeholder-xkigo.png",
      title: "Royal Kundan Rakhi",
      description: "Luxurious kundan work with royal appeal",
    },
    {
      id: 9,
      src: "/placeholder.svg?height=400&width=400",
      title: "Colorful Thread Work",
      description: "Vibrant thread work in multiple colors",
    },
    {
      id: 10,
      src: "/placeholder.svg?height=400&width=400",
      title: "Zardozi Embroidered Rakhi",
      description: "Traditional zardozi embroidery work",
    },
    {
      id: 11,
      src: "/placeholder.svg?height=400&width=400",
      title: "Floral Design Rakhi",
      description: "Beautiful floral patterns and motifs",
    },
    {
      id: 12,
      src: "/placeholder.svg?height=400&width=400",
      title: "Bracelet Style Rakhi",
      description: "Modern bracelet-style rakhi design",
    },
  ]

  const downloadImage = async (imageUrl: string, imageName: string) => {
    try {
      // Create a temporary link element
      const link = document.createElement("a")
      link.href = imageUrl
      link.download = `${imageName}.png`

      // Trigger download
      document.body.appendChild(link)
      link.click()
      document.body.removeChild(link)

      // Show success message
      toast({
        title: "Image downloaded! 📸",
        description: `${imageName} has been saved to your gallery.`,
      })

      // Simulate adding to device gallery (this would be handled by the browser/OS)
      console.log(`Image "${imageName}" downloaded and added to gallery`)
    } catch (error) {
      toast({
        title: "Download failed",
        description: "Please try again or save the image manually.",
        variant: "destructive",
      })
    }
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
              Rakhi Gallery
            </h1>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Explore our beautiful collection of traditional and modern Rakhi designs. Find inspiration for your
              perfect Rakhi choice and download your favorites.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Gallery Grid */}
      <section className="py-16">
        <div className="container px-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {images.map((image, index) => (
              <motion.div
                key={image.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
              >
                <Card className="overflow-hidden hover:shadow-lg transition-shadow cursor-pointer group">
                  <div className="relative aspect-square overflow-hidden" onClick={() => setSelectedImage(index)}>
                    <img
                      src={image.src || "/placeholder.svg"}
                      alt={image.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                    <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors duration-300 flex items-center justify-center">
                      <Heart className="h-8 w-8 text-white opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                    </div>
                    {/* Quick Download Button */}
                    <Button
                      variant="secondary"
                      size="icon"
                      className="absolute top-2 right-2 h-8 w-8 opacity-0 group-hover:opacity-100 transition-opacity"
                      onClick={(e) => {
                        e.stopPropagation()
                        downloadImage(image.src, image.title)
                      }}
                    >
                      <Download className="h-4 w-4" />
                    </Button>
                  </div>
                  <CardContent className="p-4">
                    <h3 className="font-semibold text-sm mb-1">{image.title}</h3>
                    <p className="text-xs text-muted-foreground">{image.description}</p>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Modal */}
      <AnimatePresence>
        {selectedImage !== null && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black/80"
              onClick={() => setSelectedImage(null)}
            />
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.8 }}
              className="relative max-w-4xl max-h-[90vh] bg-background rounded-lg overflow-hidden"
            >
              <div className="absolute top-4 right-4 z-10 flex space-x-2">
                <Button
                  variant="secondary"
                  size="icon"
                  onClick={() => downloadImage(images[selectedImage].src, images[selectedImage].title)}
                >
                  <Download className="h-4 w-4" />
                </Button>
                <Button variant="secondary" size="icon" onClick={() => setSelectedImage(null)}>
                  <X className="h-4 w-4" />
                </Button>
              </div>
              <div className="p-6">
                <img
                  src={images[selectedImage].src || "/placeholder.svg"}
                  alt={images[selectedImage].title}
                  className="w-full h-auto max-h-[70vh] object-contain rounded-lg"
                />
                <div className="mt-4 text-center">
                  <h3 className="text-xl font-semibold mb-2">{images[selectedImage].title}</h3>
                  <p className="text-muted-foreground">{images[selectedImage].description}</p>
                  <Button
                    className="mt-4"
                    onClick={() => downloadImage(images[selectedImage].src, images[selectedImage].title)}
                  >
                    <Download className="h-4 w-4 mr-2" />
                    Download Image
                  </Button>
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </PageWrapper>
  )
}

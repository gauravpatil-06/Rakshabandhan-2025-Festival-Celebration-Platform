"use client"

import { motion } from "framer-motion"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { PageWrapper } from "../page-wrapper"
import { Heart, Calendar, Users, Gift } from "lucide-react"

export default function AboutPage() {
  const timeline = [
    {
      year: "Ancient Times",
      event: "Origins in Hindu Mythology",
      description:
        "The festival traces back to ancient Hindu scriptures and mythology, symbolizing the protective bond between siblings.",
    },
    {
      year: "Medieval Period",
      event: "Historical Significance",
      description: "Queens would send rakhi to neighboring rulers, seeking protection and forming alliances.",
    },
    {
      year: "Modern Era",
      event: "Contemporary Celebration",
      description:
        "Today, Rakshabandhan is celebrated worldwide by people of all backgrounds, emphasizing love and protection.",
    },
  ]

  const significance = [
    {
      icon: Heart,
      title: "Bond of Love",
      description: "Celebrates the unconditional love between brothers and sisters",
    },
    {
      icon: Users,
      title: "Family Unity",
      description: "Brings families together and strengthens relationships",
    },
    {
      icon: Gift,
      title: "Exchange of Gifts",
      description: "Tradition of giving gifts as tokens of love and appreciation",
    },
    {
      icon: Calendar,
      title: "Annual Tradition",
      description: "Celebrated every year on the full moon day of Shravan month",
    },
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
              About Rakshabandhan
            </h1>
            <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
              Discover the rich history, cultural significance, and beautiful traditions of one of India's most
              cherished festivals celebrating the bond between siblings.
            </p>
          </motion.div>
        </div>
      </section>

      {/* What is Rakshabandhan */}
      <section className="py-16">
        <div className="container px-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
              className="space-y-6"
            >
              <h2 className="text-3xl md:text-4xl font-bold font-poppins">What is Rakshabandhan?</h2>
              <div className="space-y-4 text-muted-foreground">
                <p>
                  Rakshabandhan, also known as Rakhi, is a beautiful Hindu festival that celebrates the sacred bond
                  between brothers and sisters. The word "Rakshabandhan" comes from Sanskrit, where "Raksha" means
                  protection and "Bandhan" means bond.
                </p>
                <p>
                  On this auspicious day, sisters tie a sacred thread called "Rakhi" around their brothers' wrists,
                  symbolizing their love and prayers for their well-being. In return, brothers promise to protect their
                  sisters and often give gifts as a token of their affection.
                </p>
                <p>
                  This festival transcends biological relationships and is celebrated between cousins, friends, and even
                  neighbors, emphasizing the universal values of love, care, and protection.
                </p>
              </div>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
              className="relative"
            >
              <div className="aspect-square bg-gradient-to-br from-orange-100 to-pink-100 dark:from-orange-900/20 dark:to-pink-900/20 rounded-2xl flex items-center justify-center">
                <img src="/beautiful-rakhi-thread.png" alt="Traditional Rakhi" className="w-3/4 h-3/4 object-contain" />
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Significance */}
      <section className="py-16 bg-muted/50">
        <div className="container px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl md:text-4xl font-bold font-poppins mb-4">Cultural Significance</h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Understanding the deeper meaning and importance of Rakshabandhan in our lives
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {significance.map((item, index) => (
              <motion.div
                key={item.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
              >
                <Card className="h-full text-center">
                  <CardContent className="p-6 space-y-4">
                    <div className="mx-auto w-12 h-12 bg-gradient-to-r from-orange-500 to-pink-500 rounded-full flex items-center justify-center">
                      <item.icon className="h-6 w-6 text-white" />
                    </div>
                    <h3 className="font-semibold text-lg">{item.title}</h3>
                    <p className="text-muted-foreground text-sm">{item.description}</p>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Timeline */}
      <section className="py-16">
        <div className="container px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl md:text-4xl font-bold font-poppins mb-4">History & Timeline</h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Journey through the rich history of Rakshabandhan across different eras
            </p>
          </motion.div>

          <div className="max-w-4xl mx-auto">
            {timeline.map((item, index) => (
              <motion.div
                key={item.year}
                initial={{ opacity: 0, x: index % 2 === 0 ? -20 : 20 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6, delay: index * 0.2 }}
                viewport={{ once: true }}
                className="relative"
              >
                <div className={`flex items-center mb-8 ${index % 2 === 0 ? "flex-row" : "flex-row-reverse"}`}>
                  <div className={`w-1/2 ${index % 2 === 0 ? "pr-8" : "pl-8"}`}>
                    <Card>
                      <CardHeader>
                        <CardTitle className="text-orange-600">{item.year}</CardTitle>
                        <h3 className="font-semibold">{item.event}</h3>
                      </CardHeader>
                      <CardContent>
                        <p className="text-muted-foreground">{item.description}</p>
                      </CardContent>
                    </Card>
                  </div>
                  <div className="w-4 h-4 bg-gradient-to-r from-orange-500 to-pink-500 rounded-full relative z-10"></div>
                  <div className="w-1/2"></div>
                </div>
                {index < timeline.length - 1 && (
                  <div className="absolute left-1/2 transform -translate-x-1/2 w-0.5 h-8 bg-gradient-to-b from-orange-500 to-pink-500 -mt-4"></div>
                )}
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Traditions */}
      <section className="py-16 bg-gradient-to-r from-orange-500 to-pink-500 text-white">
        <div className="container px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="text-center space-y-8"
          >
            <h2 className="text-3xl md:text-4xl font-bold font-poppins">Traditional Celebrations</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-4xl mx-auto">
              <div className="space-y-4">
                <div className="w-16 h-16 bg-white/20 rounded-full flex items-center justify-center mx-auto">
                  <span className="text-2xl">🧵</span>
                </div>
                <h3 className="font-semibold text-xl">Tying Rakhi</h3>
                <p className="opacity-90">
                  Sisters tie the sacred thread around their brothers' wrists with prayers and blessings.
                </p>
              </div>
              <div className="space-y-4">
                <div className="w-16 h-16 bg-white/20 rounded-full flex items-center justify-center mx-auto">
                  <span className="text-2xl">🍬</span>
                </div>
                <h3 className="font-semibold text-xl">Sweet Exchange</h3>
                <p className="opacity-90">
                  Families share traditional sweets and delicacies as part of the celebration.
                </p>
              </div>
              <div className="space-y-4">
                <div className="w-16 h-16 bg-white/20 rounded-full flex items-center justify-center mx-auto">
                  <span className="text-2xl">🎁</span>
                </div>
                <h3 className="font-semibold text-xl">Gift Giving</h3>
                <p className="opacity-90">
                  Brothers give gifts to their sisters as a token of love and promise of protection.
                </p>
              </div>
            </div>
          </motion.div>
        </div>
      </section>
    </PageWrapper>
  )
}

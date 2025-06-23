"use client"

import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Heart, Phone, Mail, Linkedin, Instagram, Facebook } from "lucide-react"

interface FooterProps {
  onContactClick: () => void
}

export function Footer({ onContactClick }: FooterProps) {
  return (
    <footer className="border-t bg-muted/50">
      <div className="container py-8 px-4">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Brand */}
          <div className="space-y-4">
            <div className="flex items-center space-x-2">
              <Heart className="h-6 w-6 text-orange-500" />
              <span className="font-bold text-lg bg-gradient-to-r from-orange-500 to-pink-500 bg-clip-text text-transparent">
                Happy Rakshabandhan
              </span>
            </div>
            <p className="text-sm text-muted-foreground">
              Celebrating the beautiful bond between brothers and sisters with love, joy, and festive spirit.
            </p>
          </div>

          {/* Quick Links */}
          <div className="space-y-4">
            <h3 className="font-semibold">Quick Links</h3>
            <div className="flex flex-col space-y-2">
              <Link href="/about" className="text-sm text-muted-foreground hover:text-orange-500 transition-colors">
                About Festival
              </Link>
              <Link href="/gallery" className="text-sm text-muted-foreground hover:text-orange-500 transition-colors">
                Gallery
              </Link>
              <Link href="/gifts" className="text-sm text-muted-foreground hover:text-orange-500 transition-colors">
                Gift Ideas
              </Link>
              <Link
                href="/wishes-wall"
                className="text-sm text-muted-foreground hover:text-orange-500 transition-colors"
              >
                Wishes Wall
              </Link>
            </div>
          </div>

          {/* Features */}
          <div className="space-y-4">
            <h3 className="font-semibold">Features</h3>
            <div className="flex flex-col space-y-2">
              <Link
                href="/send-wishes"
                className="text-sm text-muted-foreground hover:text-orange-500 transition-colors"
              >
                Send Wishes
              </Link>
              <Link href="/wishlist" className="text-sm text-muted-foreground hover:text-orange-500 transition-colors">
                My Wishlist
              </Link>
              <Link href="/order" className="text-sm text-muted-foreground hover:text-orange-500 transition-colors">
                Order Gifts
              </Link>
              <button
                onClick={onContactClick}
                className="text-sm text-muted-foreground hover:text-orange-500 transition-colors text-left"
              >
                Contact Support
              </button>
            </div>
          </div>

          {/* Contact Info */}
          <div className="space-y-4">
            <h3 className="font-semibold">Contact Developer</h3>
            <div className="space-y-3">
              <div className="flex items-center space-x-2">
                <Mail className="h-4 w-4 text-orange-500" />
                <a
                  href="mailto:gp949958@gmail.com"
                  className="text-sm text-muted-foreground hover:text-orange-500 transition-colors"
                >
                  gp949958@gmail.com
                </a>
              </div>
              <div className="flex items-center space-x-2">
                <Phone className="h-4 w-4 text-orange-500" />
                <a
                  href="tel:+917875335539"
                  className="text-sm text-muted-foreground hover:text-orange-500 transition-colors"
                >
                  7875335539
                </a>
              </div>
              <div className="flex space-x-2">
                <a
                  href="https://www.linkedin.com/in/gaurav-pati06?utm_source=share&utm_campaign=share_via&utm_content=profile&utm_medium=android_app"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-muted-foreground hover:text-orange-500 transition-colors"
                >
                  <Linkedin className="h-4 w-4" />
                </a>
                <a
                  href="https://www.instagram.com/gaurav_patil__06?igsh=MWFkdXVhYnZiOXoxZw=="
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-muted-foreground hover:text-orange-500 transition-colors"
                >
                  <Instagram className="h-4 w-4" />
                </a>
                <a
                  href="https://www.facebook.com/profile.php?id=100081183411718&mibextid=ZbWKwL"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-muted-foreground hover:text-orange-500 transition-colors"
                >
                  <Facebook className="h-4 w-4" />
                </a>
              </div>
              <Button variant="outline" size="sm" onClick={onContactClick} className="w-full bg-transparent">
                <Phone className="h-4 w-4 mr-2" />
                Contact Developer
              </Button>
            </div>
          </div>
        </div>

        <div className="mt-8 pt-8 border-t text-center">
          <p className="text-sm text-muted-foreground">
            © 2025 Happy Rakshabandhan. Made with ❤️ by Gaurav Patil. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  )
}

"use client"

import type React from "react"

import { useState } from "react"
import { Header } from "@/components/layout/header"
import { Footer } from "@/components/layout/footer"
import { ContactModal } from "@/components/contact-modal"

interface PageWrapperProps {
  children: React.ReactNode
}

export function PageWrapper({ children }: PageWrapperProps) {
  const [isContactModalOpen, setIsContactModalOpen] = useState(false)

  return (
    <div className="min-h-screen flex flex-col">
      <Header onContactClick={() => setIsContactModalOpen(true)} />
      <main className="flex-1">{children}</main>
      <Footer onContactClick={() => setIsContactModalOpen(true)} />
      <ContactModal isOpen={isContactModalOpen} onClose={() => setIsContactModalOpen(false)} />
    </div>
  )
}

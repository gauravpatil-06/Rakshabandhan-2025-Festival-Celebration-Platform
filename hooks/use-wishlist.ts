"use client"

import { useState, useEffect } from "react"

export interface WishlistItem {
  id: string
  title: string
  price: number
  image: string
  description: string
  category: string
  rating: number
  originalPrice?: number
}

export function useWishlist() {
  const [wishlist, setWishlist] = useState<WishlistItem[]>([])

  useEffect(() => {
    const saved = localStorage.getItem("rakshabandhan-wishlist")
    if (saved) {
      setWishlist(JSON.parse(saved))
    }
  }, [])

  const saveToStorage = (items: WishlistItem[]) => {
    localStorage.setItem("rakshabandhan-wishlist", JSON.stringify(items))
    setWishlist(items)
  }

  const addToWishlist = (item: WishlistItem) => {
    const exists = wishlist.find((w) => w.id === item.id)
    if (!exists) {
      const newWishlist = [...wishlist, item]
      saveToStorage(newWishlist)
    }
  }

  const removeFromWishlist = (id: string) => {
    const newWishlist = wishlist.filter((item) => item.id !== id)
    saveToStorage(newWishlist)
  }

  const isInWishlist = (id: string) => {
    return wishlist.some((item) => item.id === id)
  }

  const toggleWishlist = (item: WishlistItem) => {
    if (isInWishlist(item.id)) {
      removeFromWishlist(item.id)
    } else {
      addToWishlist(item)
    }
  }

  return {
    wishlist,
    addToWishlist,
    removeFromWishlist,
    isInWishlist,
    toggleWishlist,
  }
}

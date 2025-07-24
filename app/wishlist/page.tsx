"use client"

import { useMemo } from "react"
import Link from "next/link"
import { HeartCrack } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { useApp } from "@/lib/store"
import ProductCard from "@/components/product-card"

export default function WishlistPage() {
  const { state } = useApp()

  const wishlistItems = useMemo(() => {
    return state.wishlist.map((item) => {
      // Find the full product details from the mock database if needed,
      // though for wishlist display, the stored item might be enough.
      // For now, we'll just use the item directly from the wishlist state.
      return item
    })
  }, [state.wishlist])

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold mb-8 text-gray-900 dark:text-white">Your Favorites</h1>

        {state.isAuthenticated ? (
          wishlistItems.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
              {wishlistItems.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          ) : (
            <Card className="w-full max-w-2xl mx-auto p-8 text-center bg-white dark:bg-gray-800 shadow-lg rounded-lg">
              <CardContent className="flex flex-col items-center justify-center">
                <HeartCrack className="h-16 w-16 text-gray-400 mb-6" />
                <h2 className="text-2xl font-bold mb-3 text-gray-900 dark:text-white">Your Wishlist is Empty</h2>
                <p className="text-gray-600 dark:text-gray-400 mb-6">
                  Looks like you haven't added any items to your favorites yet. Start browsing to find great deals!
                </p>
                <Link href="/" scroll={false}>
                  <Button className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700">
                    Browse Listings
                  </Button>
                </Link>
              </CardContent>
            </Card>
          )
        ) : (
          <Card className="w-full max-w-md mx-auto p-8 text-center bg-white dark:bg-gray-800 shadow-lg rounded-lg">
            <CardContent className="flex flex-col items-center justify-center">
              <HeartCrack className="h-16 w-16 text-gray-400 mb-6" />
              <h2 className="text-2xl font-bold mb-3 text-gray-900 dark:text-white">Sign in to view your favorites</h2>
              <p className="text-gray-600 dark:text-gray-400 mb-6">
                Please sign in or create an account to save items to your wishlist.
              </p>
              <div className="space-y-3 w-full">
                <Link href="/auth/login">
                  <Button className="w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700">
                    Sign In
                  </Button>
                </Link>
                <Link href="/auth/register">
                  <Button variant="outline" className="w-full bg-transparent">
                    Create Account
                  </Button>
                </Link>
              </div>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  )
}

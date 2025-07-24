"use client"

import { useState, useMemo } from "react"
import Link from "next/link"
import { Search, Heart, ArrowRight } from "lucide-react"
import { Input } from "@/components/ui/input"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { categories } from "@/lib/products" // Assuming categories are exported from products.ts

export default function AllCategoriesPage() {
  const [searchTerm, setSearchTerm] = useState("")

  const featuredCategories = useMemo(() => {
    return categories.filter((cat) => cat.slug === "donate-giveaway" || cat.slug === "moving-out")
  }, [])

  const otherCategories = useMemo(() => {
    const lowerCaseSearchTerm = searchTerm.toLowerCase()
    const filtered = categories.filter(
      (cat) =>
        !(cat.slug === "donate-giveaway" || cat.slug === "moving-out") &&
        (cat.name.toLowerCase().includes(lowerCaseSearchTerm) ||
          cat.description.toLowerCase().includes(lowerCaseSearchTerm)),
    )

    // Prioritize results: exact name match > name starts with > description match
    return filtered.sort((a, b) => {
      const aNameMatch = a.name.toLowerCase() === lowerCaseSearchTerm
      const bNameMatch = b.name.toLowerCase() === lowerCaseSearchTerm
      if (aNameMatch && !bNameMatch) return -1
      if (!aNameMatch && bNameMatch) return 1

      const aNameStartsWith = a.name.toLowerCase().startsWith(lowerCaseSearchTerm)
      const bNameStartsWith = b.name.toLowerCase().startsWith(lowerCaseSearchTerm)
      if (aNameStartsWith && !bNameStartsWith) return -1
      if (!aNameStartsWith && bNameStartsWith) return 1

      return 0 // Maintain original order for other cases
    })
  }, [searchTerm])

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <div className="container mx-auto px-4 py-8">
        {/* Header Section */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">Browse All Categories</h1>
          <p className="text-lg text-gray-600 dark:text-gray-400 max-w-2xl mx-auto mb-8">
            Discover amazing deals and unique items across all our categories. From electronics to home goods, find
            exactly what you're looking for.
          </p>
          <div className="relative max-w-md mx-auto">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
            <Input
              type="text"
              placeholder="Search categories..."
              className="w-full pl-10 pr-4 py-2 rounded-full border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800 text-gray-900 dark:text-white placeholder:text-gray-500 dark:placeholder:text-gray-400 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
        </div>

        {/* Featured Categories Section */}
        <div className="mb-12">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6 flex items-center">
            <Heart className="h-6 w-6 text-red-500 mr-2" />
            Featured Categories
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {featuredCategories.map((category) => {
              const Icon = category.icon
              return (
                <Link key={category.slug} href={category.href} scroll={false}>
                  <Card
                    className={`relative p-6 rounded-lg shadow-lg overflow-hidden transition-all duration-300 hover:scale-[1.02] cursor-pointer h-48 flex flex-col justify-between bg-gradient-to-br ${category.color} text-white`}
                  >
                    <div className="absolute top-4 right-4 bg-white/20 text-white text-sm px-3 py-1 rounded-full">
                      {category.count}
                    </div>
                    <div className="flex items-center mb-3">
                      <div className="bg-white/30 p-3 rounded-full mr-4">
                        <Icon className="h-8 w-8 text-white" />
                      </div>
                      <h3 className="text-2xl font-bold">{category.name}</h3>
                    </div>
                    <p className="text-white/90 mb-4">{category.description}</p>
                    <div className="flex items-center text-white font-semibold">
                      Explore now <ArrowRight className="ml-2 h-4 w-4" />
                    </div>
                  </Card>
                </Link>
              )
            })}
          </div>
        </div>

        {/* All Other Categories Grid */}
        <div>
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">All Other Categories</h2>
          {otherCategories.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {otherCategories.map((category) => {
                const Icon = category.icon
                return (
                  <Link key={category.slug} href={category.href} scroll={false}>
                    <Card className="p-6 rounded-lg shadow-md transition-all duration-300 hover:shadow-lg hover:scale-[1.02] cursor-pointer bg-white dark:bg-gray-800">
                      <CardContent className="p-0">
                        <div
                          className={`w-16 h-16 rounded-full flex items-center justify-center mb-4 mx-auto bg-gradient-to-br ${category.color}`}
                        >
                          <Icon className="h-8 w-8 text-white" />
                        </div>
                        <h3 className="text-xl font-semibold text-center text-gray-900 dark:text-white mb-2">
                          {category.name}
                        </h3>
                        <p className="text-sm text-gray-600 dark:text-gray-400 text-center mb-3">
                          {category.description}
                        </p>
                        <div className="flex items-center justify-center text-sm text-gray-500 dark:text-gray-400">
                          {category.count}
                          <ArrowRight className="ml-2 h-4 w-4 text-gray-400" />
                        </div>
                      </CardContent>
                    </Card>
                  </Link>
                )
              })}
            </div>
          ) : (
            <div className="text-center py-12 text-gray-600 dark:text-gray-400">
              <p className="text-lg">No categories found matching your search.</p>
            </div>
          )}
        </div>

        {/* Call to Action Section */}
        <div className="mt-12 p-8 rounded-lg text-center bg-gradient-to-r from-blue-600 to-purple-600 text-white shadow-xl">
          <h2 className="text-3xl font-bold mb-4">Can't find what you're looking for?</h2>
          <p className="text-lg mb-8 max-w-2xl mx-auto">
            Post a request in our community or browse our latest listings. New items are added every day by our amazing
            community members.
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <Link href="/sell" scroll={false}>
              <Button className="bg-white text-blue-600 hover:bg-gray-100 px-8 py-3 text-lg font-semibold rounded-full shadow-md">
                Post a Listing
              </Button>
            </Link>
            <Link href="/" scroll={false}>
              <Button className="bg-transparent border-2 border-white text-white hover:bg-white/20 px-8 py-3 text-lg font-semibold rounded-full shadow-md">
                Browse Latest Items
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}

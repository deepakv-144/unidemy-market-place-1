"use client"

import { useCallback } from "react"
import { useRouter } from "next/navigation"
import { ArrowRight } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { categories } from "@/lib/products" // Import categories from lib/products

export default function FeaturedCategories() {
  const router = useRouter()

  const handleCategoryClick = useCallback(
    (href: string) => {
      // Preserve scroll position
      const currentScroll = window.pageYOffset || document.documentElement.scrollTop

      router.push(href)

      // Restore scroll position
      setTimeout(() => {
        window.scrollTo({ top: currentScroll, behavior: "auto" })
      }, 0)
    },
    [router],
  )

  const handleViewAllClick = useCallback(() => {
    // Preserve scroll position
    const currentScroll = window.pageYOffset || document.documentElement.scrollTop

    router.push("/categories", { scroll: false }) // Ensure scroll: false is passed

    // Restore scroll position
    setTimeout(() => {
      window.scrollTo({ top: currentScroll, behavior: "auto" })
    }, 0)
  }, [router])

  // Filter categories to only show the first 8 for the featured section
  const featuredCategories = categories.slice(0, 8)

  return (
    <section className="py-16 lg:py-24 bg-white dark:bg-gray-900">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold mb-4 text-gray-900 dark:text-white">Browse by Category</h2>
          <p className="text-lg text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
            Find exactly what you're looking for in our organized categories
          </p>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6 mb-12">
          {featuredCategories.map((category, index) => {
            const IconComponent = category.icon
            return (
              <Card
                key={index}
                className="group hover:shadow-xl transition-all duration-300 hover:-translate-y-2 cursor-pointer border-2 hover:border-transparent prevent-layout-shift"
                onClick={() => handleCategoryClick(category.href)}
              >
                <CardContent className="p-6 text-center">
                  <div
                    className={`w-16 h-16 mx-auto mb-4 rounded-2xl bg-gradient-to-r ${category.color} flex items-center justify-center group-hover:scale-110 transition-transform duration-300`}
                  >
                    <IconComponent className="h-8 w-8 text-white" />
                  </div>
                  <h3 className="font-semibold text-lg mb-2 text-gray-900 dark:text-white group-hover:text-blue-600 transition-colors">
                    {category.name}
                  </h3>
                  <p className="text-sm text-gray-500 dark:text-gray-400">{category.count}</p>
                </CardContent>
              </Card>
            )
          })}
        </div>

        <div className="text-center">
          <Button
            variant="outline"
            size="lg"
            className="group bg-transparent focus-no-scroll"
            onClick={handleViewAllClick}
          >
            <span className="flex items-center">
              View All Categories
              <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
            </span>
          </Button>
        </div>
      </div>
    </section>
  )
}

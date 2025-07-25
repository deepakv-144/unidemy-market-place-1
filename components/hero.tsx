"use client"

import type React from "react"

import { useState, useCallback } from "react"
import { useRouter } from "next/navigation"
import { Search, MapPin, Sparkles } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

export default function Hero() {
  const [searchQuery, setSearchQuery] = useState("")
  const [location, setLocation] = useState("")
  const router = useRouter()

  const handleSearch = useCallback(
    (e: React.FormEvent) => {
      e.preventDefault()

      // Preserve scroll position
      const currentScroll = window.pageYOffset || document.documentElement.scrollTop

      if (searchQuery.trim()) {
        const params = new URLSearchParams()
        params.set("q", searchQuery.trim())
        if (location) {
          params.set("location", location)
        }
        router.push(`/search?${params.toString()}`)
      }

      // Restore scroll position
      setTimeout(() => {
        window.scrollTo({ top: currentScroll, behavior: "auto" })
      }, 0)
    },
    [searchQuery, location, router],
  )

  const handleCategoryClick = useCallback(
    (term: string) => {
      // Preserve scroll position
      const currentScroll = window.pageYOffset || document.documentElement.scrollTop

      const params = new URLSearchParams()
      params.set("q", term.toLowerCase())
      router.push(`/search?${params.toString()}`)

      // Restore scroll position
      setTimeout(() => {
        window.scrollTo({ top: currentScroll, behavior: "auto" })
      }, 0)
    },
    [router],
  )

  return (
    <section className="relative overflow-hidden bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 dark:from-gray-900 dark:via-blue-900/20 dark:to-purple-900/20">
      {/* Background Elements */}
      <div className="absolute inset-0">
        <div className="absolute top-10 left-10 w-72 h-72 bg-blue-300/20 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-10 right-10 w-96 h-96 bg-purple-300/20 rounded-full blur-3xl animate-pulse delay-1000"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-indigo-300/20 rounded-full blur-3xl animate-pulse delay-500"></div>
      </div>

      <div className="relative container mx-auto px-4 py-20 lg:py-32">
        <div className="text-center max-w-4xl mx-auto">
          {/* Badge */}
          <div className="inline-flex items-center px-4 py-2 rounded-full bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm border border-white/20 mb-8">
            <Sparkles className="h-4 w-4 text-yellow-500 mr-2" />
            <span className="text-sm font-medium">Trusted by 10M+ users worldwide</span>
          </div>

          {/* Main Heading */}
          <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold mb-6 leading-tight">
            <span className="bg-gradient-to-r from-blue-600 via-purple-600 to-indigo-600 bg-clip-text text-transparent">
              Discover Amazing
            </span>
            <br />
            <span className="text-gray-900 dark:text-white">Deals Near You</span>
          </h1>

          {/* Subtitle */}
          <p className="text-xl md:text-2xl text-gray-600 dark:text-gray-300 mb-12 max-w-3xl mx-auto leading-relaxed">
            Join millions of people buying and selling in their local communities. Find everything from electronics to
            furniture, all in one place.
          </p>

          {/* Search Section */}
          <form
            onSubmit={handleSearch}
            className="bg-white/90 dark:bg-gray-800/90 backdrop-blur-sm rounded-2xl p-6 md:p-8 shadow-2xl border border-white/20 max-w-4xl mx-auto"
          >
            <div className="grid grid-cols-1 md:grid-cols-12 gap-4">
              {/* Search Input */}
              <div className="md:col-span-6 relative">
                <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
                <Input
                  type="text"
                  placeholder="What are you looking for?"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-12 h-14 text-lg rounded-xl border-2 focus:border-blue-500 transition-colors focus-no-scroll"
                />
              </div>

              {/* Location Select */}
              <div className="md:col-span-4 relative">
                <MapPin className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5 z-10" />
                <Select value={location} onValueChange={setLocation}>
                  <SelectTrigger className="pl-12 h-14 text-lg rounded-xl border-2 focus-no-scroll">
                    <SelectValue placeholder="Select location" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="new-york">New York, NY</SelectItem>
                    <SelectItem value="los-angeles">Los Angeles, CA</SelectItem>
                    <SelectItem value="chicago">Chicago, IL</SelectItem>
                    <SelectItem value="houston">Houston, TX</SelectItem>
                    <SelectItem value="phoenix">Phoenix, AZ</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              {/* Search Button */}
              <div className="md:col-span-2">
                <Button
                  type="submit"
                  className="w-full h-14 text-lg rounded-xl bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 shadow-lg hover:shadow-xl transition-all duration-300 focus-no-scroll"
                >
                  Search
                </Button>
              </div>
            </div>

            {/* Popular Searches */}
            <div className="mt-6 flex flex-wrap gap-2 justify-center">
              <span className="text-sm text-gray-600 dark:text-gray-400 mr-2">Popular:</span>
              {["iPhone", "Furniture", "Cars", "Laptops", "Bikes"].map((term) => (
                <Button
                  key={term}
                  type="button"
                  variant="outline"
                  size="sm"
                  onClick={() => handleCategoryClick(term)}
                  className="rounded-full hover:bg-blue-50 hover:border-blue-300 transition-colors bg-transparent focus-no-scroll"
                >
                  {term}
                </Button>
              ))}
            </div>
          </form>

          {/* Stats */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mt-16 max-w-3xl mx-auto">
            {[
              { number: "10M+", label: "Active Users" },
              { number: "50M+", label: "Items Listed" },
              { number: "200+", label: "Cities" },
              { number: "99%", label: "Satisfaction" },
            ].map((stat, index) => (
              <div key={index} className="text-center">
                <div className="text-2xl md:text-3xl font-bold text-gray-900 dark:text-white mb-2">{stat.number}</div>
                <div className="text-sm text-gray-600 dark:text-gray-400">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}

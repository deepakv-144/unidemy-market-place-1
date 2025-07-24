import Hero from "@/components/hero"
import FeaturedCategories from "@/components/featured-categories"
import FeaturedListings from "@/components/featured-listings"
import RecentlyDonatedSection from "@/components/recently-donated-section"
import MovingOutDealsSection from "@/components/moving-out-deals-section"
import TrustSection from "@/components/trust-section"
import ScrollManager from "@/components/scroll-manager"

export default function HomePage() {
  return (
    <>
      <ScrollManager />
      <Hero />
      <FeaturedCategories />
      <FeaturedListings />
      <RecentlyDonatedSection />
      <MovingOutDealsSection />
      <TrustSection />
    </>
  )
}

import LoadingSpinner from "@/components/loading"

export default function CategoriesLoading() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 dark:bg-gray-900">
      <LoadingSpinner />
    </div>
  )
}

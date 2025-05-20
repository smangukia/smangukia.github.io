export default function LoadingSpinner() {
  return (
    <div className="flex items-center justify-center h-screen">
      <div className="w-12 h-12 border-4 border-t-primary-500 border-r-transparent border-b-primary-300 border-l-transparent rounded-full animate-spin"></div>
    </div>
  )
}

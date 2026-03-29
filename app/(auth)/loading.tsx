export default function AuthLoading() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <div className="animate-pulse space-y-4 w-full max-w-md px-6">
        <div className="h-10 bg-gray-200 rounded-lg w-48 mx-auto" />
        <div className="h-64 bg-gray-200 rounded-xl" />
      </div>
    </div>
  )
}

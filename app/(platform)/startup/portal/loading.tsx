export default function StartupPortalLoading() {
  return (
    <div className="space-y-6 animate-pulse">
      <div className="h-8 bg-gray-200 rounded-lg w-36" />
      <div className="h-32 bg-gray-200 rounded-xl" />
      <div className="grid grid-cols-2 gap-4">
        <div className="h-28 bg-gray-200 rounded-xl" />
        <div className="h-28 bg-gray-200 rounded-xl" />
      </div>
    </div>
  )
}

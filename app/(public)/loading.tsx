export default function PublicLoading() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-stone">
      <div className="flex flex-col items-center gap-4">
        <div className="w-10 h-10 rounded-full border-4 border-teal-wash border-t-teal animate-spin" />
        <p className="text-sm text-slate-muted tracking-wide">載入中…</p>
      </div>
    </div>
  )
}

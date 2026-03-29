export default function StartupEventsPage() {
  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold">活動報名</h1>
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-8 text-center">
        <div className="text-4xl mb-3">🎪</div>
        <h2 className="text-lg font-semibold mb-2">活動系統即將啟用</h2>
        <p className="text-gray-500 text-sm max-w-md mx-auto mb-5">
          創創中心舉辦的工作坊、講座、Demo Day 等活動將在此顯示。
          <br />您可以直接報名、查看行事曆並管理報名紀錄。
        </p>
        <a
          href="https://tec.ntu.edu.tw"
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-1.5 px-4 py-2 bg-blue-600 text-white rounded-lg text-sm font-medium hover:bg-blue-700 transition-colors"
        >
          前往官網查看活動
          <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
          </svg>
        </a>
      </div>
    </div>
  )
}

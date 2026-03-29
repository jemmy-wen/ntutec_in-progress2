'use client'

export default function MentorFeedbackPage() {
  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold">回饋填寫</h1>
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-8 text-center">
        <div className="text-4xl mb-3">📝</div>
        <h2 className="text-lg font-semibold mb-2">尚無待填寫的回饋</h2>
        <p className="text-gray-500 text-sm">
          健診結束後，系統會在此顯示待填寫的回饋表單。
          <br />您的回饋將協助我們持續優化配對品質與健診體驗。
        </p>
      </div>
    </div>
  )
}

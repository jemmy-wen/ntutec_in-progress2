'use client'

export default function MentorHistoryPage() {
  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold">歷史紀錄</h1>
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-8 text-center">
        <div className="text-4xl mb-3">📋</div>
        <h2 className="text-lg font-semibold mb-2">尚無歷史紀錄</h2>
        <p className="text-gray-500 text-sm">
          完成健診後，過往的配對結果、健診紀錄與回饋摘要將在此顯示。
        </p>
      </div>
    </div>
  )
}

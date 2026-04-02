export const metadata = {
  title: '活動 | 台大創創中心',
  description: '台大創創中心最新活動：投資例會、創業工作坊、Demo Day、產業論壇等。',
}

export default function EventsPublicPage() {
  return (
    <div>
      {/* Hero */}
      <section className="bg-gradient-to-b from-teal-50 to-white py-20">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <h1 className="text-4xl font-bold mb-4">活動</h1>
          <p className="text-lg text-gray-600">
            投資例會、創業工作坊、Demo Day、產業論壇 — 精彩活動不錯過。
          </p>
        </div>
      </section>

      {/* Events placeholder */}
      <section className="max-w-5xl mx-auto px-4 py-16">
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-12 text-center">
          <div className="text-5xl mb-4">🎪</div>
          <h2 className="text-xl font-bold mb-2">活動頁面即將上線</h2>
          <p className="text-gray-500 max-w-md mx-auto mb-6">
            活動資訊將從 LUMA 與 Google Calendar 整合而來。
            上線後您可在此查看所有公開活動並直接報名。
          </p>
          <a
            href="https://lu.ma/ntutec"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-block px-5 py-2.5 bg-blue-600 text-white rounded-lg text-sm font-medium hover:bg-blue-700 transition-colors"
          >
            前往 LUMA 查看活動 →
          </a>
        </div>

        {/* Event types */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mt-8">
          {[
            { name: '投資例會', freq: '每月', icon: '💰' },
            { name: '業師健診', freq: '每月', icon: '🩺' },
            { name: 'Demo Day', freq: '每季', icon: '🎤' },
            { name: '創業工作坊', freq: '不定期', icon: '🎓' },
          ].map(ev => (
            <div key={ev.name} className="bg-gray-50 rounded-xl p-5 text-center">
              <div className="text-3xl mb-2">{ev.icon}</div>
              <div className="font-semibold text-sm">{ev.name}</div>
              <div className="text-xs text-gray-500">{ev.freq}</div>
            </div>
          ))}
        </div>
      </section>
    </div>
  )
}

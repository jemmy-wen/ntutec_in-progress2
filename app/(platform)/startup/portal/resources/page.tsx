export default function StartupResourcesPage() {
  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold">資源中心</h1>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <ResourceCard
          icon="📄"
          title="文件範本"
          description="BP、財務預測、投資條件書等範本下載"
          items={['商業計畫書範本', '財務三表範本', 'Term Sheet 範例', 'Pitch Deck 模板']}
        />
        <ResourceCard
          icon="🎓"
          title="創業課程"
          description="線上學習資源與過往講座回放"
          items={['募資策略工作坊', '產品市場適配', '法律與股權結構', '行銷與品牌']}
        />
        <ResourceCard
          icon="🤝"
          title="合作夥伴"
          description="創創中心生態系合作資源"
          items={['法律諮詢', '會計服務', '雲端額度', '共同工作空間']}
        />
        <ResourceCard
          icon="📊"
          title="產業報告"
          description="產業趨勢分析與市場資訊"
          items={['台灣創業生態報告', '各產業趨勢分析', '投資人偏好分析']}
        />
      </div>

      <div className="bg-yellow-50 border border-yellow-200 rounded-xl p-4 text-sm text-yellow-700">
        資源中心內容將由 Ghost CMS 管理，完整功能於 CMS 整合後上線。
      </div>
    </div>
  )
}

function ResourceCard({ icon, title, description, items }: {
  icon: string; title: string; description: string; items: string[]
}) {
  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
      <div className="text-3xl mb-3">{icon}</div>
      <h2 className="text-lg font-semibold mb-1">{title}</h2>
      <p className="text-sm text-gray-500 mb-4">{description}</p>
      <ul className="space-y-2">
        {items.map(item => (
          <li key={item} className="flex items-center gap-2 text-sm text-gray-600">
            <span className="w-1.5 h-1.5 bg-gray-300 rounded-full" />
            {item}
          </li>
        ))}
      </ul>
    </div>
  )
}

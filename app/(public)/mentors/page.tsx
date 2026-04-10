import type { Metadata } from 'next'
import PageHero from '@/components/public/PageHero'

export const metadata: Metadata = {
  title: '業師陣容 | NTUTEC',
  description: '臺大創創中心擁有超過百位來自各產業的資深業師，提供新創團隊一對一深度輔導與策略建議。',
}

const mentors = [
  { initials: '趙', name: '趙OO', expertise: 'SaaS', company: 'XX 科技' },
  { initials: '孫', name: '孫OO', expertise: 'FinTech', company: 'OO 金控' },
  { initials: '周', name: '周OO', expertise: 'AI/ML', company: 'OO 智能' },
  { initials: '吳', name: '吳OO', expertise: 'BioTech', company: 'OO 生技' },
  { initials: '鄭', name: '鄭OO', expertise: 'Hardware', company: 'OO 電子' },
  { initials: '許', name: '許OO', expertise: 'Marketing', company: 'OO 顧問' },
  { initials: '蔡', name: '蔡OO', expertise: 'Legal', company: 'OO 法律事務所' },
  { initials: '劉', name: '劉OO', expertise: 'Supply Chain', company: 'OO 集團' },
]

export default function MentorsPage() {
  return (
    <>
      <PageHero title="業師陣容" subtitle="Mentors" description="超過百位來自各產業的資深業師，為新創團隊提供一對一深度輔導。" />

      <section className="section-spacing">
        <div className="container">
          <p className="mx-auto mb-12 max-w-2xl text-center text-lg leading-relaxed text-slate-muted">
            臺大創創中心的業師網絡涵蓋科技、金融、法律、行銷等多元領域。每位業師皆具備豐富的產業實戰經驗，透過定期的一對一輔導，協助新創團隊解決從技術到商業的各種挑戰。
          </p>
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {mentors.map((mentor) => (
              <div key={mentor.name} className="rounded-xl border bg-white p-5 text-center card-hover">
                <div className="mx-auto mb-3 flex h-16 w-16 items-center justify-center rounded-full bg-teal-wash">
                  <span className="text-lg font-bold text-teal">{mentor.initials}</span>
                </div>
                <h4 className="text-lg">{mentor.name}</h4>
                <p className="mt-1 text-sm text-slate-muted">{mentor.company}</p>
                <span className="mt-2 inline-block rounded-full bg-teal-light px-3 py-0.5 text-xs font-semibold text-teal-deep">{mentor.expertise}</span>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  )
}

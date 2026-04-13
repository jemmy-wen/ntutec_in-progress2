import Image from 'next/image'

const ecosystemPartners = [
  {
    name: '國立臺灣大學',
    url: 'https://www.ntu.edu.tw',
    description: '校本部',
  },
  {
    name: '台大研究發展處',
    url: 'https://rdoff.ntu.edu.tw',
    description: '研發與技轉',
  },
  {
    name: '台大產學合作總中心',
    url: 'https://www.cciac.ntu.edu.tw',
    description: '產學媒合',
  },
  {
    name: '台大創新設計學院',
    url: 'https://dschool.ntu.edu.tw',
    description: '設計思考',
  },
  {
    name: '台大國際產學聯盟',
    url: 'https://ntuilo.ntu.edu.tw',
    description: 'NTU ILO',
  },
  {
    name: '台大校友中心',
    url: 'https://www.alumni.ntu.edu.tw',
    description: '校友網絡',
  },
]

export default function NtuEcosystemLinks() {
  return (
    <section className="section-spacing bg-warm-stone">
      <div className="container">
        <div className="mb-8 text-center">
          <p className="micro-label mb-2">NTU Ecosystem</p>
          <h2 className="text-2xl font-bold text-charcoal">台大創新生態系</h2>
          <p className="mt-3 text-slate-muted">
            創創中心是台大創新生態系的核心節點，與校內各單位緊密協作
          </p>
        </div>
        <div className="mx-auto grid max-w-4xl grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-6">
          {ecosystemPartners.map((p) => (
            <a
              key={p.name}
              href={p.url}
              target="_blank"
              rel="noopener noreferrer"
              className="card-elevated flex flex-col items-center rounded-xl border border-stone-warm/50 bg-white p-4 text-center transition-colors hover:border-teal"
            >
              <div className="mb-2 flex h-10 w-10 items-center justify-center rounded-full bg-teal/10">
                <Image
                  src="/images/photos/ntu-emblem.jpg"
                  alt="NTU"
                  width={24}
                  height={24}
                  className="rounded-full"
                />
              </div>
              <span className="text-xs font-semibold text-charcoal leading-tight">{p.name}</span>
              <span className="mt-1 text-[10px] text-slate-muted">{p.description}</span>
            </a>
          ))}
        </div>
      </div>
    </section>
  )
}

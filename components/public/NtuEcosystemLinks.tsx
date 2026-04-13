import Image from 'next/image'

const ecosystemPartners = [
  {
    name: '國立臺灣大學',
    subtitle: '校本部',
    url: 'https://www.ntu.edu.tw',
  },
  {
    name: '研究發展處',
    subtitle: '研發與技轉',
    url: 'https://rdoff.ntu.edu.tw',
  },
  {
    name: '創新設計學院',
    subtitle: 'D-School',
    url: 'https://dschool.ntu.edu.tw',
  },
  {
    name: '國際產學聯盟',
    subtitle: 'NTU ILO',
    url: 'https://ntuilo.ntu.edu.tw',
  },
  {
    name: '創新育成中心',
    subtitle: '育成加速',
    url: 'https://ntubic.ntu.edu.tw',
  },
  {
    name: '台大校友創投',
    subtitle: 'NTU AVC',
    url: 'https://www.ntuavc.com',
  },
]

export default function NtuEcosystemLinks() {
  return (
    <section className="section-spacing bg-warm-stone">
      <div className="container">
        <div className="mb-10 text-center">
          <p className="micro-label mb-2">NTU Ecosystem</p>
          <h2 className="text-2xl font-bold text-charcoal">台大創新生態系</h2>
          <p className="mt-3 max-w-xl mx-auto text-slate-muted">
            NTUTEC 與台大各創新單位緊密協作，共同構建校園創業生態系
          </p>
        </div>
        <div className="mx-auto grid max-w-3xl grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-6">
          {ecosystemPartners.map((p) => (
            <a
              key={p.name}
              href={p.url}
              target="_blank"
              rel="noopener noreferrer"
              className="card-elevated flex flex-col items-center rounded-xl border border-stone-warm/50 bg-white px-3 py-5 text-center transition-colors hover:border-teal"
            >
              <div className="mb-3 flex h-10 w-10 items-center justify-center rounded-full bg-teal/10">
                <Image
                  src="/images/photos/ntu-emblem.jpg"
                  alt="NTU"
                  width={24}
                  height={24}
                  className="rounded-full"
                />
              </div>
              <span className="text-xs font-semibold text-charcoal leading-tight">{p.name}</span>
              <span className="mt-1 text-[10px] text-slate-muted/70">{p.subtitle}</span>
            </a>
          ))}
        </div>
      </div>
    </section>
  )
}

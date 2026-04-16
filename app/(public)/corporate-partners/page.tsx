import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { redirect } from "next/navigation";
import PageHero from "@/components/public/PageHero";

export const metadata: Metadata = {
  title: "合作夥伴 | NTUTEC",
  description:
    "台大創創中心歷年合作的代表企業，透過企業垂直加速器、外部創新顧問、聯合競賽等多元模式共創創新生態系。",
  robots: { index: false, follow: false }, // 暫時隱藏 — 待逐家確認 logo 揭露意願
};

interface Partner {
  name: string;
  nameEn?: string;
  logo: string;
  w: number;
  h: number;
  type: string;                  // 合作類型
  caseNote: string;              // 一句話合作描述
}

// 盤點原則：只列有真實 logo + 有可驗證合作描述的夥伴
// 資料來源：memory/knowledge/institutional/corporate_partnerships_cases.md
const partners: Partner[] = [
  // 長期外部創新顧問 + 垂直加速器
  {
    name: "聯合報系",
    nameEn: "UDN",
    logo: "/images/partners/udn.svg",
    w: 120,
    h: 40,
    type: "外部創新顧問",
    caseNote: "資深媒體集團第二成長曲線合作（《天下雜誌》專文報導）",
  },
  {
    name: "聯經出版",
    nameEn: "Linking",
    logo: "/images/partners/linking-books.png",
    w: 120,
    h: 36,
    type: "外部創新顧問",
    caseNote: "× 知識衛星 SAT. 六個月深度共創，延伸藝文線上課程市場",
  },
  {
    name: "經濟日報",
    nameEn: "EDN",
    logo: "/images/partners/economic-daily.png",
    w: 100,
    h: 25,
    type: "外部創新顧問",
    caseNote: "長期企業外部創新顧問夥伴（UDN 集團）",
  },
  {
    name: "時報出版",
    nameEn: "Reading Times",
    logo: "/images/partners/reading-times.png",
    w: 100,
    h: 32,
    type: "外部創新顧問",
    caseNote: "出版轉型外部創新顧問 + 垂直加速器夥伴",
  },
  {
    name: "圓展科技",
    nameEn: "AVer",
    logo: "/images/partners/aver.svg",
    w: 100,
    h: 40,
    type: "外部創新顧問",
    caseNote: "影音科技企業的外部創新合作夥伴",
  },

  // 企業垂直加速器合作企業
  {
    name: "友達光電",
    nameEn: "AUO",
    logo: "/images/partners/auo.svg",
    w: 100,
    h: 40,
    type: "企業垂直加速器",
    caseNote: "面板龍頭跨域合作，驗證顯示技術應用場域",
  },
  {
    name: "遠傳電信",
    nameEn: "FET",
    logo: "/images/partners/fetnet.png",
    w: 100,
    h: 32,
    type: "企業垂直加速器",
    caseNote: "電信龍頭企業共創，結合 5G 與新創解決方案",
  },
  {
    name: "玉山銀行",
    nameEn: "E.SUN Bank",
    logo: "/images/partners/esun-bank.svg",
    w: 110,
    h: 36,
    type: "企業垂直加速器",
    caseNote: "金融創新合作夥伴，探索 FinTech 與數位轉型",
  },
  {
    name: "天下雜誌",
    nameEn: "CommonWealth",
    logo: "/images/partners/commonwealth.svg",
    w: 120,
    h: 36,
    type: "企業垂直加速器",
    caseNote: "媒體垂直加速器合作，強化生態系曝光",
  },
  {
    name: "三泰科技",
    nameEn: "Sunix",
    logo: "/images/partners/sunix.png",
    w: 120,
    h: 33,
    type: "企業垂直加速器",
    caseNote: "科技業垂直加速器合作夥伴",
  },
  {
    name: "東方線上",
    nameEn: "Eastern Online",
    logo: "/images/partners/eastern-online.png",
    w: 120,
    h: 28,
    type: "企業垂直加速器",
    caseNote: "市場研究數據賦能新創團隊的市場驗證",
  },
  {
    name: "農純鄉",
    nameEn: "Nongchunxiang",
    logo: "/images/partners/nongchunxiang.png",
    w: 100,
    h: 40,
    type: "企業垂直加速器",
    caseNote: "食品與農業領域的企業垂直加速合作",
  },
  {
    name: "AmazingTalker",
    logo: "/images/partners/amazingtalker.png",
    w: 130,
    h: 18,
    type: "校友 × 合作夥伴",
    caseNote: "歷屆台大創創校友，後期成為加速器合作企業",
  },

  // 加速器贊助夥伴
  {
    name: "宏碁 Acer 基金會",
    nameEn: "Acer Foundation",
    logo: "/images/partners/acer.svg",
    w: 90,
    h: 30,
    type: "加速器贊助",
    caseNote: "官方贊助夥伴，曾以企業業師身份共創律果科技案例（HBR 報導）",
  },
  {
    name: "康寧",
    nameEn: "Corning",
    logo: "/images/partners/corning.svg",
    w: 110,
    h: 32,
    type: "加速器贊助",
    caseNote: "國際材料科技大廠，加速器官方贊助夥伴",
  },
];

const TYPE_COLOR: Record<string, string> = {
  外部創新顧問: "bg-teal/10 text-teal-deep border-teal/30",
  企業垂直加速器: "bg-amber-50 text-amber-800 border-amber-200",
  加速器贊助: "bg-purple-50 text-purple-700 border-purple-200",
  "校友 × 合作夥伴": "bg-stone text-charcoal border-stone-warm",
};

export default function CorporatePartnersPage() {
  // 暫時隱藏整頁 — 待逐家確認 logo 揭露意願後再恢復
  redirect('/corporate')

  // eslint-disable-next-line no-unreachable
  return (
    <>
      <PageHero
        title="合作夥伴"
        subtitle="Our Partners"
        description="歷年與台大創創中心深度共創的代表企業，透過外部創新顧問、企業垂直加速器、贊助合作等多元模式，共築臺灣創新生態系。"
      />

      <section className="section-spacing">
        <div className="container">
          <p className="mx-auto mb-12 max-w-3xl text-center text-lg leading-relaxed text-slate-muted">
            以下為歷年與中心有具體合作紀錄的夥伴企業（列舉部分）。合作模式涵蓋企業出題 × 新創解題的垂直加速器、長期外部創新顧問服務、一對一技術合作、聯合競賽及加速器贊助等。
          </p>

          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {partners.map((partner) => (
              <div
                key={partner.name}
                className="card-elevated flex flex-col rounded-2xl border border-stone-warm/60 bg-white p-6"
              >
                <div className="mb-4 flex h-16 items-center justify-center rounded-xl bg-stone/60">
                  <Image
                    src={partner.logo}
                    alt={partner.name}
                    width={partner.w}
                    height={partner.h}
                    className="object-contain max-h-10 w-auto"
                  />
                </div>
                <div className="mb-3 flex items-baseline gap-2">
                  <h3 className="text-base font-semibold text-charcoal">
                    {partner.name}
                  </h3>
                  {partner.nameEn && (
                    <span className="text-xs text-slate-muted">{partner.nameEn}</span>
                  )}
                </div>
                <span
                  className={`mb-3 inline-block w-fit rounded-full border px-2.5 py-0.5 text-xs font-medium ${
                    TYPE_COLOR[partner.type] || "bg-stone text-charcoal"
                  }`}
                >
                  {partner.type}
                </span>
                <p className="text-sm leading-relaxed text-slate-muted">
                  {partner.caseNote}
                </p>
              </div>
            ))}
          </div>

          <p className="mt-12 text-center text-sm text-slate-muted">
            ※ 以上為歷年公開合作代表，中心累計合作企業數更廣，視合作方意願揭露。
          </p>
        </div>
      </section>

      <section className="section-spacing bg-teal-wash text-center">
        <div className="container">
          <h2 className="mb-4">有合作提案？</h2>
          <p className="mx-auto mb-6 max-w-xl text-slate-muted">
            台大創創中心持續歡迎有意與新創生態系共創的企業夥伴加入合作行列。
          </p>
          <Link href="/corporate" className="btn-pill-primary">
            了解企業合作方案
          </Link>
        </div>
      </section>
    </>
  );
}

import type { Metadata } from 'next'
import PageHero from '@/components/public/PageHero'

export const metadata: Metadata = {
  title: '使用條款 | NTUTEC',
  description: '國立臺灣大學創意創業中心網站使用條款：存取本網站即表示您同意本條款之全部內容。',
}

export default function TermsPage() {
  return (
    <>
      <PageHero
        title="使用條款"
        subtitle="Terms of Use"
        description="存取或使用本網站，即表示您同意以下使用條款。"
      />

      <section className="section-spacing">
        <div className="container">
          <div className="mx-auto max-w-3xl prose prose-slate">
            <div className="rounded-lg border border-stone-warm bg-teal-wash p-4 mb-8 not-prose">
              <p className="text-sm text-charcoal leading-relaxed">
                ⚠️ 本條款為 <strong>v0.3 草稿版本</strong>，正式版將於法務審核後發佈。如有疑問請來信
                <a href="mailto:ntutec@ntutec.com" className="text-teal-deep underline underline-offset-4 hover:text-teal ml-1">ntutec@ntutec.com</a>
              </p>
              <p className="text-sm text-slate-muted mt-2">最後更新：2026-04-16</p>
            </div>

            <p className="text-slate-muted leading-relaxed">
              歡迎使用國立臺灣大學創意創業中心（以下簡稱「本中心」）所營運之 NTUTEC 網站（以下簡稱「本網站」）。您於存取或使用本網站前，請詳閱並充分理解以下條款。您一經存取、瀏覽或使用本網站，即視為已閱讀、瞭解並同意受本條款之全部內容拘束。若不同意，請停止使用本網站。
            </p>

            <h2 className="text-xl font-semibold text-charcoal mt-10 mb-4">一、適用範圍（Scope）</h2>
            <p className="text-slate-muted leading-relaxed">
              本條款適用於本網站（含子網域及相關服務）所提供之一切內容、功能與服務，包含但不限於公開資訊瀏覽、投遞表單、活動報名、電子報訂閱、業師媒合、新創團隊帳戶、天使會員專區及管理後台等功能。本條款與本網站另行公告之隱私權政策、各項子服務之補充條款或使用規範，共同構成您與本中心間之完整合意。
            </p>

            <h2 className="text-xl font-semibold text-charcoal mt-10 mb-4">二、使用者帳戶與義務（User Accounts &amp; Obligations）</h2>
            <ul className="text-slate-muted leading-relaxed list-disc pl-6 space-y-2">
              <li>本網站對不同使用者類型（訪客、天使會員、新創團隊、業師、管理員）提供相對應之功能。若功能需註冊帳戶或經審核後開通，您應以真實、正確、完整之資訊進行登記。</li>
              <li>您應妥善保管帳戶密碼及任何存取憑證，不得將帳戶轉讓、出借或與他人共用。帳戶所為之一切行為，推定為您本人之行為，由您自行負責。</li>
              <li>若發現帳戶遭未授權使用或有其他安全疑慮，應立即通知本中心，以便採取必要措施。</li>
              <li>您同意遵守中華民國相關法令（包含但不限於個人資料保護法、著作權法、商標法、刑法等），並不得利用本網站從事任何違反法令或違背公序良俗之行為。</li>
            </ul>

            <h2 className="text-xl font-semibold text-charcoal mt-10 mb-4">三、禁止行為（Prohibited Uses）</h2>
            <p className="text-slate-muted leading-relaxed">您使用本網站時，不得從事下列行為：</p>
            <ul className="text-slate-muted leading-relaxed list-disc pl-6 space-y-2">
              <li>未經授權以爬蟲、機器人、自動化指令或其他技術手段，大規模擷取、複製、下載本網站之內容或資料（<em>scraping</em>）。</li>
              <li>對本網站進行反向工程、反編譯、解譯原始碼或試圖繞過安全機制（<em>reverse engineering</em>）。</li>
              <li>發送垃圾訊息、商業廣告、連鎖信、釣魚郵件或其他未經收件人同意之通訊內容（<em>spam</em>）。</li>
              <li>上傳或散布違法內容，包含侵害他人智慧財產權、妨害名譽、隱私、散布惡意程式、恐嚇、騷擾、歧視、仇恨言論、色情或其他違反法令之資料。</li>
              <li>刻意對本網站進行壓力測試、拒絕服務攻擊，或其他可能影響本網站穩定性與資料完整性之行為。</li>
              <li>以虛偽、冒充他人身份或誤導方式使用本網站服務。</li>
            </ul>

            <h2 className="text-xl font-semibold text-charcoal mt-10 mb-4">四、智慧財產權（IP Rights）</h2>
            <h3 className="text-lg font-semibold text-charcoal mt-6 mb-3">4.1 本網站內容</h3>
            <p className="text-slate-muted leading-relaxed">
              本網站所有內容（包含但不限於文字、圖片、影音、商標、標誌、介面設計、版面、程式碼、資料庫結構）均屬本中心、國立臺灣大學或其授權之第三方權利人所有，並受中華民國著作權法、商標法及相關法令保護。未經書面授權，您不得重製、公開傳輸、改作、散布、發行、出租、轉載或用於任何商業用途。
            </p>
            <h3 className="text-lg font-semibold text-charcoal mt-6 mb-3">4.2 使用者提供內容之授權</h3>
            <p className="text-slate-muted leading-relaxed">
              當您透過本網站上傳、提交或以其他方式提供任何內容（包含投遞表單、履歷、簡報、圖像、文字等，以下合稱「使用者內容」）時，您保證對該內容擁有合法權利或已取得必要授權，且該內容未侵害任何第三人之權利。您於提供使用者內容之同時，即授予本中心一項非專屬、全球性、免權利金、可再授權之權利，於本網站營運、輔導計畫執行、案源媒合、對內評估、統計分析、以及對外必要之活動宣傳範圍內，使用、重製、改作、公開傳輸及展示該使用者內容。
            </p>

            <h2 className="text-xl font-semibold text-charcoal mt-10 mb-4">五、責任限制（Limitation of Liability）</h2>
            <p className="text-slate-muted leading-relaxed">
              於法律允許之最大程度內，本中心及其關係人員、供應商與合作夥伴，對您或任何第三方因使用或無法使用本網站所生之任何直接、間接、附隨、衍生、懲罰性損害（包含但不限於利潤損失、資料遺失、商譽損害、業務中斷）均不負賠償責任，不論該損害係基於契約、侵權行為、嚴格責任或其他法律理論。若法律強制要求本中心負擔責任，本中心之累計責任上限以您於事故發生前十二個月內實際支付予本中心之費用為限（如您未曾支付費用，則以新臺幣一千元為限）。
            </p>

            <h2 className="text-xl font-semibold text-charcoal mt-10 mb-4">六、免責聲明（Disclaimer of Warranties）</h2>
            <p className="text-slate-muted leading-relaxed">
              本網站及其內容以「現狀（<em>as is</em>）」及「現有可供使用（<em>as available</em>）」之基礎提供。本中心不就本網站之完整性、正確性、即時性、不中斷性、無錯誤、無病毒、適合特定目的或不侵害第三人權利，作任何明示或默示之擔保。本網站所載之投資、法律、稅務、財務或技術資訊僅供參考，不構成任何專業建議，您於依賴該等資訊作成決策前，應自行評估並徵詢合格專業人員之意見。
            </p>

            <h2 className="text-xl font-semibold text-charcoal mt-10 mb-4">七、服務中斷（Service Interruption）</h2>
            <p className="text-slate-muted leading-relaxed">
              本中心得隨時為下列原因暫時中斷本網站全部或部分服務，且無須事前通知：
            </p>
            <ul className="text-slate-muted leading-relaxed list-disc pl-6 space-y-2">
              <li>系統維護、升級、遷移、備援或測試。</li>
              <li>軟硬體故障、網路壅塞、電信中斷、第三方服務商異常或資安事件。</li>
              <li>不可抗力事由（天災、戰爭、瘟疫、罷工、政府命令等）。</li>
              <li>為遵循法令要求或司法機關命令。</li>
            </ul>
            <p className="text-slate-muted leading-relaxed mt-3">
              本中心將盡合理努力於排程性維護前公告，並於服務恢復後儘速通知；惟對於服務中斷所生之任何損失，於法律允許之最大程度內，本中心不負賠償責任。
            </p>

            <h2 className="text-xl font-semibold text-charcoal mt-10 mb-4">八、連結至第三方網站（Third-Party Links）</h2>
            <p className="text-slate-muted leading-relaxed">
              本網站可能包含指向第三方網站或服務之連結，僅為提供您之便利。該等第三方網站之內容、隱私實踐與使用條款均由各該第三方自行負責，本中心不就其內容之正確性、安全性或可用性提供任何擔保，亦不就您與該第三方間之任何爭議負責。您於存取第三方網站前，應自行詳閱該網站之使用條款與隱私政策。
            </p>

            <h2 className="text-xl font-semibold text-charcoal mt-10 mb-4">九、條款修改（Modification）</h2>
            <p className="text-slate-muted leading-relaxed">
              本中心得視營運需要、法令修訂或服務調整之情形，不時修改本條款。修改後之條款將公告於本網站，並於公告日起三十日後生效。於新條款生效後，您如繼續使用本網站，即視為同意並接受修改後之條款；若您不同意，請停止使用本網站並得依第十條規定終止帳戶。
            </p>

            <h2 className="text-xl font-semibold text-charcoal mt-10 mb-4">十、帳戶終止（Account Termination）</h2>
            <p className="text-slate-muted leading-relaxed">本中心得於下列情形，不經事先通知即暫停或終止您之帳戶及本網站使用權：</p>
            <ul className="text-slate-muted leading-relaxed list-disc pl-6 space-y-2">
              <li>您違反本條款、隱私權政策或相關法令。</li>
              <li>您提供之資訊不實、有誤導性或無法驗證。</li>
              <li>您從事第三條所列之任何禁止行為。</li>
              <li>您之行為對本網站、本中心或其他使用者之權益造成或可能造成損害。</li>
              <li>因應司法、檢調、主管機關或法令之要求。</li>
              <li>相關服務、計畫或專案結束。</li>
            </ul>
            <p className="text-slate-muted leading-relaxed mt-3">
              帳戶終止後，本中心就您已提交之使用者內容，仍得依本條款及隱私權政策所定之範圍與期間內予以保存與使用。您亦得隨時來信申請關閉帳戶。
            </p>

            <h2 className="text-xl font-semibold text-charcoal mt-10 mb-4">十一、準據法與管轄（Governing Law）</h2>
            <p className="text-slate-muted leading-relaxed">
              本條款之解釋、效力及履行，以中華民國法律為準據法。因本條款或本網站所生之爭議，雙方同意以中華民國臺灣臺北地方法院為第一審管轄法院，但不排除消費者保護法等強行規定所定之專屬管轄。
            </p>

            <h2 className="text-xl font-semibold text-charcoal mt-10 mb-4">十二、聯絡資訊（Contact）</h2>
            <p className="text-slate-muted leading-relaxed">
              如您對本條款有任何疑問、意見或申訴，歡迎來信：
              <a href="mailto:ntutec@ntutec.com" className="text-teal-deep underline underline-offset-4 hover:text-teal ml-1">ntutec@ntutec.com</a>
            </p>
            <p className="text-slate-muted leading-relaxed mt-2">
              國立臺灣大學創意創業中心<br />
              National Taiwan University Creativity &amp; Entrepreneurship Center（NTUTEC）
            </p>
          </div>
        </div>
      </section>
    </>
  )
}

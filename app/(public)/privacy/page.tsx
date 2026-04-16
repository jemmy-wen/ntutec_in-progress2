import type { Metadata } from 'next'
import PageHero from '@/components/public/PageHero'

export const metadata: Metadata = {
  title: '隱私權政策 | NTUTEC',
  description: '國立臺灣大學創意創業中心隱私權政策：說明本網站如何蒐集、使用、保存及保護您的個人資料，並揭露所使用之第三方服務商。',
}

export default function PrivacyPage() {
  return (
    <>
      <PageHero
        title="隱私權政策"
        subtitle="Privacy Policy"
        description="本政策說明國立臺灣大學創意創業中心如何蒐集、使用、保存及保護您的個人資料。"
      />

      <section className="section-spacing">
        <div className="container">
          <div className="mx-auto max-w-3xl prose prose-slate">
            <div className="rounded-lg border border-stone-warm bg-teal-wash p-4 mb-8 not-prose">
              <p className="text-sm text-charcoal leading-relaxed">
                ⚠️ 本政策為 <strong>v0.3 草稿版本</strong>，正式版將於法務審核後發佈。如有疑問請來信
                <a href="mailto:ntutec@ntutec.com" className="text-teal-deep underline underline-offset-4 hover:text-teal ml-1">ntutec@ntutec.com</a>
              </p>
              <p className="text-sm text-slate-muted mt-2">最後更新：2026-04-16</p>
            </div>

            <p className="text-slate-muted leading-relaxed">
              國立臺灣大學創意創業中心（以下簡稱「本中心」）尊重並致力保護每一位使用者之個人資料。本隱私權政策依《個人資料保護法》及相關法令訂定，說明本中心於營運 NTUTEC 網站（以下簡稱「本網站」）過程中，如何蒐集、處理、利用、保存及保護您的個人資料，並揭露所使用之第三方服務商。請您於使用本網站前，詳閱本政策之全部內容。
            </p>

            <h2 className="text-xl font-semibold text-charcoal mt-10 mb-4">一、資料蒐集範圍（Data Collection）</h2>
            <h3 className="text-lg font-semibold text-charcoal mt-6 mb-3">1.1 您主動提供之資料</h3>
            <ul className="text-slate-muted leading-relaxed list-disc pl-6 space-y-2">
              <li>識別資料：姓名、職稱、公司／團隊名稱、統一編號。</li>
              <li>聯絡資料：電子郵件、行動電話、通訊地址。</li>
              <li>申請資料：履歷、簡報（Pitch Deck）、商業計畫書、投遞表單所填之內容（包含產品、市場、財務、團隊介紹等）。</li>
              <li>天使會員資料：投資偏好、票面金額、產業興趣、參與紀錄。</li>
              <li>業師資料：專長領域、可提供之輔導類型、可供公開之簡歷。</li>
              <li>其他您於溝通過程中主動提供之資訊（email 往來、活動報名備註、會後回饋）。</li>
            </ul>
            <h3 className="text-lg font-semibold text-charcoal mt-6 mb-3">1.2 系統自動蒐集之資料</h3>
            <ul className="text-slate-muted leading-relaxed list-disc pl-6 space-y-2">
              <li>連線資料：IP 位址、瀏覽器類型與版本、作業系統、裝置類型、螢幕解析度、來源網址（<em>Referrer</em>）。</li>
              <li>使用紀錄：瀏覽頁面、停留時間、點擊軌跡、操作事件、錯誤紀錄。</li>
              <li>Cookie 與類似技術所儲存之識別碼與偏好設定。</li>
              <li>Google Analytics 等分析工具所產生之匿名統計資料。</li>
            </ul>

            <h2 className="text-xl font-semibold text-charcoal mt-10 mb-4">二、資料使用目的（Purpose of Use）</h2>
            <p className="text-slate-muted leading-relaxed">本中心蒐集、處理及利用您的個人資料，僅限於下列特定目的：</p>
            <ul className="text-slate-muted leading-relaxed list-disc pl-6 space-y-2">
              <li>提供本網站服務，包含帳戶管理、身份驗證、權限控管、功能操作與客戶支援。</li>
              <li>執行輔導計畫、案源審核、業師媒合、天使例會安排與後續追蹤。</li>
              <li>寄送活動通知、電子報、計畫訊息與您主動訂閱之內容。</li>
              <li>統計分析、服務改善、網站流量與使用者行為研究（均以彙總或去識別化方式進行）。</li>
              <li>依法令、主管機關或司法機關之要求，進行必要之配合與回報。</li>
              <li>預防、調查與處置違反本中心條款、詐欺、安全事件或法令遵循相關事務。</li>
            </ul>
            <p className="text-slate-muted leading-relaxed mt-3">
              本中心不會將您的個人資料出售或出租予第三方。非屬前述目的之利用，將另行取得您之同意後為之。
            </p>

            <h2 className="text-xl font-semibold text-charcoal mt-10 mb-4">三、資料保存期限（Retention）</h2>
            <p className="text-slate-muted leading-relaxed">
              本中心依下列原則保存您的個人資料：(a) 於蒐集特定目的存續期間內保存；(b) 服務關係終止後，預設保存五年，以因應會計、稅務、輔導計畫結案、爭議處理及法令稽核需要；(c) 如法令另有規定較長或較短之保存期間者，從其規定。保存期限屆滿後，本中心將予以銷毀或匿名化。您得依第七條規定請求提前刪除。
            </p>

            <h2 className="text-xl font-semibold text-charcoal mt-10 mb-4">四、第三方服務提供商（Third-Party Processors）</h2>
            <p className="text-slate-muted leading-relaxed">
              為提供本網站服務，本中心與下列第三方服務商合作，並要求其依其隱私政策及業界標準採取相應之資料保護措施：
            </p>
            <ul className="text-slate-muted leading-relaxed list-disc pl-6 space-y-2">
              <li><strong>Vercel Inc.</strong>（美國）— 網站託管與前端部署（Edge Network / CDN）。</li>
              <li><strong>Supabase Inc.</strong>（新加坡區域）— 資料庫、身份驗證與檔案儲存。</li>
              <li><strong>Google LLC</strong>（美國）— Google Analytics 流量分析與統計。</li>
              <li><strong>Ghost Foundation</strong>（新加坡／美國）— 電子報發送與訂閱管理。</li>
              <li><strong>Resend Inc.</strong>（美國）— 交易型 email 發送（驗證信、通知信）。</li>
              <li><strong>Luma Labs, Inc.</strong>（美國）— 活動日曆與報名管理。</li>
            </ul>
            <p className="text-slate-muted leading-relaxed mt-3">
              各服務商之隱私政策與安全認證，請逕洽其官方網站。本中心僅於必要範圍內向上述服務商提供最少量之個人資料。
            </p>

            <h2 className="text-xl font-semibold text-charcoal mt-10 mb-4">五、跨境資料傳輸（International Transfer）</h2>
            <p className="text-slate-muted leading-relaxed">
              由於上述部分第三方服務商之伺服器位於台灣境外（例如美國、新加坡），您的個人資料將可能被傳輸至中華民國以外之地區處理與儲存。本中心承諾：(a) 僅與具備 SOC 2、ISO 27001 或同等安全認證之供應商合作；(b) 傳輸過程採用 TLS 1.2 以上加密；(c) 靜置資料採用產業標準加密儲存；(d) 要求供應商簽署資料處理協議或比照業界標準之保密義務。若您不同意上述跨境傳輸，請停止使用本網站相關功能。
            </p>

            <h2 className="text-xl font-semibold text-charcoal mt-10 mb-4">六、Cookie 政策</h2>
            <p className="text-slate-muted leading-relaxed">
              本網站使用 Cookie 與類似技術，以識別登入狀態、記錄偏好設定、分析使用情形並改善服務體驗。本網站使用之 Cookie 類型包含：
            </p>
            <ul className="text-slate-muted leading-relaxed list-disc pl-6 space-y-2">
              <li><strong>必要性 Cookie</strong>：維持登入狀態、表單防濫用、CSRF 防護等；缺少此類 Cookie 將導致服務無法正常運作。</li>
              <li><strong>分析型 Cookie</strong>：由 Google Analytics 等工具所設置，以彙總方式統計頁面流量與使用趨勢。</li>
              <li><strong>偏好型 Cookie</strong>：記錄介面語言、顯示設定等個人化偏好。</li>
            </ul>
            <p className="text-slate-muted leading-relaxed mt-3">
              您得透過瀏覽器設定拒絕、刪除或管理 Cookie，惟部分功能可能因此受限。關閉 Cookie 之具體步驟，請參考您所使用瀏覽器之說明文件。
            </p>

            <h2 className="text-xl font-semibold text-charcoal mt-10 mb-4">七、當事人權利（User Rights per PDPA）</h2>
            <p className="text-slate-muted leading-relaxed">
              依據《個人資料保護法》第三條，您就本中心所保有之個人資料，得行使下列權利：
            </p>
            <ul className="text-slate-muted leading-relaxed list-disc pl-6 space-y-2">
              <li>查詢或請求閱覽。</li>
              <li>請求製給複製本。</li>
              <li>請求補充或更正。</li>
              <li>請求停止蒐集、處理或利用。</li>
              <li>請求刪除。</li>
            </ul>
            <p className="text-slate-muted leading-relaxed mt-3">
              您得來信
              <a href="mailto:ntutec@ntutec.com" className="text-teal-deep underline underline-offset-4 hover:text-teal mx-1">ntutec@ntutec.com</a>
              申請行使上述權利，本中心將於合理期間內回覆。如涉及第三人權益、法令義務或必要保存目的，本中心得依法拒絕或部分配合，並向您說明理由。
            </p>

            <h2 className="text-xl font-semibold text-charcoal mt-10 mb-4">八、資料外洩通知（Data Breach Notification）</h2>
            <p className="text-slate-muted leading-relaxed">
              本中心已建立資安事件應變機制。若發生可能影響您權益之重大個人資料外洩事件，本中心將於知悉後七十二小時內，以適當方式（包含但不限於 email、網站公告或主管機關指定之方式）通知受影響之當事人，並依法向主管機關通報。通知內容將包含：事件概要、可能外洩之資料類型、已採取之應變措施、對當事人之建議以及聯絡窗口。
            </p>

            <h2 className="text-xl font-semibold text-charcoal mt-10 mb-4">九、兒童隱私（Children&apos;s Privacy）</h2>
            <p className="text-slate-muted leading-relaxed">
              本網站不針對十三歲以下兒童提供服務，亦不會刻意蒐集該年齡層之個人資料。如本中心發現無意間蒐集到十三歲以下兒童之個人資料，且未取得法定代理人同意，將儘速刪除。若您為未成年人之法定代理人並發現相關情形，請來信通知本中心。
            </p>

            <h2 className="text-xl font-semibold text-charcoal mt-10 mb-4">十、政策修改（Policy Changes）</h2>
            <p className="text-slate-muted leading-relaxed">
              本中心得視法令修訂、服務調整或第三方服務商變動等情事，不時修改本政策。修改後之政策將公告於本網站，重大變更（例如蒐集目的擴張、新增跨境傳輸、增加第三方服務商）將於生效日三十日前公告或以 email 通知。於新政策生效後，您如繼續使用本網站，即視為同意並接受修改後之政策。
            </p>

            <h2 className="text-xl font-semibold text-charcoal mt-10 mb-4">十一、申訴管道（Contact &amp; Complaints）</h2>
            <p className="text-slate-muted leading-relaxed">
              如您對本政策、您的個人資料處理方式、或本中心之資料保護措施有任何疑問或申訴，歡迎來信：
              <a href="mailto:ntutec@ntutec.com" className="text-teal-deep underline underline-offset-4 hover:text-teal ml-1">ntutec@ntutec.com</a>
            </p>
            <p className="text-slate-muted leading-relaxed mt-2">
              如您對本中心之回覆不滿意，亦得向中華民國個人資料保護主管機關提出申訴。
            </p>
            <p className="text-slate-muted leading-relaxed mt-4">
              國立臺灣大學創意創業中心<br />
              National Taiwan University Creativity &amp; Entrepreneurship Center（NTUTEC）
            </p>
          </div>
        </div>
      </section>
    </>
  )
}

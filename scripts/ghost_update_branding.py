#!/usr/bin/env python3
"""
Ghost Admin API - PATCH existing articles with updated branding:
  車庫孵化器 → 台大車庫
  加速器     → 台大加速器
Eligibility:
  台大車庫：必須有台大身分
  台大加速器：不需要，但有台大身分優先
"""

import hmac, hashlib, base64, json, time, urllib.request, urllib.error

GHOST_URL  = "https://ntutec.ghost.io"
ADMIN_KEY  = "69d7bdbefa861a000146909e:79da540c01b9766cdaf2bc46ef372b114bed2f0e9e8c496e59a1c14ce2d7e29d"

POST_A_ID  = "69d9cd5e05f08000017297f2"   # CSE Guide
POST_B_ID  = "69d9cd5f05f08000017297ff"   # Accelerator Guide

def make_jwt():
    kid, secret = ADMIN_KEY.split(":")
    iat = int(time.time())
    h = base64.urlsafe_b64encode(json.dumps({"alg":"HS256","typ":"JWT","kid":kid}).encode()).rstrip(b"=").decode()
    p = base64.urlsafe_b64encode(json.dumps({"iat":iat,"exp":iat+300,"aud":"/admin/"}).encode()).rstrip(b"=").decode()
    sig = hmac.new(bytes.fromhex(secret), f"{h}.{p}".encode(), hashlib.sha256).digest()
    return f"{h}.{p}.{base64.urlsafe_b64encode(sig).rstrip(b'=').decode()}"

def api(method, path, body=None):
    token = make_jwt()
    url   = f"{GHOST_URL}/ghost/api/admin/{path}"
    data  = json.dumps(body, ensure_ascii=False).encode("utf-8") if body else None
    req   = urllib.request.Request(url, data=data, method=method)
    req.add_header("Authorization", f"Ghost {token}")
    req.add_header("Content-Type",  "application/json; charset=utf-8")
    try:
        with urllib.request.urlopen(req) as r:
            raw = r.read(); return json.loads(raw) if raw else {}
    except urllib.error.HTTPError as e:
        print(f"  HTTP {e.code}: {e.read()[:400]}"); return None

def html_to_mobiledoc(html):
    return json.dumps({
        "version":"0.3.1","atoms":[],"markups":[],"sections":[[10,0]],
        "cards":[["html",{"html":html}]]
    }, ensure_ascii=False)

def get_updated_at(post_id):
    r = api("GET", f"posts/{post_id}/")
    return r["posts"][0]["updated_at"] if r and "posts" in r else None

# ─────────────────────────────────────────────
# ARTICLE A: CSE — 更新品牌名稱引用
# ─────────────────────────────────────────────
ARTICLE_A_HTML = """
<h2>什麼是 CSE？</h2>
<p><strong>CSE（Corporate Social Entrepreneurship，企業社會創業）</strong>是指企業在既有資源與品牌之上，主動發起或投資具有社會影響力的新創事業，同時追求商業可持續與社會價值的雙重目標。</p>
<p>與傳統 CSR（企業社會責任）最大的差異在於：CSE 不只是「捐款」或「公益活動」，而是以創業家精神重新定義企業與社會的關係——打造能夠自我造血的社會影響力事業。</p>

<h2>為什麼 CSE 愈來愈重要？</h2>
<ul>
  <li><strong>ESG 壓力升高</strong>：機構投資人與供應鏈要求企業揭露 ESG 指標，純粹的公益活動已不足應對。</li>
  <li><strong>人才磁吸效應</strong>：Z 世代求職者偏好有使命感的雇主，CSE 可作為雇主品牌差異點。</li>
  <li><strong>政府補助誘因</strong>：台灣多項政策（社會創新、永續發展）優先扶植具 CSE 屬性的計畫。</li>
  <li><strong>開放式創新需求</strong>：企業內部 R&amp;D 有限，透過 CSE 與外部新創共創，降低創新成本。</li>
</ul>

<h2>CSE 的三種實踐模式</h2>
<table>
  <thead>
    <tr><th>模式</th><th>說明</th><th>典型案例</th></tr>
  </thead>
  <tbody>
    <tr>
      <td><strong>企業內部孵化</strong></td>
      <td>在組織內建立獨立小隊，以創業方式解決社會問題</td>
      <td>Patagonia 內部環境倡議</td>
    </tr>
    <tr>
      <td><strong>策略性加速器</strong></td>
      <td>與外部加速器合作，投資並加速社會影響力新創</td>
      <td>NTUTEC 企業垂直加速器（累計 27 期）</td>
    </tr>
    <tr>
      <td><strong>影響力投資</strong></td>
      <td>設立企業 CVC，以財務回報＋社會指標雙軌評估</td>
      <td>Salesforce Ventures Impact Fund</td>
    </tr>
  </tbody>
</table>

<h2>NTUTEC 如何協助企業推動 CSE？</h2>
<p>台大創創中心（NTUTEC）擁有 13 年深耕台灣新創生態系的經驗，已累計輔導<strong>近 600 支新創團隊</strong>，與<strong>超過 35 家企業</strong>建立合作關係，包含 Nvidia、Synopsys、鴻海等國際大廠。</p>
<p>目前 NTUTEC 為企業提供的 CSE 路徑主要有兩種：</p>
<ol>
  <li><strong>企業垂直加速器</strong>：由合作企業單獨委託，依各方需求量身設計，規則與招募時程完全獨立，聚焦企業指定的技術或社會痛點。累計已辦理 27 期，服務 Nvidia、Synopsys 等企業夥伴。</li>
  <li><strong>天使俱樂部共同投資</strong>：邀請企業代表加入 NTUTEC Angels Club，透過共同投資機制參與早期新創，350+ 位投資人網絡共同把關。</li>
</ol>

<h2>評估 CSE 計畫的關鍵指標</h2>
<p>一個成熟的 CSE 計畫應具備可量化的雙重成效追蹤：</p>
<ul>
  <li><strong>商業指標</strong>：ROI、新市場進入速度、開放式創新成果數</li>
  <li><strong>社會指標</strong>：受益人數、SDG 對應項目、媒體曝光量</li>
  <li><strong>人才指標</strong>：參與員工數、留才率變化、雇主品牌評分</li>
</ul>

<h2>常見問題 FAQ</h2>
<details>
  <summary><strong>CSE 與 CSR 有什麼不同？</strong></summary>
  <p>CSR 多為被動合規或單向捐助；CSE 是主動創業，追求商業可持續的社會影響力事業，兩者在策略深度與財務邏輯上截然不同。</p>
</details>
<details>
  <summary><strong>中小企業也適合推動 CSE 嗎？</strong></summary>
  <p>適合。CSE 不需要大型 CVC，從「策略性加速器合作」切入即可，資源投入彈性高，且可快速測試社會影響力假設。</p>
</details>
<details>
  <summary><strong>如何找到對的新創合作夥伴？</strong></summary>
  <p>建議透過有嚴格篩選機制的加速器（如 NTUTEC）進行媒合，而非單純參加展覽。NTUTEC 在媒合前會進行多輪 Gate 評估，確保合作新創具備技術可行性與商業潛力。</p>
</details>

<h2>延伸閱讀</h2>
<ul>
  <li><a href="/accelerator">台大加速器計畫</a></li>
  <li><a href="/corporate-partners">企業合作方案</a></li>
  <li><a href="/angel">天使俱樂部</a></li>
</ul>
"""

# ─────────────────────────────────────────────
# ARTICLE B: 申請完整指南 — 品牌名 + 資格重寫
# 台大車庫：必須有台大身分
# 台大加速器：不需要，但有台大身分優先
# ─────────────────────────────────────────────
ARTICLE_B_HTML = """
<p>台大創創中心（NTUTEC）旗下的<strong>台大加速器</strong>是台灣頂尖的大學系創業加速計畫之一。<strong>每年招募一期</strong>，輔導期為<strong>3 月至 12 月，共 10 個月</strong>。2026 年吸引超過 <strong>150 支</strong>團隊報名，競爭激烈。本文從申請時程、資格、評審流程到備考策略全面拆解，幫助你把握這個機會。</p>

<h2>NTUTEC 輔導計畫是什麼？</h2>
<p>台大創創中心成立於 2013 年，13 年來累計輔導<strong>近 600 支新創團隊</strong>。NTUTEC 提供兩條輔導軌道，分別針對不同創業階段：</p>

<h2>台大加速器 vs 台大車庫：哪個適合你？</h2>
<table>
  <thead>
    <tr><th>項目</th><th>台大車庫</th><th>台大加速器</th></tr>
  </thead>
  <tbody>
    <tr><td><strong>定位</strong></td><td>想法 → PMF 驗證</td><td>PMF → 規模化成長</td></tr>
    <tr><td><strong>期程</strong></td><td>10 個月（3 月 - 12 月），每年一期</td><td>10 個月（3 月 - 12 月），每年一期</td></tr>
    <tr><td><strong>核心目標</strong></td><td>找到可重複的驗證流程</td><td>建立可規模化的成長引擎</td></tr>
    <tr><td><strong>適合團隊</strong></td><td>Pre-product 或早期 MVP</td><td>已有初步客戶與收入</td></tr>
    <tr>
      <td><strong>台大身分要求</strong></td>
      <td>⚠️ <strong>必要</strong>：創辦人須為台大在校生、畢業校友、或教師</td>
      <td>✅ <strong>不需要</strong>，但有台大身分者優先錄取</td>
    </tr>
  </tbody>
</table>
<p>⚠️ 兩個計畫每年各招募一期，各錄取約 20 支團隊，不接受插班。</p>

<h2>申請時程</h2>
<table>
  <thead>
    <tr><th>時間</th><th>事項</th></tr>
  </thead>
  <tbody>
    <tr><td><strong>12 月 - 隔年 1 月</strong></td><td>開放報名，書面審查與面試（Gate 0 → Gate 2）</td></tr>
    <tr><td><strong>2 月</strong></td><td>公布錄取結果，簽署 MOU</td></tr>
    <tr><td><strong>3 月 - 12 月</strong></td><td>正式輔導期（10 個月）</td></tr>
    <tr><td><strong>12 月</strong></td><td>Demo Day 年度成果展</td></tr>
  </tbody>
</table>

<h2>申請資格</h2>
<h3>台大車庫（必須具備台大身分）</h3>
<p>以下任一條件符合即可：</p>
<ul>
  <li>台灣大學在校學生（大學部 / 碩士 / 博士）</li>
  <li>台灣大學畢業校友</li>
  <li>台灣大學現職教師或研究人員</li>
  <li>核心創辦人中至少一位符合上述條件</li>
</ul>

<h3>台大加速器（不需台大身分，但有台大連結優先）</h3>
<ul>
  <li>外部優質新創同樣歡迎申請，無台大身分限制</li>
  <li>已具備初步商業模式與早期客戶/收入</li>
  <li>有台大身分者，同等條件下優先錄取</li>
</ul>

<h3>兩個計畫共同要求</h3>
<ul>
  <li>核心團隊成員能全程投入，出席必修課程、期中及期末審核、Demo Day</li>
  <li>願意配合月度進度回報與導師一對一諮詢</li>
</ul>

<h2>評審流程：從報名到錄取</h2>
<ol>
  <li>
    <strong>Gate 0：書面篩選</strong>
    <p>提交申請表，評估團隊組成、問題定義清晰度、市場規模初估。通過者進入下一輪。</p>
  </li>
  <li>
    <strong>Gate 1：商業計畫書審閱</strong>
    <p>提交 Business Plan 或 Pitch Deck，審查商業邏輯、競爭分析、財務假設合理性。</p>
  </li>
  <li>
    <strong>Gate 2：面審（Screening Interview）</strong>
    <p>與 NTUTEC 投資評審委員面對面 Pitch，重點評估創辦人執行力、市場敏感度、對 feedback 的回應品質。</p>
  </li>
  <li>
    <strong>錄取通知與 MOU 簽署（2 月）</strong>
    <p>錄取後簽署三方 MOU（NTUTEC ＋ 團隊 ＋ 創辦人），3 月正式啟動 10 個月輔導期。</p>
  </li>
</ol>

<h2>10 個月輔導期：你會得到什麼？</h2>
<h3>台大加速器計畫節奏（3 月 - 12 月）</h3>
<table>
  <thead>
    <tr><th>月份</th><th>階段</th><th>核心產出</th></tr>
  </thead>
  <tbody>
    <tr><td>3 月（第 1 月）</td><td>啟動與 OKR 設定</td><td>KPI 基準線、成長假設清單</td></tr>
    <tr><td>4-5 月（第 2-3 月）</td><td>GTM 驗證</td><td>銷售漏斗、實驗結果</td></tr>
    <tr><td>6-7 月（第 4-5 月）</td><td>銷售與交付</td><td>Pipeline 儀表板、單位經濟</td></tr>
    <tr><td>8-9 月（第 6-7 月）</td><td>規模化準備</td><td>組織架構、流程文件</td></tr>
    <tr><td>10 月（第 8 月）</td><td>期中檢核</td><td>期中簡報、策略調整</td></tr>
    <tr><td>11-12 月（第 9-10 月）</td><td>Demo Day 準備 &amp; 年度成果展</td><td>Pitch Deck、Data Room、12 月 Demo Day 上台</td></tr>
  </tbody>
</table>

<h3>核心資源包</h3>
<ul>
  <li><strong>參與費用全免</strong>：台大車庫與台大加速器均為免費計畫</li>
  <li><strong>虛擬進駐</strong>：彈性虛擬進駐，無需實體搬遷，適合各地創業者</li>
  <li><strong>40+ 位業師一對一導師媒合</strong>：平均擁有 20 年以上產業與投資經驗，涵蓋 AI、生技、SaaS、硬體等垂直領域</li>
  <li><strong>天使俱樂部月會資格</strong>：每月與 350+ 位投資人網絡直接互動，表現優秀者可獲投資媒合</li>
  <li><strong>12 月 Demo Day 上台展示</strong>：面向企業、投資人、媒體的年度成果展</li>
  <li><strong>企業合作機會</strong>：透過 35 家企業合作夥伴（Nvidia、Synopsys、鴻海等）引薦 Pilot 或採購機會</li>
  <li><strong>NTUTEC 校友生態系</strong>：200+ 校友團隊交流網絡</li>
</ul>

<h2>申請備考策略：讓你的 Pitch 脫穎而出</h2>
<h3>1. 明確定義「為什麼是現在」</h3>
<p>評審最常問的問題是：「這個問題為什麼現在解決？」需有具體的市場時機論述（技術成熟、法規鬆綁、用戶習慣轉變等），而非只說「市場很大」。</p>

<h3>2. 用數據說話，而非形容詞</h3>
<p>「我們的產品很創新」遠不如「我們訪談了 50 位潛在用戶，37 位表示願意付費」有說服力。Gate 2 面審前，準備至少 3 項可量化的驗證數據。</p>

<h3>3. 展示對 feedback 的吸收能力</h3>
<p>NTUTEC 評審特別重視創辦人的「可教練性」（Coachability）。在面試中主動提及你如何根據早期 feedback 調整方向，比完美的 Pitch 更有加分效果。</p>

<h3>4. 說明你為什麼需要 NTUTEC</h3>
<p>具體說出你最需要的是「業師媒合」「投資人接觸」「企業 Pilot 引薦」還是「品牌背書」，顯示你對 NTUTEC 資源的理解深度。</p>

<h2>常見問題 FAQ</h2>
<details>
  <summary><strong>台大車庫和台大加速器各招幾人？</strong></summary>
  <p>兩個計畫每年各錄取約 <strong>20 支</strong>團隊，每年一期。</p>
</details>
<details>
  <summary><strong>沒有台大身分可以申請台大加速器嗎？</strong></summary>
  <p>可以。台大加速器<strong>不要求台大身分</strong>，外部優質新創同樣歡迎申請。但有台大身分（在校生、校友、教師）的團隊，同等條件下優先錄取。台大車庫則<strong>必須</strong>具備台大身分。</p>
</details>
<details>
  <summary><strong>輔導期是什麼時候？</strong></summary>
  <p>報名期為 12 月至隔年 1 月，2 月公布錄取，正式輔導期為 <strong>3 月至 12 月，共 10 個月</strong>，以 Demo Day 作為年度收尾。</p>
</details>
<details>
  <summary><strong>申請需要成立公司嗎？</strong></summary>
  <p>不一定，但需要核心成員明確、商業模式初步成形。台大車庫可在更早期（pre-product）申請；台大加速器建議已有早期客戶或收入。</p>
</details>
<details>
  <summary><strong>NTUTEC 會取得股份嗎？</strong></summary>
  <p>台大車庫與台大加速器本身不要求股份。若後續通過天使俱樂部投資，則依個案條件另行議定。</p>
</details>
<details>
  <summary><strong>2026 年有多少團隊報名？</strong></summary>
  <p>2026 年吸引超過 <strong>150 支</strong>團隊報名，是台灣報名最踴躍的大學系加速計畫之一。</p>
</details>

<h2>現在就開始準備</h2>
<p>報名期（12 月 - 1 月）前，建議提前備妥：</p>
<ol>
  <li>團隊介紹（創辦人背景、互補性，及台大身分說明）</li>
  <li>問題與解法一頁紙（One-pager）</li>
  <li>市場規模與競爭分析</li>
  <li>目前進度（訪談數、用戶數、收入）</li>
</ol>
<p>有任何申請問題，歡迎透過官網聯絡我們。</p>

<p><a href="/accelerator"><strong>→ 查看台大加速器計畫詳情</strong></a> ｜ <a href="/garage"><strong>→ 查看台大車庫計畫詳情</strong></a></p>
"""

def main():
    for label, post_id, html, title, meta_title, meta_desc in [
        (
            "A: CSE Guide",
            POST_A_ID,
            ARTICLE_A_HTML,
            "CSE 是什麼？企業社會創業的完整解析與 NTUTEC 實踐路徑",
            "CSE 是什麼？企業社會創業完整指南 | NTUTEC 台大創創中心",
            "深入解析 CSE（企業社會創業）的定義、三種實踐模式、與 CSR 的差異，以及 NTUTEC 如何協助企業透過台大加速器和天使投資推動 CSE。",
        ),
        (
            "B: Accelerator Guide",
            POST_B_ID,
            ARTICLE_B_HTML,
            "台大加速器 ＆ 台大車庫申請完整指南：時程、資格、流程一次看懂",
            "台大加速器申請指南：12月開始報名，10個月輔導完整說明 | NTUTEC",
            "完整解析台大加速器與台大車庫申請時程（12-1月報名、2月公布、3-12月輔導）、資格差異、Gate流程，及備考策略。台大車庫需台大身分，台大加速器開放外部申請。",
        ),
    ]:
        print(f"\nUpdating {label}...")
        updated_at = get_updated_at(post_id)
        if not updated_at:
            print("  ❌ Could not get updated_at"); continue

        payload = {"posts": [{
            "title":        title,
            "mobiledoc":    html_to_mobiledoc(html),
            "meta_title":   meta_title,
            "meta_description": meta_desc,
            "updated_at":   updated_at,
        }]}
        result = api("PUT", f"posts/{post_id}/", payload)
        if result and "posts" in result:
            p = result["posts"][0]
            print(f"  ✅ Updated: {p.get('url','')}")
            print(f"     updated_at: {p.get('updated_at','')}")
        else:
            print(f"  ❌ Failed")

if __name__ == "__main__":
    main()

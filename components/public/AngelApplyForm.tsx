"use client";

import { useState } from "react";

const inputClass =
  "w-full px-4 py-3 border border-stone-warm rounded-xl text-sm focus:ring-2 focus:ring-teal focus:border-transparent outline-none bg-white";
const labelClass = "block text-sm font-medium text-charcoal mb-1.5";

export default function AngelApplyForm() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [company, setCompany] = useState("");
  const [referrer, setReferrer] = useState("");
  const [message, setMessage] = useState("");
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [errorMsg, setErrorMsg] = useState("");

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setStatus("loading");
    setErrorMsg("");

    const fullMessage = [
      message,
      referrer ? `【推薦人：${referrer}】` : "",
    ]
      .filter(Boolean)
      .join("\n\n");

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name,
          email,
          phone: phone || undefined,
          company: company || undefined,
          type: "angel",
          message: fullMessage,
        }),
      });

      if (!res.ok) {
        const data = (await res.json().catch(() => ({}))) as { error?: string };
        throw new Error(data.error ?? `請求失敗（${res.status}）`);
      }

      setStatus("success");
    } catch (err) {
      setStatus("error");
      setErrorMsg(err instanceof Error ? err.message : "發生未知錯誤，請稍後再試。");
    }
  }

  if (status === "success") {
    return (
      <div className="rounded-xl border border-teal/30 bg-teal-wash px-6 py-8 text-center">
        <p className="text-lg font-semibold text-charcoal">感謝您的申請！</p>
        <p className="mt-2 text-sm leading-relaxed text-slate-muted">
          投資經理將於 3 個工作日內以 Email 與您聯繫，進行下一步面談說明。
        </p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} noValidate className="space-y-5">
      {/* Name */}
      <div>
        <label htmlFor="angel-name" className={labelClass}>
          姓名 *
        </label>
        <input
          id="angel-name"
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
          placeholder="請輸入中文全名"
          className={inputClass}
          autoComplete="name"
        />
      </div>

      {/* Email */}
      <div>
        <label htmlFor="angel-email" className={labelClass}>
          Email *
        </label>
        <input
          id="angel-email"
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
          placeholder="example@email.com"
          className={inputClass}
          autoComplete="email"
        />
      </div>

      {/* Phone */}
      <div>
        <label htmlFor="angel-phone" className={labelClass}>
          聯絡電話
        </label>
        <input
          id="angel-phone"
          type="text"
          value={phone}
          onChange={(e) => setPhone(e.target.value)}
          className={inputClass}
          autoComplete="tel"
        />
      </div>

      {/* Company */}
      <div>
        <label htmlFor="angel-company" className={labelClass}>
          機構/公司
        </label>
        <input
          id="angel-company"
          type="text"
          value={company}
          onChange={(e) => setCompany(e.target.value)}
          className={inputClass}
          autoComplete="organization"
        />
      </div>

      {/* Referrer */}
      <div>
        <label htmlFor="angel-referrer" className={labelClass}>
          推薦人（現有會員）
        </label>
        <input
          id="angel-referrer"
          type="text"
          value={referrer}
          onChange={(e) => setReferrer(e.target.value)}
          placeholder="如有推薦人請填寫"
          className={inputClass}
        />
      </div>

      {/* Message */}
      <div>
        <label htmlFor="angel-message" className={labelClass}>
          自我介紹 *
        </label>
        <textarea
          id="angel-message"
          rows={5}
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          required
          aria-describedby="angel-message-hint"
          placeholder="請簡介您的投資背景、關注領域，以及加入天使俱樂部的動機"
          className={inputClass}
        />
        <p id="angel-message-hint" className="mt-1.5 text-xs text-slate-muted">
          請描述您的投資背景、關注的產業領域，以及希望加入天使俱樂部的原因。
        </p>
      </div>

      {/* Error */}
      {status === "error" && (
        <p className="text-sm text-red-600" role="alert">
          {errorMsg}
        </p>
      )}

      <button
        type="submit"
        disabled={status === "loading"}
        className="w-full px-5 py-3 bg-teal text-white rounded-xl font-semibold hover:bg-teal-deep disabled:opacity-50 transition-colors"
      >
        {status === "loading" ? "送出中..." : "送出申請"}
      </button>
    </form>
  );
}

"use client";

import { useState, useEffect } from "react";
import { useSearchParams } from "next/navigation";

type Track = "accelerator" | "garage";

const inputClass =
  "w-full px-4 py-3 border border-stone-warm rounded-xl text-sm focus:ring-2 focus:ring-teal focus:border-transparent outline-none bg-white";
const labelClass = "block text-sm font-medium text-charcoal mb-1.5";

export default function PreRegisterForm() {
  const searchParams = useSearchParams();
  const [track, setTrack] = useState<Track>("accelerator");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [company, setCompany] = useState("");
  const [message, setMessage] = useState("");
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [errorMsg, setErrorMsg] = useState("");

  useEffect(() => {
    const trackParam = searchParams.get("track");
    if (trackParam === "garage") setTrack("garage");
    else if (trackParam === "accelerator") setTrack("accelerator");
  }, [searchParams]);

  const trackLabel: Record<Track, string> = {
    accelerator: "加速器 Accelerator",
    garage: "車庫 Garage",
  };

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setStatus("loading");
    setErrorMsg("");

    const fullMessage = [
      message,
      `【提前登記項目：${trackLabel[track]}】`,
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
          type: "startup",
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
      <div className="rounded-xl border border-green-200 bg-green-50 px-6 py-8 text-center">
        <p className="text-lg font-semibold text-green-800">已登記！</p>
        <p className="mt-2 text-sm leading-relaxed text-green-700">
          2026 年 12 月開放申請時，我們將以 Email 通知您。
        </p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} noValidate className="space-y-5">
      {/* Track selection */}
      <fieldset>
        <legend className={labelClass}>申請項目 *</legend>
        <div className="flex gap-6">
          {(["accelerator", "garage"] as Track[]).map((t) => (
            <label key={t} className="flex cursor-pointer items-center gap-2 text-sm text-charcoal">
              <input
                type="radio"
                name="track"
                value={t}
                checked={track === t}
                onChange={() => setTrack(t)}
                className="accent-teal"
                required
              />
              {trackLabel[t]}
            </label>
          ))}
        </div>
      </fieldset>

      {/* Name */}
      <div>
        <label htmlFor="pre-name" className={labelClass}>
          姓名 *
        </label>
        <input
          id="pre-name"
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
          className={inputClass}
          autoComplete="name"
        />
      </div>

      {/* Email */}
      <div>
        <label htmlFor="pre-email" className={labelClass}>
          Email *
        </label>
        <input
          id="pre-email"
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
          className={inputClass}
          autoComplete="email"
        />
      </div>

      {/* Phone */}
      <div>
        <label htmlFor="pre-phone" className={labelClass}>
          電話
        </label>
        <input
          id="pre-phone"
          type="text"
          value={phone}
          onChange={(e) => setPhone(e.target.value)}
          className={inputClass}
          autoComplete="tel"
        />
      </div>

      {/* Company */}
      <div>
        <label htmlFor="pre-company" className={labelClass}>
          團隊/公司名稱
        </label>
        <input
          id="pre-company"
          type="text"
          value={company}
          onChange={(e) => setCompany(e.target.value)}
          className={inputClass}
          autoComplete="organization"
        />
      </div>

      {/* Message */}
      <div>
        <label htmlFor="pre-message" className={labelClass}>
          備註
        </label>
        <textarea
          id="pre-message"
          rows={4}
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          placeholder="簡單描述你的團隊（選填）"
          className={inputClass}
        />
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
        {status === "loading" ? "登記中..." : "提前登記"}
      </button>
    </form>
  );
}

"use client";

import { useSearchParams } from "next/navigation";
import { Suspense, useCallback, useEffect, useState } from "react";
import { DOMAIN_NAMES } from "@/lib/classify";

const INPUT_CLASS =
  "w-full rounded-lg border border-stone-warm bg-white px-3 py-2 text-charcoal placeholder:text-slate-muted focus:outline-none focus:ring-2 focus:ring-teal-deep/30 focus:border-teal-deep transition-colors";

/* ---------- types ---------- */

interface VerifyResult {
  valid: boolean;
  error?: string;
  entity_type?: "startup" | "mentor";
  data?: Record<string, unknown>;
}

/* ---------- main wrapper (Suspense boundary for useSearchParams) ---------- */

export default function PortalPage() {
  return (
    <Suspense fallback={<PageShell><Spinner label="載入中..." /></PageShell>}>
      <PortalInner />
    </Suspense>
  );
}

/* ---------- inner component ---------- */

function PortalInner() {
  const searchParams = useSearchParams();
  const token = searchParams.get("token");

  const [status, setStatus] = useState<
    "loading" | "invalid" | "ready" | "submitting" | "done"
  >("loading");
  const [errorMsg, setErrorMsg] = useState("");
  const [entityType, setEntityType] = useState<"startup" | "mentor">("startup");
  const [fields, setFields] = useState<Record<string, unknown>>({});

  /* --- verify token on mount --- */
  useEffect(() => {
    if (!token) {
      setErrorMsg("缺少驗證連結，請確認您的連結是否完整。");
      setStatus("invalid");
      return;
    }

    let cancelled = false;

    (async () => {
      try {
        const res = await fetch(`/api/portal/verify?token=${encodeURIComponent(token)}`);
        const json: VerifyResult = await res.json();

        if (cancelled) return;

        if (!res.ok || !json.valid) {
          setErrorMsg(json.error ?? "連結無效或已過期，請聯繫 NTUTEC 取得新連結。");
          setStatus("invalid");
          return;
        }

        setEntityType(json.entity_type ?? "startup");
        setFields(json.data ?? {});
        setStatus("ready");
      } catch {
        if (!cancelled) {
          setErrorMsg("網路錯誤，請稍後再試。");
          setStatus("invalid");
        }
      }
    })();

    return () => { cancelled = true; };
  }, [token]);

  /* --- submit handler --- */
  const handleSubmit = useCallback(async () => {
    if (!token) return;
    setStatus("submitting");

    try {
      const res = await fetch("/api/portal/update", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ token, fields }),
      });

      if (!res.ok) {
        const json = await res.json().catch(() => ({}));
        setErrorMsg((json as { error?: string }).error ?? "更新失敗，請稍後再試。");
        setStatus("ready");
        return;
      }

      setStatus("done");
    } catch {
      setErrorMsg("網路錯誤，請稍後再試。");
      setStatus("ready");
    }
  }, [token, fields]);

  /* --- render --- */

  if (status === "loading") {
    return <PageShell><Spinner label="驗證連結中..." /></PageShell>;
  }

  if (status === "invalid") {
    return (
      <PageShell>
        <div className="text-center py-12">
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-red-50 mb-4">
            <svg className="w-8 h-8 text-red-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </div>
          <h2 className="text-xl font-semibold text-charcoal mb-2">無法驗證連結</h2>
          <p className="text-slate-muted">{errorMsg}</p>
        </div>
      </PageShell>
    );
  }

  if (status === "done") {
    return (
      <PageShell>
        <div className="text-center py-12">
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-emerald-50 mb-4">
            <svg className="w-8 h-8 text-emerald-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
            </svg>
          </div>
          <h2 className="text-xl font-semibold text-charcoal mb-2">資料已更新，感謝！</h2>
          <p className="text-slate-muted">此連結已失效，如需再次修改請聯繫 NTUTEC。</p>
        </div>
      </PageShell>
    );
  }

  return (
    <PageShell>
      {errorMsg && (
        <div className="mb-4 rounded-lg bg-red-50 border border-red-200 px-4 py-3 text-sm text-red-700">
          {errorMsg}
        </div>
      )}

      {entityType === "startup" ? (
        <StartupForm fields={fields} onChange={setFields} />
      ) : (
        <MentorForm fields={fields} onChange={setFields} />
      )}

      <button
        onClick={handleSubmit}
        disabled={status === "submitting"}
        className="mt-6 w-full rounded-lg bg-teal-deep py-3 px-4 text-white font-medium
                   hover:opacity-90 transition-opacity disabled:opacity-50 disabled:cursor-not-allowed"
      >
        {status === "submitting" ? "提交中..." : "儲存更新"}
      </button>
    </PageShell>
  );
}

/* ================================================================
   Shared layout wrapper
   ================================================================ */

function PageShell({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen bg-teal-wash flex items-start justify-center px-4 py-12">
      <div className="w-full max-w-2xl">
        {/* header */}
        <div className="text-center mb-8">
          <h1 className="text-2xl font-bold text-charcoal">NTUTEC</h1>
          <p className="text-slate-muted mt-1">資料更新入口 / Self-Service Portal</p>
        </div>

        {/* card */}
        <div className="bg-white rounded-2xl shadow-sm border border-stone-warm p-6 sm:p-8">
          {children}
        </div>

        <p className="text-center text-xs text-slate-muted mt-6">
          台大創創中心 &copy; {new Date().getFullYear()}
        </p>
      </div>
    </div>
  );
}

/* ================================================================
   Startup form
   ================================================================ */

interface FormProps {
  fields: Record<string, unknown>;
  onChange: (f: Record<string, unknown>) => void;
}

function StartupForm({ fields, onChange }: FormProps) {
  const set = (key: string, value: unknown) => onChange({ ...fields, [key]: value });

  const tags = Array.isArray(fields.tags) ? (fields.tags as string[]) : [];

  const removeTag = (tag: string) => set("tags", tags.filter((t) => t !== tag));

  const addTag = (tag: string) => {
    if (tag && !tags.includes(tag)) {
      set("tags", [...tags, tag]);
    }
  };

  return (
    <div className="space-y-5">
      <h2 className="text-lg font-semibold text-charcoal border-b border-stone-warm pb-2">
        新創團隊資料
      </h2>

      <Field label="團隊名稱">
        <input
          type="text"
          value={(fields.name as string) ?? ""}
          onChange={(e) => set("name", e.target.value)}
          className={INPUT_CLASS}
        />
      </Field>

      <Field label="團隊介紹">
        <textarea
          rows={4}
          value={(fields.description as string) ?? ""}
          onChange={(e) => set("description", e.target.value)}
          className={INPUT_CLASS}
        />
      </Field>

      <Field label="官網連結">
        <input
          type="url"
          placeholder="https://"
          value={(fields.external_link as string) ?? ""}
          onChange={(e) => set("external_link", e.target.value)}
          className={INPUT_CLASS}
        />
      </Field>

      <Field label="統一編號">
        <input
          type="text"
          value={(fields.uniform_number as string) ?? ""}
          onChange={(e) => set("uniform_number", e.target.value)}
          className={INPUT_CLASS}
          maxLength={8}
        />
      </Field>

      <Field label="領域標籤">
        {/* current tags */}
        <div className="flex flex-wrap gap-2 mb-2">
          {tags.map((tag) => (
            <span
              key={tag}
              className="inline-flex items-center gap-1 rounded-full bg-teal-wash px-3 py-1 text-sm text-teal-deep"
            >
              {tag}
              <button
                type="button"
                onClick={() => removeTag(tag)}
                className="ml-0.5 hover:text-red-500 transition-colors"
                aria-label={`移除 ${tag}`}
              >
                &times;
              </button>
            </span>
          ))}
          {tags.length === 0 && (
            <span className="text-sm text-slate-muted">尚未選擇標籤</span>
          )}
        </div>

        {/* add tag dropdown */}
        <select
          value=""
          onChange={(e) => {
            addTag(e.target.value);
            e.target.value = "";
          }}
          className={`${INPUT_CLASS} text-sm`}
        >
          <option value="" disabled>
            + 新增領域標籤
          </option>
          {DOMAIN_NAMES.filter((d) => !tags.includes(d)).map((d) => (
            <option key={d} value={d}>
              {d}
            </option>
          ))}
        </select>
      </Field>
    </div>
  );
}

/* ================================================================
   Mentor form
   ================================================================ */

function MentorForm({ fields, onChange }: FormProps) {
  const set = (key: string, value: unknown) => onChange({ ...fields, [key]: value });

  return (
    <div className="space-y-5">
      <h2 className="text-lg font-semibold text-charcoal border-b border-stone-warm pb-2">
        業師資料
      </h2>

      <Field label="職稱">
        <input
          type="text"
          value={(fields.title as string) ?? ""}
          onChange={(e) => set("title", e.target.value)}
          className={INPUT_CLASS}
        />
      </Field>

      <Field label="顯示標題">
        <input
          type="text"
          value={(fields.highlight as string) ?? ""}
          onChange={(e) => set("highlight", e.target.value)}
          className={INPUT_CLASS}
        />
      </Field>

      <Field label="個人介紹">
        <textarea
          rows={6}
          value={(fields.bio as string) ?? ""}
          onChange={(e) => set("bio", e.target.value)}
          className={INPUT_CLASS}
        />
      </Field>

      <Field label="LinkedIn / 社群連結">
        <input
          type="url"
          placeholder="https://"
          value={(fields.social_url as string) ?? ""}
          onChange={(e) => set("social_url", e.target.value)}
          className={INPUT_CLASS}
        />
      </Field>
    </div>
  );
}

/* ================================================================
   Shared UI primitives
   ================================================================ */

function Field({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <label className="block">
      <span className="block text-sm font-medium text-charcoal mb-1">{label}</span>
      {children}
    </label>
  );
}

function Spinner({ label }: { label: string }) {
  return (
    <div className="flex flex-col items-center justify-center py-16 gap-3">
      <div className="h-8 w-8 animate-spin rounded-full border-4 border-stone-warm border-t-teal-deep" />
      <p className="text-sm text-slate-muted">{label}</p>
    </div>
  );
}

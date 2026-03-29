/**
 * Auth layout — minimal centered layout for login/callback pages.
 */
export default function AuthLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center">
      <div className="w-full max-w-md px-6">
        {children}
      </div>
    </div>
  )
}

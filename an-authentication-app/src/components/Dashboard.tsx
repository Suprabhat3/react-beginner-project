import { useAuth } from "../context/AuthContext";

export default function Dashboard() {
  const { user, logout, loading, error } = useAuth();

  async function handleLogout() {
    await logout();
  }

  const initials = user?.username
    ? user.username.slice(0, 2).toUpperCase()
    : "??";

  return (
    <div className="w-full max-w-lg mx-auto pt-8">
      <div className="bg-white rounded-2xl shadow-lg border border-stone-200 overflow-hidden">
        <div className="bg-linear-to-r from-emerald-500 to-teal-500 px-8 py-10 text-center">
          <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-white/20 backdrop-blur-sm border-2 border-white/40 text-white text-2xl font-bold mb-4">
            {initials}
          </div>
          <h2 className="text-2xl font-bold text-white">{user?.username}</h2>
          <span className="inline-block mt-2 px-3 py-1 rounded-full bg-white/20 text-white text-xs font-semibold tracking-wide uppercase">
            {user?.role}
          </span>
        </div>

        <div className="p-8 space-y-5">
          <div className="grid gap-4">
            <div className="flex items-center gap-3 p-4 rounded-xl bg-stone-50 border border-stone-100">
              <div className="flex items-center justify-center w-10 h-10 rounded-lg bg-emerald-50">
                <svg className="w-5 h-5 text-emerald-600" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
              </div>
              <div>
                <p className="text-xs text-stone-400 font-medium">Email</p>
                <p className="text-stone-800 font-medium">{user?.email}</p>
              </div>
            </div>

            <div className="flex items-center gap-3 p-4 rounded-xl bg-stone-50 border border-stone-100">
              <div className="flex items-center justify-center w-10 h-10 rounded-lg bg-amber-50">
                <svg className="w-5 h-5 text-amber-600" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                </svg>
              </div>
              <div>
                <p className="text-xs text-stone-400 font-medium">Username</p>
                <p className="text-stone-800 font-medium">{user?.username}</p>
              </div>
            </div>

            <div className="flex items-center gap-3 p-4 rounded-xl bg-stone-50 border border-stone-100">
              <div className="flex items-center justify-center w-10 h-10 rounded-lg bg-rose-50">
                <svg className="w-5 h-5 text-rose-600" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                </svg>
              </div>
              <div>
                <p className="text-xs text-stone-400 font-medium">Role</p>
                <p className="text-stone-800 font-medium">{user?.role}</p>
              </div>
            </div>

            {user?._id && (
              <div className="flex items-center gap-3 p-4 rounded-xl bg-stone-50 border border-stone-100">
                <div className="flex items-center justify-center w-10 h-10 rounded-lg bg-teal-50">
                  <svg className="w-5 h-5 text-teal-600" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M7 20l4-16m2 16l4-16M6 9h14M4 15h14" />
                  </svg>
                </div>
                <div>
                  <p className="text-xs text-stone-400 font-medium">User ID</p>
                  <p className="text-stone-800 font-mono text-sm break-all">{user._id}</p>
                </div>
              </div>
            )}
          </div>

          {error && (
            <div className="p-3 rounded-lg bg-red-50 border border-red-200 text-red-700 text-sm">
              {error}
            </div>
          )}

          <button
            onClick={handleLogout}
            disabled={loading}
            className="w-full py-2.5 px-4 rounded-lg bg-stone-800 hover:bg-stone-900 disabled:bg-stone-400 text-white font-semibold transition cursor-pointer disabled:cursor-not-allowed flex items-center justify-center gap-2"
          >
            {loading ? (
              <>
                <svg className="animate-spin h-4 w-4" viewBox="0 0 24 24" fill="none">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
                </svg>
                Logging out...
              </>
            ) : (
              <>
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
                </svg>
                Sign out
              </>
            )}
          </button>
        </div>
      </div>
    </div>
  );
}

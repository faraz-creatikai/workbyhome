'use client';

import { useState, FormEvent, useEffect } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import Link from 'next/link';
import { Zilla_Slab, Inter, IBM_Plex_Mono } from 'next/font/google';
import { Eye, EyeOff, Lock, Mail, ArrowRight, Loader2, ShieldCheck, CheckCircle2 } from 'lucide-react';
import { useAuthLanding } from '@/context/AuthContextLanding';

const display = Zilla_Slab({ subsets: ['latin'], weight: ['500', '600', '700'], variable: '--font-display' });
const body = Inter({ subsets: ['latin'], weight: ['400', '500', '600', '700'], variable: '--font-body' });
const mono = IBM_Plex_Mono({ subsets: ['latin'], weight: ['400', '500'], variable: '--font-mono' });

export default function SEOLoginPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const { user, setUser } = useAuthLanding();
  const redirectUrl = searchParams.get('redirect') || '/admin-dashboard';

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

  // Redirect if already logged in
  useEffect(() => {
    console.log("User state changed:", user);
    if (user) {
      if (user.role === "ADMIN") {
        router.push("/admin-dashboard");
      } else {
        router.push("/dashboard");
      }
    }
  }, [user]);

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError('');

    try {
      const response = await fetch('/api/seo-auth', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password }),
      });

      const data = await response.json();

      if (response.ok && data.success) {
        setUser(data.user); // API already gives you the decoded user — no need to touch cookies here at all
        router.push(redirectUrl);
        router.refresh();
      } else {
        setError(data.message || 'Invalid credentials');
      }
    } catch (err) {
      setError('Something went wrong. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div
      className={`${display.variable} ${body.variable} ${mono.variable} relative min-h-screen w-full overflow-x-hidden bg-[var(--bg-secondary)] `}
    >
      {/* Ambient dot-pattern backdrop — same pattern used on the marketing hero / apply-now page */}
      <div
        className="pointer-events-none fixed inset-0 z-0 opacity-70"
        style={{
          backgroundImage: 'radial-gradient(var(--border-medium) 1.5px, transparent 1.5px)',
          backgroundSize: '22px 22px',
        }}
      />

      <div className="relative z-10 lg:grid lg:min-h-screen lg:grid-cols-[38%_62%]">
        {/* ---------------------------------------------------------------- */}
        {/* Brand / side panel                                               */}
        {/* ---------------------------------------------------------------- */}
        <aside className="relative hidden flex-col justify-between px-12 py-4 lg:flex">
          <div>
            <Link href="/"><img src="/workbyhome-logo.png" alt="WorkByHome" className="h-14 max-w-[200px] w-full shrink-0" /></Link>

            <p className="mt-5 [font-family:var(--font-mono)] text-xs uppercase tracking-[0.2em] text-[var(--color-primary-600)]">
              Restricted Management Area
            </p>
            <h1 className="mt-3 text-[2.6rem] font-semibold leading-[1.08] text-[var(--text-primary)] ">
              Admin & SEO Console.
            </h1>
            <p className="mt-4 max-w-sm text-[15px] leading-relaxed text-[var(--text-secondary)]">
              Authorized access only. Sign in with your administrator credentials to manage platform indexing, SEO
              configurations, and application dashboards.
            </p>
          </div>

          <div className="relative space-y-4">
            <div className="flex items-center gap-3 rounded-2xl border border-[var(--border-medium)] bg-[var(--bg-primary)] p-4">
              <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-[var(--color-primary-50)] text-[var(--color-primary-600)]">
                <Lock className="h-5 w-5" />
              </div>
              <div className="text-xs text-[var(--text-secondary)]">
                <p className="font-semibold text-[var(--text-primary)]">End-to-End Session Security</p>
                <p className="mt-0.5">Encrypted token validation on all operations.</p>
              </div>
            </div>

            <div className="relative flex items-center gap-3 rounded-2xl bg-[var(--color-primary-50)] px-4 py-3 text-sm text-[var(--color-primary-700)]">
              <ShieldCheck className="h-4 w-4 shrink-0 text-[var(--color-primary-600)]" />
              Protected by WorkByHome strict administrative access control.
            </div>
          </div>
        </aside>

        {/* ---------------------------------------------------------------- */}
        {/* Form panel                                                       */}
        {/* ---------------------------------------------------------------- */}
        <main className="flex justify-center px-2 py-4 sm:px-8 sm:py-14 lg:items-center lg:py-10">
          <div className="w-full max-w-xl lg:max-w-md">
            {/* Mobile header */}
            <div className="mb-8 flex items-center justify-between lg:hidden">
              <Link href="/" className=' w-full'><img src="/workbyhome-logo.png" alt="WorkByHome" className="h-14 max-w-[200px] w-full shrink-0" /></Link>

            </div>

            {/* Login card + its floating decoration, grouped so the pieces can overlap the card edges */}
            <div className="relative">
              {/* sticky note */}
              <div className="pointer-events-none absolute -top-7 -left-20 z-20 hidden -rotate-3 sm:block">
                <div className="relative w-44 rounded-br-2xl rounded-tl-sm bg-[var(--color-warning-100,#FEF9C3)] px-4 pt-5 pb-6 shadow-[6px_14px_26px_rgba(0,0,0,0.10)]">
                  <span className="absolute -top-2 left-1/2 h-3.5 w-3.5 -translate-x-1/2 rounded-full border border-[var(--color-error-600)] bg-[var(--color-error-500,#ef4444)] shadow-[0_3px_6px_rgba(239,68,68,0.4)]" />
                  <p className="text-[13px] font-medium leading-snug text-[var(--text-primary)]">
                    Restricted access — sign in with your admin credentials to continue.
                  </p>
                </div>
              </div>

              {/* scattered dot cluster, top right */}
              <div className="pointer-events-none absolute top-5 right-5 z-40 hidden grid-cols-3 gap-2 sm:grid">
                {[0.7, 0.35, 0.9, 0.3, 0.6, 0.5, 0.85, 0.4, 0.55].map((o, i) => (
                  <span key={i} className="h-1.5 w-1.5 rounded-full bg-[var(--color-primary-300)]" style={{ opacity: o }} />
                ))}
              </div>

              {/* central brand avatar, overlapping the card's top edge */}
              <div className="pointer-events-none absolute left-1/2 top-0 z-30 -translate-x-1/2 -translate-y-1/2">
                <div className="flex h-14 w-14 items-center justify-center rounded-full bg-[var(--bg-primary)] shadow-[0_15px_35px_-10px_rgba(15,23,42,0.3)] ring-4 ring-[var(--bg-primary)] sm:h-20 sm:w-20">
                  <img src="/workbyhome.png" alt="" className="h-12 w-12 sm:h-16 sm:w-16" />
                </div>
              </div>

              <div className="relative z-10 rounded-3xl border border-[var(--border-medium)] bg-[var(--bg-primary)] px-6 pb-6 pt-12 shadow-[0_20px_60px_-30px_rgba(15,23,42,0.15)] sm:px-9 sm:pb-9 sm:pt-16">
                <div className="mb-7">
                  <h2 className="text-center text-2xl font-semibold text-[var(--text-primary)] [font-family:var(--font-display)]">
                    ADMIN Manager Login
                  </h2>
                  <p className="mt-1.5 text-center text-sm text-[var(--text-secondary)]">
                    Please authenticate with your administrative account.
                  </p>
                </div>

                {error && (
                  <div className="mb-6 rounded-xl border border-[var(--color-error-500)]/30 bg-[var(--color-error-50)] p-3.5 text-sm text-[var(--color-error-600)]">
                    {error}
                  </div>
                )}

                <form onSubmit={handleSubmit} className="space-y-5">
                  {/* Email Field */}
                  <div>
                    <label htmlFor="email" className="mb-1.5 block text-sm font-medium text-[var(--text-primary)]">
                      Email address
                    </label>
                    <div className="relative">
                      <Mail className="pointer-events-none absolute left-3.5 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-[var(--text-tertiary)]" />
                      <input
                        id="email"
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                        placeholder="admin@workbyhome.com"
                        className="w-full rounded-xl border border-[var(--border-medium)] bg-[var(--bg-primary)] py-3 pl-10 pr-4 text-[15px] text-[var(--text-primary)] placeholder:text-[var(--text-tertiary)] outline-none transition-all focus:border-[var(--color-primary-600)] focus:ring-2 focus:ring-[var(--color-primary-100)] focus:ring-offset-1 focus:ring-offset-[var(--bg-primary)]"
                      />
                    </div>
                  </div>

                  {/* Password Field */}
                  <div>
                    <label htmlFor="password" className="mb-1.5 block text-sm font-medium text-[var(--text-primary)]">
                      Password
                    </label>
                    <div className="relative">
                      <Lock className="pointer-events-none absolute left-3.5 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-[var(--text-tertiary)]" />
                      <input
                        id="password"
                        type={showPassword ? 'text' : 'password'}
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                        placeholder="••••••••••••"
                        className="w-full rounded-xl border border-[var(--border-medium)] bg-[var(--bg-primary)] py-3 pl-10 pr-11 text-[15px] text-[var(--text-primary)] placeholder:text-[var(--text-tertiary)] outline-none transition-all focus:border-[var(--color-primary-600)] focus:ring-2 focus:ring-[var(--color-primary-100)] focus:ring-offset-1 focus:ring-offset-[var(--bg-primary)]"
                      />
                      <button
                        type="button"
                        onClick={() => setShowPassword(!showPassword)}
                        className="absolute right-3.5 top-1/2 -translate-y-1/2 text-[var(--text-tertiary)] transition-colors hover:text-[var(--text-primary)]"
                        aria-label={showPassword ? 'Hide password' : 'Show password'}
                      >
                        {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                      </button>
                    </div>
                  </div>

                  {/* Submit Button */}
                  <button
                    type="submit"
                    disabled={isLoading}
                    className="mt-2 inline-flex w-full items-center justify-center gap-2 rounded-xl bg-[var(--color-primary-600)] py-3 px-5 text-sm font-semibold text-[var(--text-inverse)] shadow-sm transition-colors hover:bg-[var(--color-primary-700)] disabled:cursor-not-allowed disabled:opacity-70"
                  >
                    {isLoading ? (
                      <>
                        <Loader2 className="h-4 w-4 animate-spin" />
                        Authenticating…
                      </>
                    ) : (
                      <>
                        Access SEO Dashboard
                        <ArrowRight className="h-4 w-4" />
                      </>
                    )}
                  </button>
                </form>

                {/* Footer Note */}
                <div className="mt-6 border-t border-[var(--border-light)] pt-4 text-center">
                  <p className="[font-family:var(--font-mono)] text-[11px] uppercase tracking-wider text-[var(--text-tertiary)]">
                    🔒 Restricted access system
                  </p>
                </div>
              </div>

              {/* floating checkmark card, bottom-left, overlapping the card edge */}
              <div className="pointer-events-none absolute -bottom-6 left-4 z-20 hidden -rotate-6 sm:flex">
                <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-[var(--bg-primary)] shadow-[0_15px_35px_-8px_rgba(15,23,42,0.25)]">
                  <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-[var(--color-primary-600)]">
                    <CheckCircle2 className="h-5 w-5 text-white" />
                  </div>
                </div>
              </div>

              {/* pointer bubble, bottom-right, aimed at the submit button */}
              <div className="pointer-events-none absolute -bottom-5 right-3 z-20 hidden rotate-6 sm:flex">
                <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-[var(--color-success-100,#DCFCE7)] shadow-[0_15px_30px_-10px_rgba(15,23,42,0.2)]">
                  <svg viewBox="0 0 60 60" className="h-7 w-7" fill="none">
                    <path d="M12 42 C 20 46, 26 20, 46 14" stroke="var(--color-primary-600)" strokeWidth="3.5" strokeLinecap="round" />
                    <path
                      d="M35 11 L47 14 L43 26"
                      stroke="var(--color-primary-600)"
                      strokeWidth="3.5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </div>
              </div>
            </div>

            {/* Back to site */}
            <p className="mt-10 text-center text-sm text-[var(--text-secondary)]">
              Not an admin?{' '}
              <Link href="/" className="font-medium text-[var(--color-primary-600)] hover:underline">
                Back to homepage
              </Link>
            </p>
          </div>
        </main>
      </div>
    </div>
  );
}
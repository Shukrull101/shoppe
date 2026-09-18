export default function NotFound() {
  return (
    <div className="flex min-h-screen flex-col bg-white text-neutral-900">
      <header className="px-5 pt-6 sm:px-8 lg:px-16">
        <div className="mx-auto flex max-w-7xl items-center justify-between border-b border-neutral-200 pb-5">
          
          <a
            href="/"
            className="text-2xl font-semibold tracking-[-0.08em]"
          >
            SHOPPE
          </a>

          <nav className="hidden items-center gap-8 text-sm md:flex">
            <a href="/" className="hover:text-neutral-500">
              Shop
            </a>
            <a href="#" className="hover:text-neutral-500">
              Blog
            </a>
            <a href="/about" className="hover:text-neutral-500">
              Our Story
            </a>

            <span className="h-5 w-px bg-neutral-300" />

            <span className="text-lg">⌕</span>
            <span className="text-lg">🛒</span>
            <span className="text-lg">♙</span>
          </nav>

          <button className="text-xl md:hidden">
            ☰
          </button>
        </div>
      </header>

      <main className="flex flex-1 items-center justify-center px-5">
        <div className="w-full max-w-xl py-24 text-center">
          <p className="mb-4 text-xs uppercase tracking-[0.3em] text-neutral-400">
            Page not found
          </p>

          <h1 className="text-5xl font-medium tracking-tight sm:text-6xl">
            404 ERROR
          </h1>

          <p className="mx-auto mt-6 max-w-sm text-sm leading-6 text-neutral-500 sm:text-base">
            This page not found,
            <br />
            back to home and start again
          </p>

          <a
            href="/"
            className="mt-9 inline-flex min-w-36 items-center justify-center border border-neutral-900 px-7 py-3 text-xs font-medium uppercase tracking-wide transition hover:bg-neutral-900 hover:text-white"
          >
            Homepage
          </a>
        </div>
      </main>

      <footer className="px-5 pb-8 sm:px-8 lg:px-16">
        <div className="mx-auto max-w-7xl border-t border-neutral-200 pt-8">
          <div className="flex flex-col gap-8 lg:flex-row lg:items-start lg:justify-between">
            
            <div className="flex flex-wrap gap-x-8 gap-y-3 text-xs text-neutral-600">
              <a href="#" className="hover:text-black">
                CONTACT
              </a>
              <a href="#" className="hover:text-black">
                TERMS OF SERVICES
              </a>
              <a href="#" className="hover:text-black">
                SHIPPING AND RETURNS
              </a>
            </div>

            <div className="w-full max-w-md">
              <div className="flex border-b border-neutral-500 pb-3">
                <input
                  type="email"
                  placeholder="Give an email, get the newsletter."
                  className="w-full bg-transparent text-sm outline-none placeholder:text-neutral-500"
                />

                <button className="text-xl">
                  →
                </button>
              </div>
            </div>
          </div>

          <div className="mt-9 flex flex-col gap-5 sm:flex-row sm:justify-between">
            <p className="text-xs text-neutral-500">
              © 2021 Shelly. Terms of use and privacy policy.
            </p>

            <div className="flex gap-5 text-sm text-neutral-500">
              <a href="#">in</a>
              <a href="#">f</a>
              <a href="#">◎</a>
              <a href="#">♥</a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
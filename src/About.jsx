import SubFooter from "./SubFooter";

export default function About() {
  return (
    <div className="min-h-screen bg-white text-neutral-900">
      <header className="px-5 pt-6 sm:px-8 lg:px-16">
        <div className="mx-auto flex max-w-7xl items-center justify-between border-b border-neutral-200 pb-5">
          
          <a
            href="/"
            className="text-2xl font-semibold tracking-[-0.08em]"
          >
            SHOPPE
          </a>

          <nav className="hidden items-center gap-8 text-sm md:flex">
            <a href="#" className="transition hover:text-neutral-500">
              Shop
            </a>
            <a href="#" className="transition hover:text-neutral-500">
              Blog
            </a>
            <a href="#" className="transition hover:text-neutral-500">
              Our Story
            </a>

            <span className="h-5 w-px bg-neutral-300" />

            <button type="button" aria-label="Search">
              <svg
                width="19"
                height="19"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.5"
              >
                <circle cx="11" cy="11" r="6.5" />
                <path d="m16 16 5 5" />
              </svg>
            </button>

            <button type="button" aria-label="Cart">
              <svg
                width="20"
                height="20"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.5"
              >
                <path d="M4 5h2l1.5 10h10L20 8H7" />
                <circle cx="9" cy="19" r="1" />
                <circle cx="17" cy="19" r="1" />
              </svg>
            </button>

            <button type="button" aria-label="Account">
              <svg
                width="19"
                height="19"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.5"
              >
                <circle cx="12" cy="8" r="3.5" />
                <path d="M5 20c.8-3.4 3.2-5 7-5s6.2 1.6 7 5" />
              </svg>
            </button>
          </nav>

          <button className="md:hidden" aria-label="Menu">
            <svg
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.5"
            >
              <path d="M4 7h16M4 12h16M4 17h16" />
            </svg>
          </button>
        </div>
      </header>

      <main className="px-5 sm:px-8 lg:px-16">
        <div className="mx-auto max-w-3xl py-20 sm:py-24">
          
          <div className="mb-14 text-center">
            <h1 className="text-3xl font-medium tracking-tight sm:text-4xl">
              About
            </h1>

            <p className="mt-5 text-base text-neutral-700">
              Who we are and why we do what we do!
            </p>
          </div>

          <p className="text-sm leading-7 text-neutral-600 sm:text-base">
            Duis rutrum dictum libero quis rutrum. Etiam sed neque aliquam,
            sollicitudin ante a, gravida arcu. Nam fringilla molestie velit,
            eget pellentesque risus scelerisque a. Nam ac urna maximus,
            tempor magna et, placerat urna. Curabitur eu magna enim. Proin
            placerat tortor lacus, ac sodales lectus placerat quis.
          </p>

          <section className="mt-12">
            <h2 className="mb-5 text-xl font-medium">
              Top trends
            </h2>

            <div className="overflow-hidden rounded-xl bg-neutral-100">
              <img
                src="/assets/top-trends.jpg"
                alt="Top trends"
                className="h-[260px] w-full object-cover transition duration-500 hover:scale-[1.02] sm:h-[360px]"
              />
            </div>

            <div className="mt-7">  
                <p className="text-sm leading-7 text-neutral-600 sm:text-base">
                Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                Aliquam placerat, augue a volutpat hendrerit, sapien tortor
                faucibus augue, a maximus elit ex vitae libero. Sed quis
                mauris eget arcu facilisis consequat sed eu felis.
              </p>

              <ul className="mt-5 space-y-3 text-sm text-neutral-700">
                <li>• Consectetur adipiscing elit. Aliquam placerat.</li>
                <li>• Lorem ipsum dolor sit amet consectetur.</li>
              </ul>
            </div>
          </section>

          <section className="mt-14">
            <h2 className="mb-5 text-xl font-medium">
              Produced with care
            </h2>

            <div className="overflow-hidden rounded-xl bg-neutral-100">
              <img
                src="/assets/produced-with-care.jpg"
                alt="Produced with care"
                className="h-[260px] w-full object-cover transition duration-500 hover:scale-[1.02] sm:h-[360px]"
              />
            </div>

            <p className="mt-7 text-sm leading-7 text-neutral-600 sm:text-base">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit.
              Aliquam placerat, augue a volutpat hendrerit, sapien tortor
              faucibus augue, a maximus elit ex vitae libero. Sed quis
              mauris eget arcu facilisis consequat sed eu felis. Nunc sed
              porta augue. Morbi porta tempor odio, in molestie diam bibendum.
            </p>
          </section>
        </div>
      </main>

      <SubFooter />
    </div>
  );
}
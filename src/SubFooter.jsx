const images = [
  "/assets/instagram-1.jpg",
  "/assets/instagram-2.jpg",
  "/assets/instagram-3.jpg",
  "/assets/instagram-4.jpg",
];

export default function SubFooter() {
  return (
    <section className="w-full bg-white px-5 py-16 sm:px-8 lg:px-16">
      <div className="mx-auto max-w-7xl">
        <h2 className="mb-10 text-2xl font-medium tracking-tight text-neutral-900">
          Follow us on instagram
        </h2>

        <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-5">
          {images.map((image, index) => (
            <div
              key={index}
              className="group aspect-square overflow-hidden rounded-xl bg-neutral-100"
            >
              <img
                src={image}
                alt={`Instagram ${index + 1}`}
                className="h-full w-full object-cover transition duration-500 group-hover:scale-105"
              />
            </div>
          ))}
        </div>

        <div className="mt-14 border-t border-neutral-200 pt-8">
          <div className="flex flex-col gap-8 lg:flex-row lg:items-start lg:justify-between">
            
            <div className="flex flex-wrap gap-x-8 gap-y-3 text-sm text-neutral-600">
              <a href="#" className="transition hover:text-black">
                CONTACT
              </a>
              <a href="#" className="transition hover:text-black">
                TERMS OF SERVICES
              </a>
              <a href="#" className="transition hover:text-black">
                SHIPPING AND RETURNS
              </a>
            </div>

            <div className="w-full max-w-md">
              <div className="flex items-center border-b border-neutral-500 pb-3">
                <input
                  type="email"
                  placeholder="Give an email, get the newsletter."
                  className="w-full bg-transparent text-sm outline-none placeholder:text-neutral-500"
                />

                <button
                  type="button"
                  className="ml-4 text-xl transition-transform hover:translate-x-1"
                >
                  →
                </button>
              </div>
            </div>
          </div>

          <div className="mt-10 flex flex-col gap-6 sm:flex-row sm:items-center sm:justify-between">
            <p className="text-sm text-neutral-500">
              © 2021 Shelly. Terms of use and privacy policy.
            </p>

            <div className="flex items-center gap-5 text-sm text-neutral-500">
              <a href="#" className="transition hover:text-black">in</a>
              <a href="#" className="transition hover:text-black">f</a>
              <a href="#" className="transition hover:text-black">◎</a>
              <a href="#" className="transition hover:text-black">♥</a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
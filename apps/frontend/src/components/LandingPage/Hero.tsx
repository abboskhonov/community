// src/components/Hero.tsx
export default function Hero() {
  return (
    <section class="text-center py-20 bg-gradient-to-b from-white to-blue-50">
      <h1 class="text-4xl md:text-5xl font-bold text-gray-800">
        Build Your Smart Profile with <span class="text-blue-600">Cardly</span>
      </h1>
      <p class="mt-4 text-gray-600 max-w-xl mx-auto">
        Create a beautiful page with links, bio, and more — all in one place.
      </p>
      <div class="mt-6">
        <a
          href="/register"
          class="bg-blue-600 text-white px-6 py-3 rounded-xl hover:bg-blue-700 transition"
        >
          Get Started
        </a>
      </div>
    </section>
  )
}

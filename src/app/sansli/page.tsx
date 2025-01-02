import Link from "next/link";

export default function SansliPage() {
  return (
    <main className="min-h-screen p-4 sm:p-8 max-w-4xl mx-auto flex flex-col items-center justify-center">
      <h1 className="text-xl sm:text-2xl md:text-3xl font-bold mb-6 sm:mb-8 text-center font-serif text-[#d4b895] px-4">
        şanslı değilsin
      </h1>
      <Link
        href="/"
        className="text-[#d4b895] hover:text-[#e8d8c3] font-serif italic text-sm sm:text-base">
        ← Ana Sayfaya Dön
      </Link>
    </main>
  );
}

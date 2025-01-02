import BlogList from "@/components/BlogList";
import { getSortedPostsData } from "../lib/posts";
import Link from "next/link";

export default async function Home() {
  const posts = await getSortedPostsData();

  return (
    <main className="min-h-screen p-4 sm:p-8 max-w-4xl mx-auto relative">
      <div className="absolute top-2 right-2 sm:top-4 sm:right-4 z-10">
        <Link
          href="/sansli"
          className="inline-block px-2 py-1 sm:px-3 sm:py-1 text-xs sm:text-sm text-[#d4b895] hover:text-[#e8d8c3] font-serif italic transition-colors">
          Kendimi Şanslı Hissediyorum
        </Link>
      </div>
      <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-8 sm:mb-12 text-center font-serif text-[#d4b895] mt-8 sm:mt-0">
        Onur'un Blogu
      </h1>
      <BlogList posts={posts} />
    </main>
  );
}

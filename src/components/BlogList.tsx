"use client";

import { useState, useMemo } from "react";
import Link from "next/link";
import { PostData } from "@/lib/posts";
import { formatDate } from "@/lib/utils";

export default function BlogList({ posts }: { posts: PostData[] }) {
  const [searchTerm, setSearchTerm] = useState("");

  const filteredPosts = useMemo(() => {
    return posts.filter((post) => {
      const searchContent =
        `${post.title} ${post.content} ${post.excerpt}`.toLowerCase();
      const searchTerms = searchTerm.toLowerCase().split(" ");
      return searchTerms.every((term) => searchContent.includes(term));
    });
  }, [posts, searchTerm]);

  return (
    <>
      {/* Arama çubuğu */}
      <div className="mb-8 sm:mb-12">
        <input
          type="text"
          placeholder="Blog yazılarında ara..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="w-full p-3 sm:p-4 rounded-lg bg-[#2c2722] border-2 border-[#483c32] text-[#e8d8c3] placeholder-[#a89985] focus:outline-none focus:border-[#d4b895] transition-colors text-sm sm:text-base"
        />
        <div className="mt-2 text-[#a89985] text-xs sm:text-sm italic">
          {searchTerm && `${filteredPosts.length} sonuç bulundu`}
        </div>
      </div>

      <div className="space-y-10 sm:space-y-12">
        {filteredPosts.map((post) => (
          <article
            key={post.id}
            className="border border-[#483c32] rounded-lg p-6 sm:p-8 hover:shadow-xl transition-all duration-300 bg-[#2c2722]/50">
            <div className="text-[#a89985] mb-2 sm:mb-3 italic text-xs sm:text-sm font-serif">
              {formatDate(post.date)}
            </div>
            <Link href={`/posts/${post.id}`}>
              <h2 className="text-lg sm:text-xl md:text-2xl font-bold mb-3 sm:mb-4 text-[#d4b895] hover:text-[#e8d8c3] transition-colors font-serif leading-relaxed">
                {post.title}
              </h2>
            </Link>
            <p className="text-[#e8d8c3] leading-relaxed text-sm sm:text-base mb-5 font-serif">
              {post.excerpt}
            </p>
            <div className="border-t border-[#483c32] pt-4">
              <Link
                href={`/posts/${post.id}`}
                className="inline-block text-[#d4b895] hover:text-[#e8d8c3] transition-colors font-serif italic text-xs sm:text-sm">
                Devamını Oku →
              </Link>
            </div>
          </article>
        ))}
        {searchTerm && filteredPosts.length === 0 && (
          <div className="text-center text-[#a89985] italic text-sm sm:text-base font-serif">
            Aramanızla eşleşen yazı bulunamadı.
          </div>
        )}
      </div>
    </>
  );
}

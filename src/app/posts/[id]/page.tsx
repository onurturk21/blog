import { getPostData, getAllPostIds } from "@/lib/posts";
import { formatDate } from "@/lib/utils";
import Link from "next/link";

export async function generateStaticParams() {
  const paths = getAllPostIds();
  return paths;
}

export default async function Post({ params }: { params: { id: string } }) {
  const post = await getPostData(params.id);

  return (
    <main className="min-h-screen py-12 px-8 max-w-4xl mx-auto">
      <Link
        href="/"
        className="text-[#d4b895] hover:text-[#e8d8c3] mb-12 inline-block font-serif italic">
        ← Ana Sayfaya Dön
      </Link>

      <article className="prose prose-lg max-w-none p-8 rounded-lg border-2 border-[#483c32] shadow-md">
        <h1 className="text-5xl font-bold mb-6">{post.title}</h1>
        <div className="text-[#a89985] mb-8 italic font-serif">
          {formatDate(post.date)}
        </div>
        <div
          className="leading-relaxed prose-headings:text-[#d4b895] prose-p:text-[#e8d8c3] prose-a:text-[#d4b895] prose-a:hover:text-[#e8d8c3]"
          dangerouslySetInnerHTML={{ __html: post.contentHtml || "" }}
        />
      </article>
    </main>
  );
}

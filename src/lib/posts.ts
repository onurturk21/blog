import { readFileSync, readdirSync } from "fs";
import { join } from "path";
import matter from "gray-matter";
import { remark } from "remark";
import html from "remark-html";
import remarkGfm from "remark-gfm";

const postsDirectory = join(process.cwd(), "src/_posts");

export interface PostData {
  id: string;
  title: string;
  date: string;
  content: string;
  contentHtml?: string;
  excerpt: string;
}

export function getSortedPostsData(): PostData[] {
  // Get file names under /posts
  const fileNames = readdirSync(postsDirectory);
  const allPostsData = fileNames
    .map((fileName) => {
      try {
        // Remove ".md" from file name to get id
        const id = fileName.replace(/\.md$/, "");

        // Read markdown file as string
        const fullPath = join(postsDirectory, fileName);
        const fileContents = readFileSync(fullPath, "utf8");

        if (!fileContents.trim()) {
          return null; // Skip empty files
        }

        // Use gray-matter to parse the post metadata section
        const matterResult = matter(fileContents);

        if (!matterResult.data.title || !matterResult.data.date) {
          return null; // Skip files without required metadata
        }

        // Create excerpt from content (first 150 characters)
        const excerpt = matterResult.content.substring(0, 150) + "...";

        // Combine the data with the id
        return {
          id,
          excerpt,
          content: matterResult.content,
          ...(matterResult.data as { date: string; title: string }),
        };
      } catch (error) {
        console.error(`Error processing ${fileName}:`, error);
        return null;
      }
    })
    .filter((post): post is PostData => post !== null); // Remove null entries

  // Sort posts by date
  return allPostsData.sort((a, b) => {
    if (a.date < b.date) {
      return 1;
    } else {
      return -1;
    }
  });
}

export async function getPostData(id: string): Promise<PostData> {
  try {
    const fullPath = join(postsDirectory, `${id}.md`);
    const fileContents = readFileSync(fullPath, "utf8");

    if (!fileContents.trim()) {
      throw new Error("File is empty");
    }

    // Use gray-matter to parse the post metadata section
    const matterResult = matter(fileContents);

    if (!matterResult.data.title || !matterResult.data.date) {
      throw new Error("Required metadata missing");
    }

    // Use remark to convert markdown into HTML string
    const processedContent = await remark()
      .use(remarkGfm)
      .use(html, { sanitize: false })
      .process(matterResult.content);
    const contentHtml = processedContent.toString();

    // Create excerpt from content (first 150 characters)
    const excerpt = matterResult.content.substring(0, 150) + "...";

    // Combine the data with the id
    return {
      id,
      contentHtml,
      excerpt,
      content: matterResult.content,
      ...(matterResult.data as { date: string; title: string }),
    };
  } catch (error: any) {
    throw new Error(`Failed to load post ${id}: ${error.message}`);
  }
}

export function getAllPostIds() {
  try {
    const fileNames = readdirSync(postsDirectory);
    return fileNames
      .map((fileName) => {
        try {
          const fullPath = join(postsDirectory, fileName);
          const fileContents = readFileSync(fullPath, "utf8");

          if (!fileContents.trim()) {
            return null;
          }

          const matterResult = matter(fileContents);
          if (!matterResult.data.title || !matterResult.data.date) {
            return null;
          }

          return {
            params: {
              id: fileName.replace(/\.md$/, ""),
            },
          };
        } catch (error) {
          console.error(`Error processing ${fileName}:`, error);
          return null;
        }
      })
      .filter((params) => params !== null);
  } catch (error) {
    console.error("Error reading posts directory:", error);
    return [];
  }
}

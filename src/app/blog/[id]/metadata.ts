// app/blog/[id]/metadata.ts
import { Metadata } from "next";
import { client } from "@/sanity/lib/client";

type Props = {
  params: {
    id: string;
  };
};

// Server-side logic for generating metadata
export async function generateMetadata({
  params,
}: Props): Promise<Metadata> {
  const query = `*[_type == "blog" && _id == $id][0] {
    title,
    "image": image.asset->url
  }`;

  const post = await client.fetch(query, { id: params.id });

  return {
    title: post?.title || "Blog Post",
    description: post?.title
      ? `Read the latest article: ${post?.title}`
      : "Discover insightful blogs and articles on FutureForge.",
    openGraph: {
      title: post?.title,
      description: `Read the latest article: ${post?.title}`,
      url: `/blog/${params.id}`,
      images: post?.image
        ? [
            {
              url: post?.image,
              alt: post?.title,
            },
          ]
        : undefined, // Ensure images are only added if available
    },
  };
}
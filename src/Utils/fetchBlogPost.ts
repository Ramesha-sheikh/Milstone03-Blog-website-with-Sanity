// utils/fetchBlogPost.ts
import { client } from "@/sanity/lib/client";

export async function fetchBlogPost(id: string) {
  const query = `*[_type == "blog" && _id == $id] {
    title,
    _id,
    date,
    "image": image.asset->url,
    content,
    name,
    "comments": *[_type == "comment" && blog._ref == ^._id] | order(_createdAt desc) {
      name,
      email,
      comment,
      _createdAt,
      _id
    }
  }`;
  return await client.fetch(query, { id });
}
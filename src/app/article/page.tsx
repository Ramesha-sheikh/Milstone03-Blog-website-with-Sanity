
import Link from "next/link";
import { MoveRight } from "lucide-react";
import { Metadata } from "next";

import Image from "next/image";
// import { Card } from "../../components/ui/Cards";
import { Card } from '../../components/ui/card';
import BlogAnimation from "../../components/animations/BlogAnimation";
import { client } from "../../sanity/lib/client";

interface Post {
  id: string;
  title: string;
  date: string;
  image: string;
  content: string;
  name: string;
}

export const metadata: Metadata = {
  title: "FutureForge | Blog",
};

export default async function Blog() {
  // Fetch posts from Sanity CMS
  const posts: Post[] = await client.fetch(
    `*[_type == "blog"]{
      id,
      title,
      date,
      "image": image.asset->url,
      content,
      name
    }`
  );

  return (
    <>
      <div className="pt-20 w-full bg-slate-100">
        <div className="max-w-screen-xl mx-auto py-10 md:px-2 px-6">
          <h1 className="text-center text-5xl font-semibold">
            Our Latest Blog
          </h1>
          <div className="grid md:grid-cols-3 sm:grid-cols-2 grid-cols-1 gap-8 cursor-pointer pt-10">
            {posts.map((post, index) => (
              <BlogAnimation key={index}>
                <Card className="hover:scale-105 h-[600px] duration-200 pb-3 rounded-2xl shadow-lg">
                  <Image
                    src={post.image}
                    alt={post.title}
                    height={400}
                    loading="lazy"
                    width={400}
                    className="w-full h-[65%] mb-4 rounded-t-2xl"
                  />
                  <p className="m-4 text-slate-500">
                    <span>{new Date(post.date).toLocaleString('default', { month: 'long' })}</span>{" "}
                    <span>{new Date(post.date).getDate()}, {new Date(post.date).getFullYear()}</span>
                  </p>
                  <h1 className="m-4 text-2xl font-semibold">{post.title}</h1>
                  <Link
                    href={`/blog/${post.id}`}
                    className="flex items-center gap-1"
                  >
                    <p className="ml-4 text-blue-500 hover:text-blue-700 text-xl">
                      Read More
                    </p>
                    <MoveRight className="text-blue-500" />
                  </Link>
                </Card>
              </BlogAnimation>
            ))}
          </div>
        </div>
      </div>
    </>
  );
}
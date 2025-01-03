"use client"
import { useState, useEffect } from "react";
import { client } from "../sanity/lib/client"; // Sanity client
import Image from "next/image";
// import { Card } from "../components/ui/Cards";
import { Card } from "@/components/ui/card";
import Link from "next/link";
import { MoveRight, CalendarDays } from "lucide-react";
import { motion } from "framer-motion";

interface Post {
  _id: string;
  title: string;
  date: string;
  image: string;
  content: string;
  name: string;
}

export default function LatestArticles() {
  const [posts, setPosts] = useState<Post[]>([]);

  useEffect(() => {
    // Fetch the latest posts from Sanity CMS
    const fetchPosts = async () => {
      const res: Post[] = await client.fetch(
        `*[_type == "blog"] | order(date desc) {
          _id,
          title,
          date,
          "image": image.asset->url,
          content,
          name
        }`
      );
      setPosts(res.slice(0, 6)); // Update state with the first 6 posts
    };

    fetchPosts();
  }, []); // Empty dependency array means this effect runs only once on mount

  return (
    <section className="pt-32 static">
      <div className="max-w-screen-xl mx-auto lg:px-4 px-7">
        <motion.h1
          initial={{ opacity: 0.3, x: -20 }}
          whileInView={{ opacity: 1, x: 1 }}
          transition={{ duration: 2, delay: 0.2 }}
          exit={{ opacity: 0, x: -20 }}
          className="text-3xl font-semibold my-6"
        >
          Latest Articles
        </motion.h1>
        <div className="grid xl:grid-cols-3 md:grid-cols-2 grid-cols-1 gap-8 cursor-pointer">
          {posts.map((post, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0.5, y: -20 }}
              whileInView={{ opacity: 1, y: 1 }}
              transition={{ duration: 1, delay: 0.2 }}
              exit={{ opacity: 1, y: -20 }}
            >
              <Card
                className="hover:scale-105 h-[600px] duration-300 transition-transform pb-3 rounded-2xl shadow-lg my-4"
              >
                <Image
                  src={post.image}
                  alt={post.title}
                  loading="lazy"
                  height={400}
                  width={400}
                  className="w-full h-[65%] mb-4 rounded-t-2xl"
                />
                <div className="m-4 flex gap-2">
                  <CalendarDays className="w-5" />
                  <span className="font-light">{post.date}</span>
                </div>
                <h1 className="m-4 text-2xl font-semibold">{post.title}</h1>
                <Link href={`/blog/${post._id}`} className="flex items-center gap-1">
                  <p className="ml-4 text-blue-500 hover:text-blue-700 text-xl">
                    Read More
                  </p>
                  <MoveRight className="text-blue-500" />
                </Link>
              </Card>
            </motion.div>
          ))}
        </div>
        <div className="flex justify-center py-8">
          <Link href="/article">
            <button className="bg-zinc-800 hover:bg-zinc-950 text-zinc-50 px-7 py-2 rounded-full">
              View More
            </button>
          </Link>
        </div>
      </div>
    </section>
  );
}
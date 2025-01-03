"use client"
import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { MoveRight, CalendarDays } from "lucide-react";
import { motion } from "framer-motion";
import { client } from "../sanity/lib/client";

interface Post {
  _id: string;
  title: string;
  date: string;
  image: string;
  content: string;
  name: string;
}

export default function PopularArticles() {
  const [posts, setPosts] = useState<Post[]>([]);

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const res: Post[] = await client.fetch(
          `*[_type == "blog"]{
            _id,
            title,
            date,
            "image": image.asset->url,
            content,
            name
          }`
        );
        setPosts(res);
      } catch (error) {
        console.error("Error fetching posts:", error);
      }
    };

    fetchPosts();
  }, []);

  return (
    <section className="pt-16" id="popular-articles">
      <div className="max-w-screen-xl mx-auto">
        <motion.h1
          initial={{ opacity: 0, y: -20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          exit={{ opacity: 0, y: -20 }}
          className="text-4xl font-semibold mb-10 ml-8"
        >
          Popular Articles
        </motion.h1>

        <div className="flex gap-x-8 gap-y-12 flex-col xl:flex-row px-7">
          {/* First Featured Post */}
          {posts.length > 0 && (
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 1, delay: 0.1 }}
              exit={{ opacity: 0, x: -20 }}
              className="flex flex-col xl:max-w-xl"
            >
              <Link href={`/blog/${posts[0]._id}`} className="">
                <Image
                  src={posts[0].image}
                  alt={`Image for ${posts[0].title}`}
                  height={400}
                  loading="lazy"
                  width={400}
                  className="w-full md:h-[70%] object-cover object-center rounded-md"
                />
                <p className="my-4 text-slate-500">
                  <span>December</span> <span>{posts[0].date}</span>
                </p>
                <motion.h1
                  initial={{ opacity: 0, x: -10 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.6, delay: 0.1 }}
                  exit={{ opacity: 0, x: -20 }}
                  className="text-3xl font-semibold mb-4"
                >
                  {posts[0].title}
                </motion.h1>
                <p>{posts[0].content}</p>
              </Link>
            </motion.div>
          )}

          {/* Additional Posts */}
          <div className="flex flex-col sm:gap-4 gap-12">
            {posts.slice(1, 4).map((post, index) => (
              <motion.div
                initial={{ opacity: 0, y: -20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 1, delay: 0.2 }}
                exit={{ opacity: 0, y: 20 }}
                className="flex sm:flex-row items-center sm:items-start flex-col gap-3"
                key={index}
              >
                <Image
                  src={post.image}
                  alt={`Image for ${post.title}`}
                  height={250}
                  width={250}
                  loading="lazy"
                  className="rounded-md cursor-pointer"
                />
                <div className="flex flex-col text-center sm:text-start items-center sm:items-start">
                  <div className="mb-4 flex gap-2">
                    <CalendarDays className="w-5" />
                    <span className="font-light">{post.date}</span>
                  </div>
                  <h1 className="text-2xl font-semibold">{post.title}</h1>
                  <Link
                    href={`/blog/${post._id}`}
                    className="flex items-center gap-x-1 cursor-pointer"
                  >
                    <p className="mt-4 text-blue-500 hover:text-blue-700 text-xl">
                      Read More
                    </p>
                    <MoveRight className="text-blue-500 mt-4" />
                  </Link>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
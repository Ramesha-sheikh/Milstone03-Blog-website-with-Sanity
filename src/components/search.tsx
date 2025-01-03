"use client";
import { client } from "../sanity/lib/client";
import { Search } from "lucide-react";
import Link from "next/link";
import { useEffect, useState } from "react";

type PropType = {
  searchValue: string;
};

interface Post {
  _id: string;
  title: string;
  date: string;
  image: string;
  content: string;
  name: string;
}

export default function SearchResult({ searchValue }: PropType) {
  const [results, setResults] = useState<Post[]>([]);
  const [allPosts, setAllPosts] = useState<Post[]>([]);

  useEffect(() => {
    // Fetch blog data
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
        setAllPosts(res);
      } catch (error) {
        console.error("Error fetching posts:", error);
      }
    };

    fetchPosts();
  }, []);

  useEffect(() => {
    if (searchValue) {
      const filteredPosts = allPosts.filter((post) =>
        post.title.toLowerCase().includes(searchValue.toLowerCase())
      );
      setResults(filteredPosts);
    } else {
      setResults([]);
    }
  }, [searchValue, allPosts]);

  return (
    <div className="bg-white w-full mt-2 rounded-lg shadow-md">
      {searchValue && (
        <div className="flex flex-col">
          {results.length > 0 ? (
            results.map((result, index) => (
              <Link
                key={index}
                href={`/blog/${result._id}`}
                className="my-2 text-zinc-950 px-2 sm:px-4 py-2 text-start hover:bg-zinc-100 cursor-pointer transition-colors"
              >
                <p className="flex gap-x-2 text-[80%] sm:text-[95%]">
                  <Search className="w-4 h-4" />
                  {result.title}
                </p>
              </Link>
            ))
          ) : (
            <p className="text-zinc-500 px-4 py-2">No results found.</p>
          )}
        </div>
      )}
    </div>
  );
}
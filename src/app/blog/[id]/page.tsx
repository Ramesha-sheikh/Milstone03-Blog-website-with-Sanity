"use client"
import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import Image from "next/image";
import { Clock4, User, CalendarDays } from "lucide-react";
import { Skeleton } from "../../../components/ui/skeleton";
import BlogAnimation from "../../../components/animations/BlogAnimation";
import { client } from "../../../sanity/lib/client";
import AddComment from "../../../components/AddComments";
import AllComments from "../../../components/AllCommantData";

// Type definitions for comments and post data
type Comment = {
  _id: string;
  name: string;
  email: string;
  comment: string;
  _createdAt: string;
};

type Post = {
  id: string;
  comments: Comment[];
  _id: string;
  title: string;
  date: string;
  image: string;
  content: string;
  name: string;
};

export default function AllBlog() {
  const { id } = useParams(); // Use useParams to access params

  const [post, setPost] = useState<Post | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null); // Error state

  useEffect(() => {
    if (!id) return; // Ensure that id exists before trying to fetch the post data

    const fetchPost = async () => {
      try {
        const query = `*[_type == "blog" && _id == $id] {
          title,
          _id,
          date,
          "image": image.asset->url,
          content,
          name,
          "comments": *[_type == "comment" && blog._ref == ^._id] | order(_createdAt desc) {
            _id,
            name,
            email,
            comment,
            _createdAt
          }
        }`;

        const res: Post[] = await client.fetch(query, { id });

        const selectedPost = res[0] || null;
        setPost(selectedPost);
        console.log(selectedPost?.comments); // Log the comments to check if they are fetched correctly
      } catch (error) {
        console.error("Error fetching post:", error);
        setError("An error occurred while fetching the post. Please try again later.");
      } finally {
        setLoading(false);
      }
    };

    fetchPost();
  }, [id]);

  if (loading) return <Skeleton />;

  if (error) {
    return <div>{error}</div>;
  }

  if (!post) {
    return <div>Post not found. Please check the URL or try again later.</div>;
  }

  return (
    <div className="pt-20 w-full">
      <div className="max-w-screen-md mx-auto py-20 px-10">
        <BlogAnimation>
          <h1 className="md:text-5xl sm:text-4xl text-2xl font-bold">{post.title}</h1>
          <div className="my-6 text-slate-600 flex flex-col sm:flex-row gap-6">
            <div className="flex gap-2">
              <User />
              <span>{post.name}</span>
            </div>
            <div className="flex gap-2">
              <CalendarDays />
              <span>{post.date}</span>
            </div>
            <div className="flex gap-2">
              <Clock4 />
              <span>2 min read</span>
            </div>
          </div>
        </BlogAnimation>

        <BlogAnimation>
          <Image
            src={post.image}
            alt={post.title}
            height={2000}
            loading="lazy"
            width={2000}
            objectFit="cover"
            objectPosition="center"
            className="w-full rounded-lg object-cover my-4"
          />
        </BlogAnimation>

        <BlogAnimation>
          <p className="text-2xl leading-relaxed py-10">{post.content}</p>
        </BlogAnimation>

        <BlogAnimation>
          <div className={richTextStyles}>
            <AddComment blogId={post?._id} />
            <AllComments comments={post?.comments || []} id={post?._id} commentsOrder="desc" />
          </div>
        </BlogAnimation>
      </div>
    </div>
  );
}

const richTextStyles = `
  mt-14
  text-justify
  max-w-2xl
  m-auto
  prose-headings:my-5
  prose-heading:text-2xl
  prose-p:mb-5
  prose-p:leading-7
  prose-li:list-disc
  prose-li:leading-7
  prose-li:ml-4
`;
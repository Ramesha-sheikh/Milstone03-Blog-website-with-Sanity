import { client } from "@/sanity/lib/client";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const data = await req.json();
    const { name, email, comment, blogId } = data;

    // Validation for required fields
    if (!name || !email || !comment || !blogId) {
      return NextResponse.json(
        {
          message: "All fields are required",
        },
        { status: 400 }
      );
    }

    // Create a new comment in Sanity
    const newComment = await client.create({
      _type: "comment",
      name,
      email,
      comment,
      blog: { // Correct field name (from 'post' to 'blog')
        _type: "reference",
        _ref: blogId,
      },
    });

    // Include necessary details in the response
    return NextResponse.json(
      {
        message: "Comment added successfully",
        comment: {
          _id: newComment._id, // Sanity's auto-generated ID
          name: newComment.name,
          email: newComment.email,
          comment: newComment.comment,
          _createdAt: newComment._createdAt, // Creation timestamp
        },
      },
      { status: 201 }
    );
  } catch (error) {
    console.error("Error creating comment:", error);

    return NextResponse.json(
      {
        message: "Failed to create a comment",
        error: (error as Error).message || "Internal Server Error",
      },
      { status: 500 }
    );
  }
}
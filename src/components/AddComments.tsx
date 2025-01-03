/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { useForm } from "react-hook-form";
import { useState, useTransition } from "react";

interface FormData {
  name: string;
  email: string;
  comment: string;
}

interface Props {
  blogId: string;
}

const AddComment = ({ blogId }: Props) => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<FormData>();
  const [serverError, setServerError] = useState<string | null>(null);
  const [isPending, startTransition] = useTransition();

  const onSubmit = async (data: FormData) => {
    setServerError(null);

    startTransition(async () => {
      try {
        const res = await fetch("/api/comment", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ ...data, blogId }),
        });

        if (!res.ok) {
          throw new Error("Failed to add comment");
        }

        reset();
      } catch (error: any) {
        setServerError(error.message || "Something went wrong");
      }
    });
  };

  return (
    <div className="mt-14">
      <p>
        Leave a comment <span role="img" aria-label="comment">💬</span>
      </p>
      <form
        className="flex flex-col border dark:border-purple-950 shadow-sm rounded px-8 pt-6 pb-6 mb-10"
        onSubmit={handleSubmit(onSubmit)}
      >
        <label htmlFor="name">Name</label>
        <input
          id="name"
          {...register("name", { required: true })}
          className="mb-4 py-1 bg-amber-100 dark:bg-slate-900"
        />
        {errors.name && (
          <p className="text-red-600 text-xs">Name is required.</p>
        )}

        <label htmlFor="email">
          Email{" "}
          <span className="text-xs">(Your email will not be published!)</span>
        </label>
        <input
          id="email"
          {...register("email", {
            required: true,
            pattern: /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/,
          })}
          className="mb-4 py-1 bg-amber-100 dark:bg-slate-900"
        />
        {errors.email && (
          <p className="text-red-600 text-xs">
            Please enter a valid email address.
          </p>
        )}

        <label htmlFor="comment">Comment</label>
        <textarea
          id="comment"
          {...register("comment", { required: true, minLength: 2 })}
          className="mb-4 py-1 bg-amber-100 dark:bg-slate-900"
        />
        {errors.comment && (
          <p className="text-red-600 text-xs">Minimum 2 characters.</p>
        )}

        {serverError && (
          <p className="text-red-600 text-xs mb-4">{serverError}</p>
        )}

        <button
          className={`cursor-pointer bg-purple-500 text-white rounded py-2 hover:bg-purple-600 ${
            isPending ? "opacity-50" : ""
          }`}
          disabled={isPending}
          type="submit"
        >
          {isPending ? "Submitting..." : "Submit"}
        </button>
      </form>
    </div>
  );
};

export default AddComment;
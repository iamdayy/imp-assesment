"use client";

import axios from "axios";
import { useSession } from "next-auth/react";
import Link from "next/link";
import { useParams, useRouter } from "next/navigation";
import { useEffect, useState } from "react";

interface Post {
  id: string;
  title: string;
  content: string;
  createdAt: string;
}

export default function ViewPostPage() {
  const router = useRouter();
  const params = useParams();
  const { id } = params as { id: string };

  const { status } = useSession({
    required: true,
    onUnauthenticated() {
      router.push("/login");
    },
  });

  const [post, setPost] = useState<Post | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    if (id) {
      axios
        .get(`/api/posts/${id}`)
        .then((res) => {
          setPost(res.data);
        })
        .catch((err) => {
          console.error(err);
          setError("Failed to fetch post details.");
        })
        .finally(() => {
          setIsLoading(false);
        });
    }
  }, [id]);

  if (status === "loading" || isLoading) {
    return (
      <div className="flex justify-center items-center h-[calc(100vh-64px)]">
        <span className="loading loading-spinner loading-lg"></span>
      </div>
    );
  }

  if (error) {
    return (
      <div className="container max-w-2xl p-4 mx-auto md:p-8">
        <div role="alert" className="alert alert-error">
          <span>{error}</span>
        </div>
        <Link href="/posts" className="mt-4 btn btn-ghost">
          Back to List
        </Link>
      </div>
    );
  }

  if (!post) return null;

  return (
    <div className="container max-w-2xl p-4 mx-auto md:p-8">
      <div className="overflow-hidden rounded-lg shadow-md bg-base-100">
        <div className="p-6">
          <h1 className="mb-4 text-3xl font-bold">{post.title}</h1>
          <p className="mb-6 text-sm text-gray-500">
            Published on {new Date(post.createdAt).toLocaleDateString()}
          </p>

          {/* Konten Post */}
          <div className="prose max-w-none">
            {/* Ubah \n menjadi <br> untuk line break */}
            {post.content.split("\n").map((line, index) => (
              <p key={index}>{line}</p>
            ))}
          </div>

          {/* Tombol Aksi */}
          <div className="flex items-center gap-4 pt-4 mt-8 border-t">
            <Link href={`/posts/${post.id}/edit`} className="btn btn-warning">
              Edit Post
            </Link>
            <Link href="/posts" className="btn btn-ghost">
              Back to List
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

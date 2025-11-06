"use client";

import axios from "axios";
import { useSession } from "next-auth/react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function CreatePostPage() {
  const router = useRouter();
  const { status } = useSession({
    // Opsi ini akan mengarahkan ke /login jika tidak terautentikasi
    required: true,
    onUnauthenticated() {
      router.push("/login");
    },
  });

  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setIsLoading(true);

    try {
      // Kirim data ke API
      await axios.post("/api/posts", { title, content });

      // Redirect kembali ke halaman daftar post setelah sukses
      router.push("/posts");
      router.refresh(); // Memaksa refresh data di halaman /posts
    } catch (err) {
      console.error(err);
      setError("Failed to create post. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  // Tampilkan loading spinner selagi sesi dicek
  if (status === "loading") {
    return (
      <div className="flex justify-center items-center h-[calc(100vh-64px)]">
        <span className="loading loading-spinner loading-lg"></span>
      </div>
    );
  }

  return (
    <div className="container max-w-2xl p-4 mx-auto md:p-8">
      <h1 className="mb-6 text-3xl font-bold">Create New Post</h1>

      <div className="p-6 rounded-lg shadow-md bg-base-100">
        <form onSubmit={handleSubmit}>
          {error && (
            <div role="alert" className="mb-4 alert alert-error">
              <span>{error}</span>
            </div>
          )}

          {/* Title */}
          <div className="w-full mb-4 form-control">
            <label className="label">
              <span className="label-text">Title</span>
            </label>
            <input
              type="text"
              placeholder="Post Title"
              className="w-full input input-bordered"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              required
            />
          </div>

          {/* Content */}
          <div className="w-full mb-4 form-control">
            <label className="label">
              <span className="label-text">Content</span>
            </label>
            <textarea
              className="h-48 textarea textarea-bordered"
              placeholder="Post content..."
              value={content}
              onChange={(e) => setContent(e.target.value)}
              required
            ></textarea>
          </div>

          {/* Tombol Aksi */}
          <div className="flex items-center gap-4">
            <button
              type="submit"
              className="btn btn-primary"
              disabled={isLoading}
            >
              {isLoading ? (
                <span className="loading loading-spinner loading-sm"></span>
              ) : (
                "Save Post"
              )}
            </button>
            <Link href="/posts" className="btn btn-ghost">
              Cancel
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
}

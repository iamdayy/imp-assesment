"use client";

import axios from "axios";
import { useSession } from "next-auth/react";
import Link from "next/link";
import { useParams, useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export default function EditPostPage() {
  const router = useRouter();
  const params = useParams();
  const { id } = params as { id: string }; // Ambil ID dari URL

  const { status } = useSession({
    required: true,
    onUnauthenticated() {
      router.push("/login");
    },
  });

  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);
  const [error, setError] = useState("");

  // 1. Ambil data post untuk mengisi form
  useEffect(() => {
    if (id) {
      setIsLoading(true);
      axios
        .get(`/api/posts/${id}`)
        .then((res) => {
          setTitle(res.data.title);
          setContent(res.data.content);
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

  // 2. Handle Update (PUT)
  const handleUpdate = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setIsLoading(true);

    try {
      await axios.put(`/api/posts/${id}`, { title, content });
      router.push("/posts");
      router.refresh(); // Refresh data di halaman /posts
    } catch (err) {
      console.error(err);
      setError("Failed to update post.");
    } finally {
      setIsLoading(false);
    }
  };

  // 3. Handle Delete (DELETE)
  const handleDelete = async () => {
    if (!window.confirm("Are you sure you want to delete this post?")) {
      return;
    }

    setError("");
    setIsDeleting(true);

    try {
      await axios.delete(`/api/posts/${id}`);
      router.push("/posts");
      router.refresh();
    } catch (err) {
      console.error(err);
      setError("Failed to delete post.");
    } finally {
      setIsDeleting(false);
    }
  };

  if (status === "loading" || isLoading) {
    return (
      <div className="flex justify-center items-center h-[calc(100vh-64px)]">
        <span className="loading loading-spinner loading-lg"></span>
      </div>
    );
  }

  return (
    <div className="container max-w-2xl p-4 mx-auto md:p-8">
      <h1 className="mb-6 text-3xl font-bold">Edit Post</h1>

      <div className="p-6 rounded-lg shadow-md bg-base-100">
        <form onSubmit={handleUpdate}>
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
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <button
                type="submit"
                className="btn btn-primary"
                disabled={isLoading || isDeleting}
              >
                {isLoading ? "Saving..." : "Update Post"}
              </button>
              <Link href="/posts" className="btn btn-ghost">
                Cancel
              </Link>
            </div>

            {/* Tombol Hapus */}
            <button
              type="button"
              className="btn btn-error"
              onClick={handleDelete}
              disabled={isLoading || isDeleting}
            >
              {isDeleting ? "Deleting..." : "Delete Post"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

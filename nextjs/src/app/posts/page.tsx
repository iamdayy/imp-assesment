"use client";

import axios from "axios";
import { useSession } from "next-auth/react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

// Definisikan Tipe data Post
interface Post {
  id: string;
  title: string;
  createdAt: string;
}

export default function PostsPage() {
  const router = useRouter();
  const { data: session, status } = useSession();

  // State untuk menyimpan data
  const [posts, setPosts] = useState<Post[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState("");

  // State untuk Paginasi
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);

  // Effect untuk proteksi rute dan fetch data
  useEffect(() => {
    if (status === "unauthenticated") {
      // Jika tidak login, lempar ke halaman login
      router.push("/login");
    } else if (status === "authenticated") {
      // Jika sudah login, fetch data
      fetchPosts(currentPage);
    }
  }, [status, router, currentPage]); // Dijalankan saat status auth berubah atau currentPage berubah

  // Fungsi untuk mengambil data post
  const fetchPosts = async (page: number) => {
    setIsLoading(true);
    setError("");
    try {
      const res = await axios.get(`/api/posts?page=${page}&limit=10`);
      setPosts(res.data.posts);
      setTotalPages(res.data.totalPages);
      setCurrentPage(res.data.currentPage);
    } catch (err) {
      setError("Failed to fetch posts. Please try again.");
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  };

  // Tampilan Loading
  if (status === "loading" || isLoading) {
    return (
      <div className="flex justify-center items-center h-[calc(100vh-64px)]">
        <span className="loading loading-spinner loading-lg"></span>
      </div>
    );
  }

  // Tampilan jika tidak terautentikasi (sebelum redirect)
  if (status === "unauthenticated") {
    return null; // Akan segera di-redirect oleh useEffect
  }

  // Tampilan Halaman Utama
  return (
    <div className="container p-4 mx-auto md:p-8">
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-3xl font-bold">My Posts</h1>
        <Link href="/posts/create" className="btn btn-primary">
          Create New Post
        </Link>
      </div>

      {error && (
        <div role="alert" className="mb-4 alert alert-error">
          <span>{error}</span>
        </div>
      )}

      {/* Tabel Daftar Post */}
      <div className="overflow-x-auto rounded-lg shadow-md bg-base-100">
        <table className="table w-full">
          <thead>
            <tr>
              <th>Title</th>
              <th>Created At</th>
              <th className="w-1/4">Actions</th>
            </tr>
          </thead>
          <tbody>
            {posts.length > 0 ? (
              posts.map((post) => (
                <tr key={post.id}>
                  <td>{post.title}</td>
                  <td>{new Date(post.createdAt).toLocaleDateString()}</td>
                  <td className="flex space-x-2">
                    <Link
                      href={`/posts/${post.id}`}
                      className="btn btn-sm btn-info"
                    >
                      View
                    </Link>
                    <Link
                      href={`/posts/${post.id}/edit`}
                      className="btn btn-sm btn-warning"
                    >
                      Edit
                    </Link>
                    {/* Tombol Hapus akan kita tambahkan nanti */}
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={3} className="text-center">
                  No posts found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* Kontrol Paginasi */}
      <div className="flex justify-center mt-6 join">
        <button
          className="join-item btn"
          onClick={() => fetchPosts(currentPage - 1)}
          disabled={currentPage <= 1}
        >
          «
        </button>
        <button className="join-item btn">
          Page {currentPage} of {totalPages}
        </button>
        <button
          className="join-item btn"
          onClick={() => fetchPosts(currentPage + 1)}
          disabled={currentPage >= totalPages}
        >
          »
        </button>
      </div>
    </div>
  );
}

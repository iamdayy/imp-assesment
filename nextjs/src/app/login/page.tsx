"use client";

import { signIn } from "next-auth/react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function Login() {
  const router = useRouter();
  const [data, setData] = useState({ email: "", password: "" });
  const [error, setError] = useState("");

  const loginUser = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(""); // Reset error

    const res = await signIn("credentials", {
      ...data,
      redirect: false, // Kita handle redirect manual
    });

    if (res?.ok) {
      // Sukses, redirect ke halaman posts
      router.push("/posts");
    } else {
      // Gagal
      setError(res?.error || "Invalid email or password.");
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-base-200">
      <div className="w-full max-w-sm shadow-2xl card bg-base-100">
        <form className="card-body" onSubmit={loginUser}>
          <h2 className="mb-4 text-2xl card-title">Login</h2>

          {error && (
            <div role="alert" className="alert alert-error">
              <span>{error}</span>
            </div>
          )}

          <div className="form-control">
            <label className="label">
              <span className="label-text">Email</span>
            </label>
            <input
              type="email"
              placeholder="email@example.com"
              className="input input-bordered"
              value={data.email}
              onChange={(e) => setData({ ...data, email: e.target.value })}
              required
            />
          </div>
          <div className="form-control">
            <label className="label">
              <span className="label-text">Password</span>
            </label>
            <input
              type="password"
              placeholder="password"
              className="input input-bordered"
              value={data.password}
              onChange={(e) => setData({ ...data, password: e.target.value })}
              required
            />
          </div>
          <div className="mt-6 form-control">
            <button type="submit" className="btn btn-primary">
              Login
            </button>
          </div>
          <div className="mt-4 text-center">
            <Link href="/register" className="link link-hover">
              Don&apos;t have an account? Register
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
}

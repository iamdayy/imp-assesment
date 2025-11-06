"use client";

import axios from "axios";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function Register() {
  const router = useRouter();
  const [data, setData] = useState({ name: "", email: "", password: "" });
  const [error, setError] = useState("");

  const registerUser = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(""); // Reset error

    try {
      const res = await axios.post("/api/register", data);
      console.log("User registered successfully:", res.data);
      // Redirect ke halaman login setelah sukses
      router.push("/login");
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (err: any) {
      console.error(err);
      setError(err.response?.data || "Registration failed. Please try again.");
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-base-200">
      <div className="w-full max-w-sm shadow-2xl card bg-base-100">
        <form className="card-body" onSubmit={registerUser}>
          <h2 className="mb-4 text-2xl card-title">Register</h2>

          {error && (
            <div role="alert" className="alert alert-error">
              <span>{error}</span>
            </div>
          )}

          <div className="form-control">
            <label className="label">
              <span className="label-text">Name</span>
            </label>
            <input
              type="text"
              placeholder="Your Name"
              className="input input-bordered"
              value={data.name}
              onChange={(e) => setData({ ...data, name: e.target.value })}
              required
            />
          </div>
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
              Register
            </button>
          </div>
          <div className="mt-4 text-center">
            <Link href="/login" className="link link-hover">
              Already have an account? Login
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
}

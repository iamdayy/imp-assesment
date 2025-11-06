"use client";

import { signOut, useSession } from "next-auth/react";
import Link from "next/link";

export default function Navbar() {
  const { data: session, status } = useSession();

  return (
    <div className="shadow-sm navbar bg-base-100">
      <div className="navbar-start">
        <Link href="/" className="text-xl btn btn-ghost">
          IMP Assess
        </Link>
      </div>

      <div className="navbar-end">
        {status === "loading" && (
          <span className="loading loading-spinner loading-sm"></span>
        )}

        {/* Jika Belum Login */}
        {status === "unauthenticated" && (
          <div className="flex items-center gap-2">
            <Link href="/login" className="btn btn-sm btn-ghost">
              Login
            </Link>
            <Link href="/register" className="btn btn-sm btn-primary">
              Register
            </Link>
          </div>
        )}

        {/* Jika Sudah Login */}
        {status === "authenticated" && (
          <div className="flex items-center gap-4">
            <Link
              href="/posts"
              className="btn btn-sm btn-ghost"
              prefetch={false}
            >
              My Posts
            </Link>
            <div className="dropdown dropdown-end">
              <label tabIndex={0} className="btn btn-ghost btn-sm rounded-btn">
                {session.user?.email}
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={1.5}
                  stroke="currentColor"
                  className="w-4 h-4"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="m19.5 8.25-7.5 7.5-7.5-7.5"
                  />
                </svg>
              </label>
              <ul
                tabIndex={0}
                className="p-2 mt-4 shadow menu dropdown-content z-1 bg-base-100 rounded-box w-52"
              >
                <li>
                  <button onClick={() => signOut()}>Sign Out</button>
                </li>
              </ul>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

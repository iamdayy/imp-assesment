import { authOptions } from "@/app/api/auth/[...nextauth]/route"; // Sesuaikan path jika perlu
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";

/**
 * Halaman Utama (Root Page)
 *
 * Halaman ini bertindak sebagai "router" di sisi server.
 * - Jika user sudah login, arahkan ke /posts.
 * - Jika user belum login, arahkan ke /login.
 */
export default async function RootPage() {
  // 1. Dapatkan sesi di server
  const session = await getServerSession(authOptions);

  // 2. Lakukan redirect berdasarkan status sesi
  if (session) {
    redirect("/posts");
  } else {
    redirect("/login");
  }
}

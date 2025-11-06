import { authOptions } from "@/lib/auth"; // Sesuaikan path jika beda
import { prisma } from "@/lib/prisma";
import { getServerSession } from "next-auth";
import { NextResponse } from "next/server";

// GET /api/posts?page=1&limit=10 (List Posts with Pagination)
export async function GET(request: Request) {
  const session = await getServerSession(authOptions);

  if (!session || !session.user?.email) {
    return new NextResponse("Unauthorized", { status: 401 });
  }

  // Ambil query params untuk paginasi
  const { searchParams } = new URL(request.url);
  const page = parseInt(searchParams.get("page") || "1", 10);
  const limit = parseInt(searchParams.get("limit") || "10", 10);
  const skip = (page - 1) * limit;

  try {
    // 1. Ambil posts (hanya milik user) dengan paginasi
    const posts = await prisma.post.findMany({
      where: {
        author: { email: session.user.email },
      },
      orderBy: { createdAt: "desc" },
      skip: skip,
      take: limit,
    });

    // 2. Ambil total post (untuk menghitung total halaman)
    const totalPosts = await prisma.post.count({
      where: {
        author: { email: session.user.email },
      },
    });

    return NextResponse.json({
      posts,
      totalPages: Math.ceil(totalPosts / limit),
      currentPage: page,
    });
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
  } catch (error) {
    return new NextResponse("Internal Server Error", { status: 500 });
  }
}

// POST /api/posts (Create Post)
export async function POST(request: Request) {
  const session = await getServerSession(authOptions);

  if (!session || !session.user?.email) {
    return new NextResponse("Unauthorized", { status: 401 });
  }

  try {
    const body = await request.json();
    const { title, content } = body;

    if (!title || !content) {
      return new NextResponse("Missing title or content", { status: 400 });
    }

    const newPost = await prisma.post.create({
      data: {
        title,
        content,
        author: {
          connect: { email: session.user.email }, // Hubungkan dengan user
        },
      },
    });

    return NextResponse.json(newPost, { status: 201 });
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
  } catch (error) {
    return new NextResponse("Internal Server Error", { status: 500 });
  }
}

import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { prisma } from "@/lib/prisma";
import { getServerSession } from "next-auth";
import { NextResponse } from "next/server";

// Helper function untuk otorisasi
async function checkPostOwnership(postId: string, userEmail: string) {
  const post = await prisma.post.findUnique({
    where: { id: postId },
    include: { author: true },
  });

  if (!post) {
    return { error: "Post not found", status: 404 };
  }

  if (post.author.email !== userEmail) {
    return { error: "Forbidden", status: 403 };
  }

  return { post };
}

// GET /api/posts/[id] (View Post Details)
export async function GET(
  request: Request,
  { params }: { params: { id: string } }
) {
  const session = await getServerSession(authOptions);
  if (!session || !session.user?.email) {
    return new NextResponse("Unauthorized", { status: 401 });
  }

  const { post, error, status } = await checkPostOwnership(
    params.id,
    session.user.email
  );

  if (error) {
    return new NextResponse(error, { status });
  }

  return NextResponse.json(post);
}

// PUT /api/posts/[id] (Update Post)
export async function PUT(
  request: Request,
  { params }: { params: { id: string } }
) {
  const session = await getServerSession(authOptions);
  if (!session || !session.user?.email) {
    return new NextResponse("Unauthorized", { status: 401 });
  }

  // Otorisasi: Cek kepemilikan post
  const { error, status } = await checkPostOwnership(
    params.id,
    session.user.email
  );
  if (error) {
    return new NextResponse(error, { status });
  }

  // Lanjut update jika diotorisasi
  try {
    const body = await request.json();
    const { title, content } = body;

    const updatedPost = await prisma.post.update({
      where: { id: params.id },
      data: { title, content },
    });

    return NextResponse.json(updatedPost);
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
  } catch (error) {
    return new NextResponse("Internal Server Error", { status: 500 });
  }
}

// DELETE /api/posts/[id] (Delete Post)
export async function DELETE(
  request: Request,
  { params }: { params: { id: string } }
) {
  const session = await getServerSession(authOptions);
  if (!session || !session.user?.email) {
    return new NextResponse("Unauthorized", { status: 401 });
  }

  // Otorisasi: Cek kepemilikan post
  const { error, status } = await checkPostOwnership(
    params.id,
    session.user.email
  );
  if (error) {
    return new NextResponse(error, { status });
  }

  // Lanjut hapus jika diotorisasi
  try {
    await prisma.post.delete({
      where: { id: params.id },
    });
    return new NextResponse(null, { status: 204 }); // 204 No Content
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
  } catch (error) {
    return new NextResponse("Internal Server Error", { status: 500 });
  }
}

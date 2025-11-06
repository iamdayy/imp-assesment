import { prisma } from "@/lib/prisma"; // Import prisma client kita
import { PrismaAdapter } from "@auth/prisma-adapter";
import bcrypt from "bcrypt";
import NextAuth, { AuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";

export const authOptions: AuthOptions = {
  // Gunakan Adapter Prisma
  adapter: PrismaAdapter(prisma),

  // Tentukan provider, kita pakai Credentials (email/password)
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: {
          label: "Email",
          type: "email",
          placeholder: "user@example.com",
        },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        if (!credentials?.email || !credentials.password) {
          return null;
        }

        const user = await prisma.user.findUnique({
          where: { email: credentials.email },
        });

        // Jika user tidak ditemukan atau tidak punya password (misal: login via Google)
        if (!user || !user.hashedPassword) {
          return null;
        }

        // Cek (compare) password
        const isPasswordValid = await bcrypt.compare(
          credentials.password,
          user.hashedPassword
        );

        if (!isPasswordValid) {
          return null; // Password salah
        }

        // Jika user & password valid
        return user;
      },
    }),
  ],

  // Tentukan strategi session (JWT)
  session: {
    strategy: "jwt",
  },

  // Tentukan halaman custom (jika perlu, kita bisa buat nanti)
  // pages: {
  //   signIn: '/login',
  // },

  // Secret untuk JWT
  secret: process.env.NEXTAUTH_SECRET,
};

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };

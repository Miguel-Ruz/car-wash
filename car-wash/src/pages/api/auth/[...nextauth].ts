import NextAuth, { NextAuthOptions } from "next-auth"
import { prisma } from '../../../libs/prisma';
import { PrismaAdapter } from "@next-auth/prisma-adapter";
import CredentialsProvider from "next-auth/providers/credentials";

export const authOptions: NextAuthOptions = {
  adapter: PrismaAdapter(prisma),
  pages: {
    signIn: '/auth'
  },
  secret: process.env.NEXTAUTH_SECRET,
  providers: [
    CredentialsProvider({
      name: 'Credentials',
      credentials: {
        user: { label: 'username', type: 'text' },
        password: { label: 'password', type: 'password' },
      },
      async authorize(credentials, req) {
        if (!credentials?.user || !credentials?.password) {
          return null;
        }

        const user = await prisma.user.findFirst({
          where: { username: credentials?.user, password: credentials?.password }
        });

        if (!user) {
          return null;
        }

        return {
          id: user.id,
          username: user.username
        };
      }
    })
  ],
};

export default NextAuth(authOptions)
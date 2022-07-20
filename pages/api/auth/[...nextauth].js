import NextAuth from 'next-auth'
import GitHub from 'next-auth/providers/github'
import { PrismaAdapter } from '@next-auth/prisma-adapter'
import prisma from 'lib/prisma'

export const authOptions = {
    adapter: new PrismaAdapter(prisma),
    providers: [
        GitHub({
            clientId: process.env.NEXT_PUBLIC_GITHUB_ID,
            clientSecret: process.env.NEXT_PUBLIC_GITHUB_SECRET,
        }),
    ],
    secret: process.env.NEXTAUTH_SECRET,
    pages: {
        signIn: '/signin',
    },
    callbacks: {
        async signIn({ user, account, profile }) {
            if (account) {
                user.username = profile.login
            }
            return user
        },
        async session({ session, user }) {
            if (user) {
                session = user
            }
            return session
        },
    }
}

export default NextAuth(authOptions)

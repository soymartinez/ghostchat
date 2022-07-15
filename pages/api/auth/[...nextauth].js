import NextAuth from 'next-auth'
import GitHub from 'next-auth/providers/github'

export const authOptions = {
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
        async jwt({ profile, token, account }) {
            if (account) {
                token.username = profile.login
            }
            return token
        },

    }
}

export default NextAuth(authOptions)

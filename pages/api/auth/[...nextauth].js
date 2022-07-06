import NextAuth from 'next-auth'
import GitHub from 'next-auth/providers/github'

export const authOptions = {
    providers: [
        GitHub({
            clientId: process.env.GITHUB_ID,
            clientSecret: process.env.GITHUB_SECRET,
        }),
    ],
    secret: process.env.NEXTAUTH_SECRET,
    pages: {
        signIn: '/signin',
    },
}

export default NextAuth(authOptions)

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
        async jwt({ token, account }) {
            if (account) {
                token.accessToken = account.access_token
            }
            return token
        },
        async session({ session, token }) {
            session.accessToken = token.accessToken
            if (session.user.email === 'martnzomg@gmail.com') {
                session.user.role = 'admin'
            } else {
                session.user.role = 'user'
            }
            return session
        }
    },

}

export default NextAuth(authOptions)

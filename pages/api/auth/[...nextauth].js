import NextAuth from 'next-auth'
import { getToken } from 'next-auth/jwt'
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
            // Persist the OAuth access_token to the token right after signin
            if (account) {
                token.accessToken = account.access_token
                // const tokenNextAuth = await getToken({ req, secret })
                // token.accessToken = tokenNextAuth.
            }
            return token
        },
        async session({ session, token, user }) {
            // Send properties to the client, like an access_token from a provider.
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

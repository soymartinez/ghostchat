import prisma from 'lib/prisma'
import { unstable_getServerSession } from 'next-auth'
import { authOptions } from './auth/[...nextauth]'

export default async function getUsers(req, res) {
    const session = await unstable_getServerSession(req, res, authOptions)

    if (!session) {
        return res.status(401).json({
            error: 'Unauthorized'
        })
    }

    const users = await prisma.user.findMany()
    res.json({
        status: 200,
        users
    })
}
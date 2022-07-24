import twilio from 'twilio'
import { unstable_getServerSession } from 'next-auth'
import { authOptions } from './auth/[...nextauth]'

const TWILIO_ACCOUNT_SID = process.env.TWILIO_ACCOUNT_SID
const TWILIO_API_KEY = process.env.TWILIO_API_KEY
const TWILIO_API_SECRET = process.env.TWILIO_API_SECRET
const SERVICE_SID = process.env.SERVICE_SID

export default async function getToken(req, res) {
    const AccessToken = twilio.jwt.AccessToken
    const ChatGrant = AccessToken.ChatGrant
    const session = await unstable_getServerSession(req, res, authOptions)

    const token = new AccessToken(
        TWILIO_ACCOUNT_SID,
        TWILIO_API_KEY,
        TWILIO_API_SECRET, {
        identity: session.username.toLowerCase()
    })

    const chatGrant = new ChatGrant({
        serviceSid: SERVICE_SID
    })

    token.addGrant(chatGrant)

    res.json({
        status: 200,
        token: token.toJwt(),
        identity: session.username.toLowerCase(),
        friendlyName: session.name.toLowerCase(),
        image: session.image
    })
}
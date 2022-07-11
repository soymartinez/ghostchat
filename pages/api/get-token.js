import twilio from 'twilio'
import { getToken as getTokenNextAuth } from 'next-auth/jwt'

const TWILIO_ACCOUNT_SID = process.env.TWILIO_ACCOUNT_SID
const TWILIO_API_KEY = process.env.TWILIO_API_KEY
const TWILIO_API_SECRET = process.env.TWILIO_API_SECRET
const SERVICE_SID = process.env.SERVICE_SID

export default async function getToken(req, res) {
    const AccessToken = twilio.jwt.AccessToken
    const ChatGrant = AccessToken.ChatGrant
    const accessTokenNextAuth = await getTokenNextAuth({
        req,
        secret: process.env.NEXTAUTH_SECRET
    })

    const token = new AccessToken(
        TWILIO_ACCOUNT_SID,
        TWILIO_API_KEY,
        TWILIO_API_SECRET, {
        identity: accessTokenNextAuth.email
    })

    const chatGrant = new ChatGrant({
        serviceSid: SERVICE_SID
    })

    token.addGrant(chatGrant)

    res.json({
        status: 200,
        accessTokenTwilio: token.toJwt(),
    })
}
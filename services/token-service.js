import twilio from 'twilio'

const TWILIO_ACCOUNT_SID = process.env.TWILIO_ACCOUNT_SID
const TWILIO_API_KEY = process.env.TWILIO_API_KEY
const TWILIO_API_SECRET = process.env.TWILIO_API_SECRET
const SERVICE_SID = process.env.SERVICE_SID

const AccessToken = twilio.jwt.AccessToken
const ChatGrant = AccessToken.ChatGrant

export function tokenGenerator(identity) {
    const token = new AccessToken(
        TWILIO_ACCOUNT_SID,
        TWILIO_API_KEY,
        TWILIO_API_SECRET
    )

    const chatGrant = new ChatGrant({
        serviceSid: SERVICE_SID
    })

    token.addGrant(chatGrant)
    token.identity = identity

    return { token }
}
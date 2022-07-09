import twilio from 'twilio'

const TWILIO_ACCOUNT_SID = process.env.TWILIO_ACCOUNT_SID
const TWILIO_API_KEY = process.env.TWILIO_API_KEY
const TWILIO_API_SECRET = process.env.TWILIO_API_SECRET
const SERVICE_SID = process.env.SERVICE_SID

export default async function getToken(req, res) {
    switch (req.method) {
        case 'GET':
            // const identity = req.headers.identity

            // if (identity == null) {
            //     res.json({ status: 401 })
            // }

            const AccessToken = twilio.jwt.AccessToken
            const ChatGrant = AccessToken.ChatGrant

            const token = new AccessToken(
                TWILIO_ACCOUNT_SID,
                TWILIO_API_KEY,
                TWILIO_API_SECRET
            )

            const chatGrant = new ChatGrant({
                serviceSid: SERVICE_SID
            })

            token.addGrant(chatGrant)

            res.json({
                status: 200,
                token: token.toJwt(),
            })
    }
}
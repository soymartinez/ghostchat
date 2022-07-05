import { tokenGenerator } from 'services/token-service'

export default async function getToken(req, res) {
    switch (req.method) {
        case 'GET':
            const identity = req.query.identity
            const token = tokenGenerator(identity)

            res.json({
                identity,
                token: token.token.toJwt(),
            })
    }
}
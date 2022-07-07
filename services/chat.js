import { Client } from '@twilio/conversations'

export function createOrJoinConversation(room, token) {
    const client = new Client(token)

    client.on('stateChanged', async (state) => {
        if (state === 'initialized') {
            let conversation
            try {
                conversation = await client.createConversation({
                    uniqueName: room,
                })
            } catch (error) {
                conversation = await client.getConversationByUniqueName(room)
            }
        }
    })
}
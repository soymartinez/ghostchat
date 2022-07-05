import { Client } from '@twilio/conversations'

export function createOrJoinConversation(room, token) {
    const client = new Client(token)

    return client.on('stateChanged', async (state) => {
        if (state === 'initialized') {
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
import { Client } from '@twilio/conversations'

export function createOrJoinConversation(room, token) {
    const client = new Client(token)

    return new Promise(resolve => {
        client.on('stateChanged', async (state) => {
            if (state === 'initialized') {
                let conversation

                try {
                    conversation = await client.createConversation({ uniqueName: room })
                    // conversation.join()
                } catch (error) {
                    conversation = await client.getConversationByUniqueName(room)
                    console.log('error: ', error)
                }
                console.log('conversation: ', conversation)
                resolve(conversation)
            }
        })
    })
}

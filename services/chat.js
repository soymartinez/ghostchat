import { Client } from '@twilio/conversations'

export async function createOrJoinConversation({ room, token }) {
    const client = new Client(token)
    return new Promise(resolve => {
        client.on('stateChanged', async state => {
            if (state === 'initialized') {
                let conversation

                try {
                    conversation = await client.getConversationByUniqueName(room)
                } catch (error) {
                    if (error.message === 'Forbidden') {
                        console.log('You are not authorized to access this room 😢')
                    } else {
                        conversation = await client.createConversation({
                            uniqueName: room,
                            friendlyName: room,
                        })
                    }
                    console.log('error: ', error)
                }
                console.log('conversation: ', conversation)
                resolve(conversation)
            }
        })
    })
}

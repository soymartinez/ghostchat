import { Client } from '@twilio/conversations'

export async function createOrJoinConversation({ uniqueName, friendlyName, token }) {
    const client = new Client(token)
    return new Promise(resolve => {
        client.on('stateChanged', async state => {
            if (state === 'initialized') {
                let conversation

                try {
                    conversation = await client.getConversationByUniqueName(uniqueName)
                } catch (error) {
                    if (error.message === 'Forbidden') {
                        console.log('You are not authorized to access this room 😢')
                    } else {
                        conversation = await client.createConversation({
                            uniqueName,
                            friendlyName,
                        })
                        
                        await conversation.join()
                    }
                    console.log('error: ', error)
                }
                resolve(conversation)
            }
        })
    })
}

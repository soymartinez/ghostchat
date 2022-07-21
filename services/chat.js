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
                }
                resolve(conversation)
            }
        })
    })
}

export async function getSubscribedChats(token) {
    const client = new Client(token)
    const chatList = await client.getSubscribedConversations()
    return chatList.items
}

export async function deleteChat(token, chatSid) {
    const client = new Client(token)
    const conversation = await client.getConversationBySid(chatSid)
    conversation.delete()
}

export async function addParticipant(token, uniqueName, username) {
    const client = new Client(token)
    const conversation = await client.getConversationByUniqueName(uniqueName)
    return conversation.add(username)
}

export async function updateParticipantAttributes(token, username, image) {
    const client = new Client(token)
    const user = await client.getUser(username)
    const update = await user.updateAttributes({
        image,
    })
    return update
}

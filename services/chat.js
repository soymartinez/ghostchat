import { Client } from '@twilio/conversations'
import { getAccessToken } from './user'

export async function createOrJoinConversation({ uniqueName }) {
    const { token, friendlyName } = await getAccessToken()
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

export async function getSubscribedChats() {
    const { token } = await getAccessToken()
    const client = new Client(token)
    const chatList = await client.getSubscribedConversations()
    return chatList.items
}

export async function deleteChat(chatSid) {
    const { token } = await getAccessToken()
    const client = new Client(token)
    const conversation = await client.getConversationBySid(chatSid)
    conversation.delete()
}

export async function addParticipant(uniqueName, username) {
    const { token } = await getAccessToken()
    const client = new Client(token)
    const conversation = await client.getConversationByUniqueName(uniqueName)
    const participant = await conversation.add(username)
    return participant
}

export async function updateParticipantAttributes(username, image) {
    const { token } = await getAccessToken()
    const client = new Client(token)
    const user = await client.getUser(username)
    const update = await user.updateAttributes({
        image,
    })
    return update
}

export async function getChatParticipants(uniqueName) {
    const { token } = await getAccessToken()
    const client = new Client(token)
    const conversation = await client.getConversationByUniqueName(uniqueName)
    const participants = await conversation.getParticipants()
    return participants
}

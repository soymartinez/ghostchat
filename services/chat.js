import { Client } from '@twilio/conversations'
import { getAccessToken } from './user'

export async function createOrJoinChat(uniqueName) {
    const { token, identity, friendlyName, image } = await getAccessToken()
    const client = new Client(token)
    let chat
    try {
        chat = await client.getConversationByUniqueName(uniqueName)
        await updateParticipantAttributes(chat, identity, image)
    } catch (error) {
        chat = await client.createConversation({
            uniqueName,
            friendlyName,
        })

        await chat.join()
        await updateParticipantAttributes(chat, identity, image)
    } finally {
        return chat
    }
}

export async function joinChat(uniqueName) {
    const { token, identity, image } = await getAccessToken()
    const client = new Client(token)
    const chat = await client.getConversationByUniqueName(uniqueName)
    await updateParticipantAttributes(chat, identity, image)
    return chat
}

export async function updateParticipantAttributes(chat, identity, image) {
    const participant = await chat.getParticipantByIdentity(identity)
    const attributes = await participant.updateAttributes({
        image,
    })
    return attributes
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

export async function getChatParticipantsBySid(chatSid) {
    const { token } = await getAccessToken()
    const client = new Client(token)
    const conversation = await client.getConversationBySid(chatSid)
    const participants = await conversation.getParticipants()
    return participants
}

export async function getChatParticipantsByUniqueName(uniqueName) {
    const { token } = await getAccessToken()
    const client = new Client(token)
    const conversation = await client.getConversationByUniqueName(uniqueName)
    const participants = await conversation.getParticipants()
    return participants
}

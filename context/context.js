import { createContext, useContext, useState } from 'react'
import { getSession } from 'next-auth/react'

import { createOrJoinConversation, updateParticipantAttributes } from 'services/chat'

const Chat = createContext()
const User = createContext()

export const useChat = () => useContext(Chat)
export const useUser = () => useContext(User)

export const ChatContext = ({ children }) => {
    const [chat, setChat] = useState([])
    const [user, setUser] = useState([])

    async function createOrJoinChat(room) {
        try {
            const chat = await createOrJoinConversation({ uniqueName: room })
            if (chat) {
                setChat(chat)
                return chat
            }
        } catch (error) {
            console.log(error)
        }
    }

    async function resetChat() {
        setChat([])
    }

    async function createUser() {
        try {
            const user = await getSession()
            setUser(user)

            await updateParticipantAttributes(user.username.toLowerCase(), user.image)
        } catch (error) {
            console.log(error)
        }
    }

    return (
        <Chat.Provider value={{ chat, createOrJoinChat, resetChat }}>
            <User.Provider value={{ user, createUser }}>
                {children}
            </User.Provider>
        </Chat.Provider>
    )
}

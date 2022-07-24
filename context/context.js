import { createContext, useContext, useEffect, useState } from 'react'
import { getSession } from 'next-auth/react'

import { joinChat } from 'services/chat'
import { useRouter } from 'next/router'

const Chat = createContext()
const User = createContext()

export const useChat = () => useContext(Chat)
export const useUser = () => useContext(User)

export const ChatContext = ({ children }) => {
    const [chat, setChat] = useState([])
    const [user, setUser] = useState([])
    const { push } = useRouter()

    useEffect(() => {
        initializeUser()
    }, [])
    
    async function initializeUser() {
        try {
            const user = await getSession()
            setUser(user)
        } catch (error) {
            console.log(error)
        }
    }

    async function initializeJoinChat(room) {
        try {
            const chat = await joinChat(room)
            setChat(chat)
        } catch (error) {
            push('/')
        }
    }

    async function resetChat() {
        setChat([])
    }

    return (
        <Chat.Provider value={{ chat, user, initializeUser, initializeJoinChat, resetChat }}>
            {children}
        </Chat.Provider>
    )
}

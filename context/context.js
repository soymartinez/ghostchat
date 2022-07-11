import { createContext, useContext, useState } from 'react'

const Conversation = createContext()
const User = createContext()

export const useConversation = () => useContext(Conversation)
export const useUser = () => useContext(User)

export const Context = ({ children }) => {
    const [conversationContext, setConversation] = useState([])
    const [userContext, setUser] = useState([])

    const setConversationContext = (conversation) => {
        setConversation(conversation)
    }

    const setUserContext = (user) => {
        setUser({
            name: user.name,
            email: user.email,
            image: user.picture,
        })
    }

    return (
        <Conversation.Provider value={{ conversationContext, setConversationContext }}>
            <User.Provider value={{ userContext, setUserContext }}>
                {children}
            </User.Provider>
        </Conversation.Provider>
    )
}


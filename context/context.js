import { createContext, useContext, useState } from 'react'

const Conversation = createContext()
const User = createContext()

export const useConversation = () => useContext(Conversation)
export const useUser = () => useContext(User)

export const Context = ({ children }) => {
    const [conversation, setConversation] = useState([])
    const [user, setUser] = useState([])

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
        <Conversation.Provider value={{ conversation, setConversationContext }}>
            <User.Provider value={{ user, setUserContext }}>
                {children}
            </User.Provider>
        </Conversation.Provider>
    )
}


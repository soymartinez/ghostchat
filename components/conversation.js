import { useEffect, useState } from 'react'

import { useConversation } from 'context/context'
import { joinConversation } from 'services/chat'
import { getAccessToken } from 'services/user'

export default function Conversation({ room }) {
  const { conversationContext } = useConversation()
  const [messages, setMessages] = useState([])

  useEffect(() => {
    getMessagesRoom()
  }, [messages])

  async function joinRoom() {
    console.log('⭐')
    const token = await getAccessToken()
    const conversation = await joinConversation({ room, token })
    return conversation
  }

  async function getMessagesRoom() {
    const getMessages = await conversationContext.getMessages()
    setMessages(getMessages.items)

    conversationContext.on('messageAdded', (message) => {
      setMessages(messages => [...messages, message])
      window.scrollTo(0, document.getElementById('chat').scrollHeight)
    })
  }

  return (
    <div className='w-full h-96 overflow-auto
        border border-zinc-800 p-4 rounded-md mb-4' id='chat'>
      {
        messages.map(({ state: { author, body, index } }) => (
          <div className='w-2/4 border rounded-t-xl rounded-br-xl relative 
          first:mt-0 last:mb-0 
          my-2 p-2' key={index}>
            <p className='text-white'>{body}</p>
            <h2>{author}</h2>
          </div>
        ))
      }
    </div>
  )
}

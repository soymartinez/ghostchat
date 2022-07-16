import { useEffect, useState } from 'react'

import { useConversation } from 'context/context'
import { joinConversation } from 'services/chat'
import { getAccessToken } from 'services/user'

export default function Conversation({ room }) {
  const { conversationContext, setConversationContext } = useConversation()
  const [messages, setMessages] = useState([])

  useEffect(() => {
    joinRoom()
    scrollToBottom()
  }, [messages])

  function scrollToBottom() {
    const chat = document.getElementById('chat')
    chat.scrollTop = chat.scrollHeight
  }

  async function joinRoom() {
    try {
      await getMessagesRoom()
    } catch (error) {
      const { token } = await getAccessToken()
      const conversation = await joinConversation({
        uniqueName: room,
        token
      })

      /**
       * Set the context of the conversation when the user reloads the page
       */
      if (conversation) {
        const setContext = await setConversationContext(conversation)
        if (setContext) {
          getMessagesRoom()
        }
      }
    }
  }

  async function getMessagesRoom() {
    const getMessages = await conversationContext.getMessages()
    setMessages(getMessages.items)
    console.log('🚀: ', messages)

    conversationContext.on('messageAdded', (message) => {
      setMessages(messages => [...messages, message])
    })
  }

  const options = {
    month: 'short',
    day: 'numeric',
    hour: 'numeric',
    minute: 'numeric',
    hour12: true
  }

  return (
    <div className='w-full h-96 overflow-auto
        border border-zinc-800 p-4 rounded-md mb-4'  id='chat'>
      {
        messages.map(({ author, body, dateCreated, index }) => (
          <div className='w-3/4 border rounded-t-xl rounded-br-xl relative 
          first:mt-0 last:mb-0 my-2 p-2' key={index}>
            <div className='flex gap-2'>
              <h2 className='text-white font-bold self-baseline'>
                {author}
              </h2>
              <span className='text-[#666971] text-sm self-center'>
                {dateCreated.toLocaleString('en-US', options)}
              </span>
            </div>
            <p className=''>{body}</p>
          </div>
        ))
      }
    </div>
  )
}

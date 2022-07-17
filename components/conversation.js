import { useEffect, useState } from 'react'
import Image from 'next/image'

import { useConversation } from 'context/context'
import { joinConversation } from 'services/chat'
import { getAccessToken } from 'services/user'

export default function Conversation({ user, room }) {
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

    conversationContext.on('messageAdded', (message) => {
      setMessages([...messages, message])
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
    <div className='w-full rounded-md h-screen overflow-hidden' id='chat'>
      {
        messages.map(({ author, body, dateCreated }) => (
          <div key={dateCreated}
            className={`${body.length < 3 ? 'w-min' : ''}
                    flex gap-4
                    first:mt-0 last:mb-0 my-2 p-3
                    bg-[#1a1b1c] rounded-xl`}>
            <div className='flex'>
              <Image src={user.picture} alt={author} className='rounded-full'
                placeholder='blur' blurDataURL='#151617' layout='fixed' width={45} height={45} />
            </div>
            <div>
              <div className='flex items-center gap-2'>
                <span className={`text-white font-bold self-baseline whitespace-nowrap leading-normal
                  ${body.length < 3 ? 'hidden' : ''}`}>
                  {author}
                </span>
                <span className={`text-[#666971] text-sm font-semibold whitespace-nowrap leading-normal
                  ${body.length < 3 ? 'hidden' : ''}`}>
                  {dateCreated.toLocaleString('en-US', options)}
                </span>
              </div>
              <p className={`leading-tight ${body.length < 3 ? 'text-4xl px-2' : ''}`}>{body}</p>
            </div>
          </div>
        ))
      }
    </div>
  )
}

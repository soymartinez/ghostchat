import { useEffect, useState } from 'react'
import Image from 'next/image'
import { useChat } from 'context/context'

export default function Conversation({ user, room }) {
  const [messages, setMessages] = useState([])
  const { chat } = useChat()

  useEffect(() => {
    getCurrentMessages()
    scrollToBottom()
    getNewMessages()
  }, [messages, chat])

  function scrollToBottom() {
    const chatBox = document.getElementById('chatBox')
    chatBox.scrollTop = chatBox.scrollHeight
  }

  async function getCurrentMessages() {
    try {
      const getMessages = await chat.getMessages()
      setMessages(getMessages.items)
    } catch (error) {
      console.log('#1 .. 🤲 GET CURRENT MESSAGES')
    }
  }

  async function getNewMessages() {
    try {
      chat.on('messageAdded', (message) => {
        setMessages([...messages, message])
      })
    } catch (error) {
      console.log('#2 .. 👀 GET NEW MESSAGES')
    }
  }

  const options = {
    month: 'short',
    day: 'numeric',
    hour: 'numeric',
    minute: 'numeric',
    hour12: true
  }

  return (
    <div className='w-full rounded-md h-screen overflow-auto' id='chatBox'>
      {
        messages.map(({ author, body, dateCreated, index }) => (
          <div key={index}
            className={`${body.length < 3 ? 'w-min' : ''}
                    flex gap-4
                    first:mt-0 last:mb-0 my-2 p-3
                    bg-[#1a1b1c] rounded-xl`}>
            <div className='flex'>
              <Image src={user.username.toLowerCase() === author ? user.image : 'https://avatars.githubusercontent.com/u/72507996?v=4'} alt={author} className='rounded-full'
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

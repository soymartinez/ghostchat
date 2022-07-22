import { useEffect, useState } from 'react'
import Image from 'next/image'
import { useChat } from 'context/context'
import Loader from './loader'
import { options } from 'lib/options'

export default function Conversation() {
  const [messages, setMessages] = useState([])
  const [loading, setLoading] = useState(true)
  const { chat } = useChat()

  useEffect(() => {
    getCurrentMessages()
  }, [chat])

  useEffect(() => {
    scrollToBottom()
    getNewMessages()
  }, [messages])


  function scrollToBottom() {
    const chatBox = document.getElementById('chatBox')
    chatBox.scrollTop = chatBox.scrollHeight
  }

  async function getCurrentMessages() {
    try {
      const messages = await chat.getMessages(200)
      setMessages(messages.items)
      setLoading(false)
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

  return (
    <div className='w-full rounded-md h-screen overflow-auto
        scrollbar-thin scrollbar-thumb-blue-500' id='chatBox'>
      {
        messages.length > 0 ?
          messages.map(({ author, body, attributes: { image }, dateCreated, index }) => (
            <div key={index}
              className={`${body.length < 3 ? 'w-min' : ''}
                    flex gap-4
                    first:mt-0 last:mb-0 my-2 p-3
                    bg-[#1a1b1c] rounded-xl`}>
              <div className='flex'>
                {
                  image ?
                    <Image src={image} alt={author} className='rounded-full'
                      placeholder='blur' blurDataURL='#151617' layout='fixed' width={45} height={45} />
                    : <div className='rounded-full bg-[#151617] w-[45px] h-[45px]' />
                }
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
          :
          <div className='flex justify-center items-center h-full transition-all'>
            {loading
              ? <Loader size={45} />
              : <p className='text-center text-lg font-semibold text-[#42a0ff]'>No messages yet 👻</p>}
          </div>
      }
    </div>
  )
}

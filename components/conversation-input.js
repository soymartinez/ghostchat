import { useState } from "react"
import Image from "next/image"

import { useConversation } from "context/context"
import Send from "./send"

export default function ConversationInput({ user }) {
    const [message, setMessage] = useState('')
    const { conversationContext } = useConversation()

    async function handleSendMessageSubmit(e) {
        e.preventDefault()
        if (message.length === 0 || message === 'secret') { return setMessage('secret') }

        conversationContext.sendMessage(message)
        document.getElementById('message').value = ''
    }
    return (
        <div className='w-full my-6'>
            <form onSubmit={handleSendMessageSubmit}
                className='flex justify-center items-center 
                            gap-2 relative w-full'>
                <div className='flex justify-center items-center'>
                    <Image src={user.picture} alt={user.name} className='rounded-full'
                        placeholder='blur' blurDataURL='#1a1b1c' layout='fixed' width={42} height={42} />
                </div>
                <div className='flex justify-center items-center 
                                border-2 border-[#262728]
                                rounded-xl py-3 px-4 w-full'>
                    <input type='text' placeholder='Write a message' id='message' autoFocus autoComplete="off"
                        className={`outline-none transition-all w-full
                            bg-transparent placeholder:text-[#3e4044] focus:border-zinc-300
                            ${message === 'secret'
                                ? 'focus:border-red-500 border-red-500'
                                : 'border-zinc-300'}`}
                        onChange={(e) => setMessage(e.target.value)} />
                    <span className={`
                        absolute bottom-0 transition-all
                        ${message === 'secret'
                            ? 'z-20 -bottom-8 text-red-500'
                            : '-z-20'}`}>
                        message is <strong>required</strong>
                    </span>
                    {/* <button
                        type='submit'
                        className='border-2 hover:border-white rounded-full p-3 px-4 transition-all
                                    font-semibold text-center text-white hover:animate-pulse'>
                        <Send />
                    </button> */}
                </div>
            </form>
        </div>
    )
}

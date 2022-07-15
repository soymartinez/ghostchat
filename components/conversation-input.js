import { useConversation } from "context/context"
import { useState } from "react"
import Send from "./send"

export default function ConversationInput() {
    const [message, setMessage] = useState('')
    const { conversationContext } = useConversation()

    async function handleSendMessageSubmit(e) {
        e.preventDefault()
        if (message.length === 0 || message === 'secret') { return setMessage('secret') }

        conversationContext.sendMessage(message)
        document.getElementById('message').value = ''
    }
    return (
        <div className='w-full'>
            <form onSubmit={handleSendMessageSubmit}
                className='relative flex gap-2 justify-center items-center w-full'>
                <div className='flex justify-center w-full'>
                    <input type='text' placeholder='message' id='message' autoFocus autoComplete="off"
                        className={`border-2 rounded-full p-2 outline-none transition-all
                            font-semibold text-center focus:text-black
                            focus:outline-none focus:border-zinc-300 w-full
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
                </div>
                <button
                    type='submit'
                    className='border-2 hover:border-white rounded-full p-3 px-4 transition-all
                    font-semibold text-center text-white hover:animate-pulse'>
                    <Send />
                </button>
            </form>
        </div>
    )
}

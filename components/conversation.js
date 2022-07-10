import { useRouter } from "next/router"
import { useState } from "react"

export default function Conversation() {
    const [name, setName] = useState('')
    const router = useRouter()

    let message = ''
    let messages = []

    async function handleSendMessageSubmit(e) {
        e.preventDefault()
        if (name.length === 0 || name === 'secret') { return setName('secret') }

        
    }
    return (
        <div>
            <form onSubmit={handleSendMessageSubmit}
                className='relative flex justify-center items-center w-full'>
                <input type='text' placeholder='message'
                    className={`border-2 rounded-full p-2 outline-none transition-all
                            font-semibold text-center focus:text-black
                            focus:outline-none focus:border-zinc-300 w-full
                            ${name === 'secret'
                            ? 'focus:border-red-500 border-red-500'
                            : 'border-zinc-300'}`}
                    onChange={(e) => setName(e.target.value)} />
                <span className={`
                absolute bottom-0 transition-all
                ${name === 'secret'
                        ? 'z-20 -bottom-8 text-red-500'
                        : '-z-20'}`}>
                    message is <strong>required</strong>
                </span>
            </form>
        </div>
    )
}

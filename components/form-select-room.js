import { useState } from 'react'
import { useRouter } from 'next/router'

import { useConversation } from 'context/context'
import { getAccessToken } from 'services/user'
import { createOrJoinConversation } from 'services/chat'

export default function Form() {
    const { push } = useRouter()
    const [name, setName] = useState('')
    const [error, setError] = useState(false)
    const { setConversationContext } = useConversation()

    async function handleCreateOrJoinRoomSubmit(e) {
        e.preventDefault()
        if (name.length === 0 || name === 'secret') { return setName('secret') }

        const token = await getAccessToken()
        const conversation = await createOrJoinConversation({ room: name, token })

        if (conversation) {
            await setConversationContext(conversation)
            push(`/${name}`)
        } else {
            setError(true)
        }
    }

    return (
        <form onSubmit={handleCreateOrJoinRoomSubmit}
            className='relative flex justify-center items-center w-full'>
            <input type='text' placeholder='room name'
                className={`border-2 rounded-full p-2 outline-none transition-all
                            font-semibold text-center focus:text-black
                            focus:outline-none focus:border-zinc-300 w-full
                            ${name === 'secret'
                        ? 'focus:border-red-500 border-red-500'
                        : 'border-zinc-300'}`}
                onChange={(e) => {
                    setName(e.target.value)
                    setError(false)
                }} />
            <div className={`
                absolute bottom-0 transition-all
                ${name === 'secret'
                    ? 'z-20 -bottom-8 text-red-500'
                    : '-z-20'}`}>
                room name is <strong>required</strong>
            </div>
            <div className={`
                absolute bottom-0 transition-all
                ${error
                    ? 'z-20 -bottom-8 text-red-500'
                    : '-z-20'}`}>
                You are not authorized to access this room 😢
            </div>
        </form>
    )
}

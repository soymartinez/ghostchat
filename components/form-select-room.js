import { useState } from 'react'
import { getAccessToken } from 'services/user'
import { useRouter } from 'next/router'
import { createOrJoinConversation } from 'services/chat'

export default function Form() {
    const [name, setName] = useState('')
    const router = useRouter()

    async function handleCreateOrJoinRoomSubmit(e) {
        e.preventDefault()
        if (name.length === 0 || name === 'secret') { return setName('secret') }

        const token = await getAccessToken()
        const conversation = await createOrJoinConversation({ room: name, token })

        if (conversation) {
            router.push(`/${name}`)
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
                onChange={(e) => setName(e.target.value)} />
            <span className={`
                absolute bottom-0 transition-all
                ${name === 'secret'
                    ? 'z-20 -bottom-8 text-red-500'
                    : '-z-20'}`}>
                room name is <strong>required</strong>
            </span>
        </form>
    )
}
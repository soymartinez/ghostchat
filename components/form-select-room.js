import { useState } from 'react'
import { useRouter } from 'next/router'

import { useChat } from 'context/context'

export default function Form() {
    const { push } = useRouter()
    const [name, setName] = useState('')
    const [error, setError] = useState(false)

    const { createOrJoinChat } = useChat()

    async function handleCreateOrJoinRoomSubmit(e) {
        e.preventDefault()
        if (name.length === 0 || name === 'secret') { return setName('secret') }

        try {
            const room = await createOrJoinChat(name)
            if (room) {
                push(`/${name}`)
            } else {
                setError(true)
            }
        } catch (error) {
            console.log('error', error)
        }
    }

    return (
        <form onSubmit={handleCreateOrJoinRoomSubmit}
            className='relative flex justify-center items-center w-full bg-[#242628] rounded-2xl p-4 '>
            <input type='text' placeholder='room name' autoFocus
                className={`rounded-lg p-2 outline-none transition-all bg-transparent
                            font-semibold text-center focus:text-white border-2 border-[#151617]
                            focus:outline-none focus:border-zinc-300 w-full
                            ${name === 'secret' || error ? 'focus:border-red-500 border-red-500' : ''}`}
                onChange={(e) => {
                    setName(e.target.value)
                    setError(false)
                }} />
            <span className={`${error || name === 'secret' ? 'z-20 -bottom-6' : '-z-20 bottom-0'}
                        absolute rotate-45 rounded-sm transition-all
                        w-3 h-3 bg-[#252728]`}></span>
            <div className={`
                absolute bottom-0 transition-all rounded-xl w-auto text-center
                ${name === 'secret' ? 'z-20 bg-[#252728] -bottom-12 px-4 py-1' : '-z-20 opacity-0'}`}>
                room name is <strong>required</strong>
            </div>
            <div className={`
                absolute bottom-0 transition-all rounded-xl w-auto text-center
                ${error ? 'z-20 bg-[#252728] -bottom-12 px-4 py-1' : '-z-20 opacity-0'}`}>
                You are not authorized to access this room 😢
            </div>
        </form>
    )
}

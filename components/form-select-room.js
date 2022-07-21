import { useState } from 'react'
import { useRouter } from 'next/router'

import { useChat } from 'context/context'
import Loader from './loader'

export default function Form() {
    const { push } = useRouter()
    const [chatname, setChatname] = useState('')
    const [error, setError] = useState(false)
    const [loading, setLoading] = useState(false)

    const { createOrJoinChat } = useChat()

    async function handleCreateOrJoinRoomSubmit(e) {
        e.preventDefault()
        if (chatname.length === 0 || chatname === 'secret') { return setChatname('secret') }
        
        try {
            setLoading(true)
            const room = await createOrJoinChat(chatname)
            if (room) push(`/${chatname}`)
            else setError(true)
        } catch (error) {
            console.log('error', error)
            setLoading(false)
        } finally {
            setLoading(false)
        }
    }

    return (
        <form onSubmit={handleCreateOrJoinRoomSubmit}
            className='w-full relative'>
            <div className={`flex justify-center items-center 
                            border-2 ${error || chatname === 'secret' ? 'border-red-500' : 'border-[#262728]'}
                            rounded-xl py-2 pl-4 pr-2 w-full`}>
                <input type='text' placeholder='Write a chat name' autoFocus
                    className={`outline-none transition-all w-full lowercase
                                bg-transparent placeholder:text-[#3e4044] focus:border-zinc-300
                            ${chatname === 'secret' || error
                            ? 'focus:border-red-500 border-red-500 placeholder:text-red-500'
                            : 'placeholder:text-[#3e4044] border-zinc-300'}`}
                    onChange={(e) => {
                        setChatname(e.target.value.toLowerCase())
                        setError(false)
                    }} />
                <span className={`
                    ${error || chatname === 'secret' ? 'z-20 -bottom-5' : '-z-20 opacity-0'}
                        absolute bottom-0 rotate-45 rounded-sm transition-all
                        w-3 h-3 bg-red-500`}></span>
                <div className={`
                    absolute bottom-0 transition-all rounded-xl w-auto text-center
                    ${chatname === 'secret' ? 'z-20 bg-red-500 -bottom-11 px-4 py-1' : '-z-20 opacity-0'}`}>
                    chat name is <strong>required</strong>
                </div>
                <div className={`
                    absolute bottom-0 transition-all rounded-xl w-auto text-center
                    ${error ? 'z-20 bg-red-500 -bottom-11 px-4 py-1' : '-z-20 opacity-0 bg-[#252728]'}`}>
                    You are not authorized to access this room 😢
                </div>
                {
                    loading ? <Loader size={22} /> : null
                }
            </div>
        </form>
    )
}

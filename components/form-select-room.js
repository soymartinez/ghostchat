import { useState } from 'react'
import { useRouter } from 'next/router'

import Loader from './loader'
import { createOrJoinChat } from 'services/chat'

export default function Form() {
    const [uniqueName, setUniqueName] = useState('')
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState(false)
    const { push } = useRouter()


    async function handleCreateOrJoinRoomSubmit(e) {
        e.preventDefault()
        if (uniqueName.length === 0 || uniqueName === 'secret') { return setUniqueName('secret') }
        
        try {
            setLoading(true)
            const room = await createOrJoinChat(uniqueName)
            if (room) push(`/${uniqueName}`)
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
                            border-2 ${error || uniqueName === 'secret' ? 'border-red-500' : 'border-[#262728]'}
                            rounded-xl py-2 pl-4 pr-2 w-full`}>
                <input type='text' placeholder='Create or join a chat' autoFocus
                    className={`outline-none transition-all w-full lowercase placeholder:normal-case
                                bg-transparent placeholder:text-[#3e4044] focus:border-zinc-300
                            ${error || uniqueName === 'secret'
                            ? 'focus:border-red-500 border-red-500 placeholder:text-red-500'
                            : 'placeholder:text-[#3e4044] border-zinc-300'}`}
                    onChange={(e) => {
                        setUniqueName(e.target.value.toLowerCase())
                        setError(false)
                    }} />
                <span className={`
                    ${error || uniqueName === 'secret' ? 'z-20 -bottom-5' : '-z-20 opacity-0'}
                        absolute bottom-0 rotate-45 rounded-sm transition-all
                        w-3 h-3 bg-red-500`}></span>
                <div className={`
                    absolute bottom-0 transition-all rounded-xl w-auto text-center
                    ${uniqueName === 'secret' ? 'z-20 bg-red-500 -bottom-11 px-4 py-1' : '-z-20 opacity-0'}`}>
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

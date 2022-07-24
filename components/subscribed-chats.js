import Link from 'next/link'
import { useEffect, useState } from 'react'
import { deleteChat, getSubscribedChats } from 'services/chat'
import Loader from './loader'
import { options } from 'lib/options'

export default function Subscribed() {
    const [chats, setChats] = useState([])
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        subscribedChats()
    }, [chats])

    async function subscribedChats() {
        await getSubscribedChats()
            .then(setChats)
            .catch(console.error)
            .finally(() => setLoading(false))
    }

    async function deleteSubscribedChat(chatSid) {
        await deleteChat(chatSid)
            .then(subscribedChats)
            .catch(console.error)
    }

    return (
        <div className='grid grid-flow-row grid-cols-2 gap-2
            w-full h-80 overflow-auto mt-2 relative
            scrollbar-thin scrollbar-thumb-blue-500
            transition-all rounded-2xl'>
            {
                chats && chats.length > 0 ?
                    chats.map(({ sid, uniqueName, createdBy, dateCreated, participants }) => (
                        <div key={sid}>
                            <Link href={uniqueName || '/'}>
                                <a>
                                    <div className='
                                        flex gap-2
                                        bg-[#242628] transition-all p-4 rounded-2xl
                                        cursor-pointer hover:shadow-lg shadow-blue-500 relative'>
                                        <div className='bg-gradient-to-br from-violet-500 w-10 h-10 rounded-full'></div>
                                        <div className=''>
                                            <h1 className='text-md text-blue-500 font-bold'>
                                                {uniqueName}
                                            </h1>
                                            <h1 className='text-sm font-bold'>{createdBy}</h1>
                                            <span className='text-sm'>{dateCreated.toLocaleString('en-US', options)}</span>
                                        </div>
                                    </div>
                                </a>
                            </Link>
                        </div>
                    ))
                    :
                    <div className='absolute grid place-content-center w-full h-full'>
                        {
                            loading
                                ? <Loader size={35} />
                                : <h1 className='text-center text-blue-500'>No chats</h1>
                        }
                    </div>
            }
        </div >
    )
}

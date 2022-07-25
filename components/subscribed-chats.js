import Link from 'next/link'
import { useEffect, useState } from 'react'
import { deleteChat, getSubscribedChats } from 'services/chat'
import { options } from 'lib/options'

import Loader from './loader'
import Crown from './crown'
import Users from './users'
import Info from './info'
import Message from './message'

export default function Subscribed() {
    const [chats, setChats] = useState([])
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        subscribedChats()
        if (!loading) {
            const cardsContent = document.getElementById('cards-content')
            cardsContent.style.opacity = 1
        }
    }, [chats])

    async function subscribedChats() {
        await getSubscribedChats()
            .then(setChats)
            .catch(console.error)
            .finally(() => setLoading(false))
    }

    async function deleteSubscribedChat(chatSid) {
        setLoading(true)
        await deleteChat(chatSid)
            .then(subscribedChats)
            .catch(console.error)
    }

    return (
        <div className={`
            w-full overflow-auto mt-2 relative ${chats.length > 0 ? 'h-full' : 'h-96'}
            scrollbar-thin scrollbar-thumb-blue-500 
            transition-all duration-1000 rounded-2xl`} >
            {
                chats && chats.length > 0 ?
                    <div id='cards-content'
                        className='grid grid-flow-row grid-cols-1 md:grid-cols-2 gap-2 opacity-0'>
                        {
                            chats.map(({ sid, uniqueName, createdBy, dateCreated, lastMessage, participants }) => (
                                <div key={sid}>
                                    <div className='
                                flex flex-col gap-2
                                bg-[#242628] transition-all p-4 rounded-2xl
                                cursor-pointer hover:shadow-lg shadow-blue-500 relative'>
                                        <div className='flex justify-between items-center'>
                                            <div className='bg-gradient-to-br from-zinc-600 w-16 h-16 rounded-full' />
                                            <div className='flex flex-col gap-2'>
                                                <Link href={uniqueName || '/'}>
                                                    <a>
                                                        <button className='bg-zinc-700 hover:bg-blue-500 rounded-full px-3 transition-all'>
                                                            Join
                                                        </button>
                                                    </a>
                                                </Link>
                                                <button key={sid} onClick={() => deleteSubscribedChat(sid)}
                                                    className='bg-zinc-700 hover:bg-red-500 rounded-full px-3 transition-all'>
                                                    {loading ? 'Deleting' : 'Delete'}
                                                </button>
                                            </div>
                                        </div>
                                        <div className=''>
                                            <h1 className='text-md text-blue-500 font-bold'>
                                                {uniqueName}
                                            </h1>
                                            {/* <p className='py-2'>description</p> */}
                                            <div className='flex flex-col gap-1 overflow-hidden'>
                                                <div className='flex gap-4'>
                                                    <h1 className='text-sm font-bold flex gap-2'><Crown /> {createdBy}</h1>
                                                    <h1 className='text-sm font-bold flex gap-2'>
                                                        <Users index={true} />
                                                        {participants.size} <span className='font-medium'> Participants</span>
                                                    </h1>
                                                </div>
                                                <div className='flex gap-4'>
                                                    <h1 className='text-sm flex gap-2'><Info />
                                                        {dateCreated.toLocaleString('en-US', options)}
                                                    </h1>
                                                    {lastMessage ?
                                                        <h1 className='text-sm font-bold flex gap-2'>
                                                            <Message />
                                                            {lastMessage.index + 1} <span className='font-medium'>Messages</span>
                                                        </h1> : null}
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            ))
                        }
                    </div>
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

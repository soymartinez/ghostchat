import Link from 'next/link';
import { useEffect, useState } from 'react'
import { deleteChat, getSubscribedChats } from 'services/chat'
import Loader from './loader';

export default function Subscribed() {
    const [chats, setChats] = useState([])

    useEffect(() => {
        subscribedChats()
    }, [chats]);

    async function subscribedChats() {
        await getSubscribedChats()
            .then(setChats)
            .catch(console.error)
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
                    chats.map(chat => (
                        <div  key={chat.sid}>
                            <Link href={chat.uniqueName || '/'}>
                                <a>
                                    <div className='flex bg-[#242628] transition-all p-4 rounded-2xl cursor-pointer
                                    hover:shadow-2xl shadow-blue-500 ease-in duration-500 relative'>
                                        <div className=''>
                                            <h1 className='text-md text-blue-500 font-bold'>{chat.uniqueName}</h1>
                                            <h1 className='text-md font-bold'>{chat.createdBy}</h1>
                                        </div>
                                    </div>
                                </a>
                            </Link>
                            {/* <div className='w-min'>
                                <button onClick={() => deleteSubscribedChat(chat.sid)}
                                    className='px-2 rounded-full bg-[#151617] hover:bg-[#333638]'>
                                    Delete
                                </button>
                            </div> */}
                        </div>
                    ))
                    :
                    <div className='absolute grid place-content-center w-full h-full'>
                        <Loader size={35} />
                    </div>
            }
        </div >
    )
}

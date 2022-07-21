import { useRouter } from 'next/router';
import { useEffect, useState } from 'react'
import { deleteChat, getSubscribedChats, joinChat } from 'services/chat'
import { getAccessToken } from 'services/user';

export default function Subscribed() {
    const [chats, setChats] = useState([])
    const [loading, setLoading] = useState(true)

    const { push } = useRouter()

    useEffect(() => {
        subscribedChats()
    }, []);

    async function subscribedChats() {
        const { token } = await getAccessToken()
        await getSubscribedChats(token)
            .then(setChats)
            .catch(console.error)
    }

    async function deleteSubscribedChat(chatSid) {
        const { token } = await getAccessToken()
        await deleteChat(token, chatSid)
            .then(subscribedChats)
            .catch(console.error)
    }

    async function joinSubscribedChat(uniqueName) {
        console.log('🎯 joinSubscribedChat', uniqueName)
        const { token } = await getAccessToken()
        await joinChat(token, uniqueName)
            .then(() => push(`/${uniqueName}`))
            .catch(console.error)
    }

    return (
        <div className='grid grid-cols-3 grid-flow-row gap-2
            w-full max-h-80 overflow-auto mt-2
            scrollbar-thin scrollbar-thumb-blue-500
            transition-all rounded-2xl'>
            {
                chats && chats.length > 0 ?
                    chats.map(message => (
                        <div key={message.sid}
                            onClick={() => console.log(message.sid)}
                            className='bg-[#242628] transition-all p-4 rounded-2xl cursor-pointer
                            hover:shadow-sm shadow-blue-500'>
                            <h1 className='text-md text-blue-500 font-bold'>{message.uniqueName}</h1>

                            <div className='flex justify-end gap-2'>
                                <button type='cl' onClick={() => deleteSubscribedChat(message.sid)}
                                    className='px-2 rounded-full bg-[#151617]'>
                                    Delete
                                </button>

                                <button onClick={() => addParticipant(message.sid)}>
                                    Add
                                </button>
                            </div>
                        </div>
                    )) : null
            }
        </div>
    )
}

import { useEffect, useState } from 'react'
import { signOut } from 'next-auth/react'
import Image from 'next/image'
import Link from 'next/link'

import { randomColor } from 'lib/color'
import { useChat } from 'context/context'
import { getChatParticipantsByUniqueName } from 'services/chat'

import Signout from './signout'
import ChangeIcon from './change'
import AddIcon from './add'
import Users from './users'
import Hash from './hash'
import AddUser from './add-user'
import Close from './close'

export default function Header({ room }) {
    const [hoverSignout, setHoverSignout] = useState(false)
    const [hoverChange, setHoverChange] = useState(false)
    const [hoverAddUser, setHoverAddUser] = useState(false)
    const [hoverClose, setHoverClose] = useState(false)
    const [participants, setParticipants] = useState([])
    const [countParticipants, setCountParticipants] = useState(0)
    const [addUser, setAddUser] = useState(false)

    const { user, chat } = useChat()

    useEffect(() => {
        getNewParticipants()
    }, [chat])
    
    useEffect(() => {
        getParticipants()
    }, [])

    const color = randomColor()

    async function getNewParticipants() {
        if (chat.sid) {
            chat.on('participantJoined', (participant) => {
                setCountParticipants(countParticipants + 1)
                setParticipants([...participants, participant])
            })
        }
    }

    async function getParticipants() {
        if (room) {
            try {
                const participantsList = await getChatParticipantsByUniqueName(room)
                setCountParticipants(participantsList.length)
                const randomParticipants = participantsList.sort(() => Math.random() - 0.5).slice(0, 5)
                setParticipants(randomParticipants)

            } catch (error) {
                console.log('#3 .. 👻 GET PARTICIPANTS')
            }
        }
    }


    return (
        <div className={`flex items-center z-50
                        w-full transition-all gap-8 mb-2 relative
                        ${room ? 'py-6 border-b-2 border-[#1a1b1c] justify-between' : 'py-4 justify-center'}`}>
            {
                room && (
                    <div className={`flex gap-2 items-center ${room ? 'z-10' : ''}`}>
                        <div className={`${room ? 'visible' : 'hidden'}
                                flex justify-start items-center
                                gap-1 bg-[#151617] px-2 py-1 rounded-md  
                                w-14 max-w-[200px] sm:w-min md:w-min whitespace-nowrap overflow-ellipsis overflow-hidden
                                text-sm text-[#8f939a] lowercase font-semibold`}>
                            <div>
                                <Hash className={`${room ? 'visible' : 'hidden'}`} />
                            </div>
                            <span>{room}</span>
                        </div>
                        <div className='
                                flex justify-center items-center h-full
                                gap-2 bg-[#151617] px-2 py-1 rounded-md
                                text-sm text-[#8f939a] lowercase font-semibold'>
                            <Users /> <span>{countParticipants}</span>
                        </div>
                    </div>
                )
            }
            <div className='flex justify-center items-center gap-2 w-full z-10 absolute -space-x-4'>
                {
                    room !== undefined && (
                        participants.length > 0 ?
                            participants.map(({ identity, attributes: { image } }) => (
                                <div key={identity} className={`
                                        ring-[#0f0f10] ring z-10
                                        w-[20px] h-[20px] sm:w-[28px] sm:h-[28px] 
                                        rounded-full transition-all`}>
                                    {
                                        image ?
                                            <Image src={image} alt={identity} className='rounded-full'
                                                placeholder='blur' blurDataURL='#1a1b1c' width={28} height={28} />


                                            : <div key={identity} id='unknown' className={`
                                                ring-[#0f0f10] ring 
                                                w-[20px] h-[20px] sm:w-[28px] sm:h-[28px] 
                                                rounded-full transition-all`}></div>
                                    }
                                    <style jsx>{`
                                        #unknown {
                                            background-image: linear-gradient(-135deg, #0f0f10 0%, #23b9ee 60%, ${color} 100%);
                                        }
                                    `}</style>
                                </div>
                            ))
                            :
                            <>
                                <div className='ring-[#0f0f10] ring w-[20px] h-[20px] sm:w-[28px] 
                                                sm:h-[28px] bg-[#262728] rounded-full animate-pulse'></div>
                                <div className='ring-[#0f0f10] ring w-[20px] h-[20px] sm:w-[28px] 
                                                sm:h-[28px] bg-[#262728] rounded-full animate-pulse'></div>
                            </>
                    )
                }
            </div>
            <div className='flex justify-center items-center gap-2 w-full z-10 absolute'>
                {
                    room === undefined && (
                        user.image ?
                            <>
                                <Image src={user.image} alt={user.name} className='rounded-full'
                                    placeholder='blur' blurDataURL='#1a1b1c' width={28} height={28} />
                                <span className={`${room ? 'hidden' : 'visible'} lowercase font-bold`}>{user.username}</span>
                            </>
                            :
                            <>
                                <div className='w-[28px] h-[28px] bg-[#262728] rounded-full animate-pulse' />
                                <span className={`w-20 h-4 bg-[#262728] rounded-full animate-pulse`}></span>
                            </>
                    )
                }
            </div>
            <div className={`flex gap-6 text-sm ${!room ? 'absolute right-0' : 'z-10'}`}>
                <button onClick={() => setAddUser(!addUser)}
                    onMouseEnter={() => setHoverAddUser(true)}
                    onMouseLeave={() => setHoverAddUser(false)}
                    className={`${!room ? 'hidden' : 'visible'}
                            flex justify-center items-center
                            gap-1 rounded-xl 
                            text-md font-bold text-[#8f939a] hover:text-white`}>
                    <AddIcon active={hoverAddUser} />
                    <span className='hidden md:block'>Add</span>
                </button>
                <Link href={'/'}>
                    <a
                        onMouseEnter={() => setHoverChange(true)}
                        onMouseLeave={() => setHoverChange(false)}
                        className={`${!room ? 'hidden' : 'visible'}
                            flex justify-center items-center
                            gap-1 rounded-xl 
                            text-md font-bold text-[#8f939a] hover:text-white`}>
                        <ChangeIcon active={hoverChange} />
                        <span className='hidden md:block'>Room</span>
                    </a>
                </Link>
                <button onClick={() => signOut()}
                    onMouseEnter={() => setHoverSignout(true)}
                    onMouseLeave={() => setHoverSignout(false)}
                    className={`
                        flex justify-center items-center
                        gap-1 rounded-xl z-10
                        text-md font-bold text-[#8f939a] hover:text-white`}>
                    <Signout active={hoverSignout} />
                    <span className='hidden md:block'>Sign out</span>
                </button>
            </div>
            {
                room && (
                    <div className={`
                        transition-all absolute w-full
                        -z-50 top-0 
                        ${addUser ? 'px-4' : '-top-80'}`}>
                        <button
                            onClick={() => setAddUser(false)}
                            onMouseEnter={() => setHoverClose(true)}
                            onMouseLeave={() => setHoverClose(false)}
                            className={`transition-all absolute right-0 top-[4.7rem]`}>
                            <Close active={hoverClose} />
                        </button>
                        <AddUser close={addUser} room={room} />
                    </div>
                )
            }
        </div >
    )
}

import { useEffect, useState } from 'react'
import { signOut } from 'next-auth/react'
import Image from 'next/image'
import Link from 'next/link'

import { useChat, useUser } from 'context/context'
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
    const [addUser, setAddUser] = useState(false)

    const { chat } = useChat()
    const { user, createUser } = useUser()

    useEffect(() => {
        createUser()
        getParticipants()
    }, [chat])

    async function getParticipants() {
        if (room) {
            try {
                const listParticipants = await getChatParticipantsByUniqueName(room)
                setParticipants(listParticipants)
            } catch (error) {
                console.log('👥 wait for participants...')
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
                                max-w-[6rem] whitespace-nowrap overflow-ellipsis overflow-hidden
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
                            <Users /> <span>{participants.length}</span>
                        </div>
                    </div>
                )
            }
            {
                user.image && (
                    <div className='flex justify-center items-center gap-2 w-full z-10 absolute'>
                        <Image src={user.image} alt={user.name} className='rounded-full'
                            placeholder='blur' blurDataURL='#1a1b1c' width={28} height={28} />
                        <span className={`${room ? 'hidden' : 'visible'} lowercase font-bold`}>{user.username}</span>
                    </div>
                )
            }
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
        </div>
    )
}

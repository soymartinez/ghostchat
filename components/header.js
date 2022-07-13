import { useState } from 'react'
import { useRouter } from 'next/router'
import { signOut } from 'next-auth/react'
import Image from 'next/image'

import Icon from './icon'
import Signout from './signout'
import ChangeIcon from './change'
import AddIcon from './add'

export default function Header({ user, room }) {
    const [hoverSignout, setHoverSignout] = useState(false)
    const [hoverChange, setHoverChange] = useState(false)
    const [hoverAddUser, setHoverAddUser] = useState(false)

    const { push } = useRouter()

    return (
        <>
            <Icon />
            <h1 className='font-bold text-5xl text-white mb-4 tracking-tight'>
                Secret chat
                <span className={`${room ? 'visible' : 'hidden'}
                    text-center text-transparent text-4xl leading-normal bg-clip-text mx-2 
                    bg-gradient-to-tr from-blue-400 to-blue-700 font-bold`}>
                    ({room})
                </span>
            </h1>
            <div className='flex justify-between items-center 
                              w-full transition-all mb-4 gap-8' key={user.email}>
                <div className='flex items-center gap-2'>
                    <Image src={user.picture} className='rounded-full' width={32} height={32} />
                    <span className='text-md lowercase font-semibold'>{user.name}</span>
                </div>
                <div className='flex gap-2'>
                    <button className={`
                                ${!room ? 'hidden' : 'visible'}
                                text-md text-black font-bold 
                                flex justify-center items-center gap-1 px-3 py-1 rounded-full transition-all
                                bg-white hover:bg-transparent border-2
                                hover:text-white hover:border-white`}
                        onMouseEnter={() => setHoverAddUser(true)}
                        onMouseLeave={() => setHoverAddUser(false)}
                        onClick={() => push('/')}>
                        <AddIcon active={hoverAddUser} /> Add
                    </button>
                    <button className={`
                                ${!room ? 'hidden' : 'visible'}
                                text-md text-black font-bold 
                                flex justify-center items-center gap-1 px-3 py-1 rounded-full transition-all
                                bg-white hover:bg-transparent border-2
                                hover:text-white hover:border-white`}
                        onMouseEnter={() => setHoverChange(true)}
                        onMouseLeave={() => setHoverChange(false)}
                        onClick={() => push('/')}>
                        <ChangeIcon active={hoverChange} /> Room
                    </button>
                    <button className='text-md text-black font-bold 
                                flex justify-center items-center gap-1 px-3 py-1 rounded-full transition-all
                                bg-white hover:bg-transparent border-2
                                hover:text-white hover:border-white'
                        onMouseEnter={() => setHoverSignout(true)}
                        onMouseLeave={() => setHoverSignout(false)}
                        onClick={() => {
                            signOut({ callbackUrl: '/signin' })
                        }}>
                        <Signout active={hoverSignout} /> Sign Out
                    </button>
                </div>
            </div>
        </>
    )
}

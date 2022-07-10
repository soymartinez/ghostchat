import { useState } from 'react'
import { signOut } from 'next-auth/react'
import Image from 'next/image'

import Icon from './icon'
import Signout from './signout'

export default function Header({ user }) {
    const [hover, setHover] = useState(false)

    return (
        <>
            <Icon />
            <h1 className='font-bold text-5xl text-white mb-4 tracking-tight'>Secret chat</h1>
            <div className='flex justify-between items-center 
                              w-full transition-all mb-4 gap-8' key={user.email}>
                <div className='flex items-center gap-2'>
                    <Image src={user.picture} className='rounded-full' width={32} height={32} />
                    <span className='text-md lowercase font-semibold'>{user.name}</span>
                </div>
                <button className='text-md text-black font-bold 
                                flex justify-center items-center gap-1 px-3 py-1 rounded-full transition-all
                                bg-white hover:bg-transparent border-2
                                hover:text-white hover:border-white'
                    onMouseEnter={() => setHover(true)}
                    onMouseLeave={() => setHover(false)}
                    onClick={() => signOut()}>
                    <Signout active={hover} /> Sign Out
                </button>
            </div>
        </>
    )
}

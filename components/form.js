import { useState } from 'react'

export default function Form() {
    const [name, setName] = useState('')
    function handleAnonymousSubmit(e) {
        e.preventDefault()
        console.log(name)
    }

    return (
        <form onSubmit={handleAnonymousSubmit}>
            <input type='text' placeholder='Anonimous name'
                className='border-2 rounded-full p-2 outline-none transition-all
                            font-semibold text-center focus:text-black
                            focus:outline-none focus:border-[#888888]'
                onChange={(e) => setName(e.target.value)} />
        </form>
    )
}

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
                onChange={(e) => setName(e.target.value)} />
        </form>
    )
}

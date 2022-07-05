import { useState } from "react"

export default function Form() {
    const [name, setName] = useState('')
    console.log(name)
    function handleAnonymousSubmit(e) {
        e.preventDefault()
        console.log('handleAnonymousSubmit')
    }

    return (
        <form onSubmit={handleAnonymousSubmit}>
            <input type='text' placeholder='Anonimous name'
                onChange={(e) => setName(e.target.value)} />
        </form>
    )
}

import { useState } from "react"
import { useChat } from "context/context"
import Send from "./send"

export default function AddUser() {
  const [username, setUsername] = useState('')
  const [isAdded, setIsAdded] = useState(false)
  const [conflict, setConflict] = useState(false)
  const { chat } = useChat()

  async function handleJoinUser(e) {
    e.preventDefault()
    if (username.length === 0 || username === 'secret') { return setUsername('secret') }

    try {
      const newParticipant = await chat.add(username.toLowerCase())
      console.log('newParticipant: ', newParticipant)
      document.getElementById('username').value = ''
      setIsAdded(true)
    } catch (error) {
      if (error.message === 'Conflict') {
        setConflict(true)
        return console.log(`It's already in the room 😎`)
      }
      console.log('👶 adding a new participant')
    }
  }

  return (
    <form onSubmit={handleJoinUser} className={`
      flex justify-center items-center relative transition-all -z-30
      ${conflict || username === 'secret' ? 'border-red-500' : 'border-[#262728]'}
      border-2 rounded-xl py-2 pl-4 pr-2 w-full bg-[#151617]
      ${conflict ? 'border-[#3480cc]' : 'border-[#262728]'}`}>
      <input type='text' placeholder='Write a username' id='username' autoFocus
        className={`outline-none transition-all w-full
          bg-transparent placeholder:text-[#3e4044] focus:border-zinc-300
          ${username === 'secret'
            ? 'focus:border-red-500 border-red-500'
            : 'border-zinc-300'}`}
        onChange={(e) => {
          setUsername(e.target.value)
          setConflict(false)
          setIsAdded(false)
        }} />
      <span className={`${conflict || username === 'secret' ? 'z-20 -bottom-6' : '-z-20 bottom-0 opacity-0'}
        absolute rotate-45 rounded-sm transition-all w-3 h-3
        ${conflict ? 'bg-[#3480cc]' : 'bg-red-500'}`}></span>
      <div className={`
        absolute bottom-0 transition-all rounded-xl w-auto text-center
        ${username === 'secret' ? 'z-20 bg-red-500 -bottom-12 px-4 py-1' : '-z-20 opacity-0'}`}>
        username is <strong>required</strong>
      </div>
      <div className={`
        absolute bottom-0 transition-all rounded-xl w-auto text-center
        ${conflict ? 'z-20 bg-[#3480cc] -bottom-12 px-4 py-1' : '-z-20 opacity-0'}`}>
        <strong>{username}</strong> is already in the room 😎
      </div>
      <div className={`
        absolute bottom-0 transition-all rounded-xl w-auto text-center
        ${isAdded ? 'z-20 bg-[#42a0ff] -bottom-12 px-4 py-1' : '-z-20 opacity-0'}`}>
        {username} has joined the room
      </div>
      <button
        type='submit'
        className='absolute right-2
        rounded-md p-1 transition-all bg-[#313336] 
        font-semibold text-center text-white hover:animate-pulse'>
        <Send />
      </button>
    </form>
  )
}

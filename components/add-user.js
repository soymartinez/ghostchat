import { useEffect, useState } from "react"
import { addParticipant } from "services/chat"
import Loader from "./loader"

export default function AddUser({ close, room }) {
  const [username, setUsername] = useState('')
  const [newUser, setNewUser] = useState(false)
  const [isAdded, setIsAdded] = useState(false)
  const [conflict, setConflict] = useState(false)
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    const input = document.getElementById('username')
    if (!close) {
      setUsername('')
      input.value = ''
      setLoading(false)
      setConflict(false)
    } else {
      input.focus()
    }
  }, [close])

  async function handleJoinUser(e) {
    e.preventDefault()
    if (username.length === 0 || username === 'secret') { return setUsername('secret') }

    try {
      setLoading(true)
      const newParticipant = await addParticipant(room, username)
      setNewUser(newParticipant.identity)
      setIsAdded(true)
      document.getElementById('username').value = ''
    } catch (error) {
      if (error.message === 'Conflict') {
        console.log(`It's already in the room 😎`)
        setConflict(true)
      }
      console.log('👶 adding a new participant')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className={`absolute right-0 transition-all rounded-b-3xl 
                            bg-gradient-to-b from-[#0f0f10] via-[#0f0f10]
                            w-full h-56 flex flex-col justify-center items-start -z-50 top-0
                            `}>
      <span className='text-sm text-[#666971] pb-1'>
        You can add a new user even if he is not logged in yet.
      </span>
      <form onSubmit={handleJoinUser} className={`
      flex justify-center items-center relative transition-all -z-30
      ${username === 'secret' ? 'border-red-500' : conflict ? 'border-[#3480cc]' : 'border-[#262728]'}
      border-2 rounded-xl py-2 px-4 w-full bg-[#151617]`}>
        <input type='text' placeholder='Write a github user' id='username' autoFocus autoComplete="off"
          className={`outline-none transition-all w-full lowercase placeholder:normal-case text-center
          bg-transparent placeholder:text-[#3e4044]
          ${username === 'secret' ? 'text-red-500 placeholder:text-red-500' : conflict ? 'text-blue-500' : ''}`}
          onChange={(e) => {
            setUsername(e.target.value.toLowerCase())
            setConflict(false)
            setIsAdded(false)
          }} />
        <span className={`
        ${conflict || username === 'secret'
            ? 'z-20 -bottom-6' : '-z-20 bottom-0 opacity-0'}
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
          <strong>{newUser}</strong> has joined the room 😎
        </div>
        {
          loading ? <div className='absolute right-4'> <Loader size={22} /> </div> : null
        }
      </form>
    </div>
  )
}

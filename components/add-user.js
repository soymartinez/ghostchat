import { useState } from "react"
import { addParticipant } from "services/chat"
import Loader from "./loader"

export default function AddUser({ room }) {
  const [username, setUsername] = useState('')
  const [isAdded, setIsAdded] = useState(false)
  const [conflict, setConflict] = useState(false)
  const [loading, setLoading] = useState(false)

  async function handleJoinUser(e) {
    e.preventDefault()
    if (username.length === 0 || username === 'secret') { return setUsername('secret') }

    try {
      setLoading(true)
      const newParticipant = await addParticipant(room, username)
      console.log('newParticipant: ', newParticipant)
      document.getElementById('username').value = ''
      setIsAdded(true)
    } catch (error) {
      if (error.message === 'Conflict') {
        console.log(`It's already in the room 😎`)
        setConflict(true)
      }
      console.log('👶 adding a new participant')
    } finally {
      setUsername('')
      setLoading(false)
    }
  }

  return (
    <div className={`absolute right-0 transition-all rounded-b-3xl 
                            bg-gradient-to-b from-[#0f0f10] via-[#0f0f10]
                            w-full h-52 flex justify-center items-center -z-50 top-0
                            `}>
      <form onSubmit={handleJoinUser} className={`
      flex justify-center items-center relative transition-all -z-30
      ${conflict || username === 'secret' ? 'border-red-500' : 'border-[#262728]'}
      border-2 rounded-xl py-2 px-4 w-full bg-[#151617]
      ${conflict ? 'border-[#3480cc]' : 'border-[#262728]'}`}>
        <input type='text' placeholder='Write a username' id='username' autoFocus autoComplete="off"
          className={`outline-none transition-all w-full lowercase text-center
          bg-transparent placeholder:text-[#3e4044]
          ${username === 'secret'
              ? 'focus:border-red-500 border-red-500 placeholder:text-red-500'
              : ''}
          ${conflict ? 'focus:border-red-500 border-red-500 placeholder:text-red-500' : ''}`}
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
          <strong>{username}</strong> has joined the room 😎
        </div>
        {
          loading ? <div className='absolute right-4'> <Loader size={22} /> </div> : null
        }
      </form>
    </div>
  )
}

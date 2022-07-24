import { useEffect } from 'react'
import { unstable_getServerSession } from 'next-auth'
import { authOptions } from './api/auth/[...nextauth]'
import { useChat } from 'context/context'

import Layout from 'components/layout'
import ConversationInput from 'components/conversation-input'
import Conversation from 'components/conversation'
import Header from 'components/header'

export default function Room({ room }) {
  const { initializeJoinChat } = useChat()

  useEffect(() => {
    initializeJoinChat(room)
  }, [])

  return (
    <Layout page={room}>
      <div className='flex justify-center items-center h-screen'>
        <div className='flex flex-col w-full h-full'>
          <Header room={room} />
          <Conversation />
          <ConversationInput />
        </div>
      </div>
    </Layout>
  )
}

export async function getServerSideProps(context) {
  const session = await unstable_getServerSession(
    context.req,
    context.res,
    authOptions
  )

  if (!session) {
    return {
      redirect: {
        destination: '/signin',
        permanent: false,
      }
    }
  }

  return {
    props: {
      room: context.query.room
    }
  }
}
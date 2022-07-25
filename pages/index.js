import { useEffect } from 'react'
import { unstable_getServerSession } from 'next-auth/next'
import { authOptions } from './api/auth/[...nextauth]'

import { useChat } from 'context/context'
import Layout from 'components/layout'
import Header from 'components/header'
import Form from 'components/form-select-room'
import Subscribed from 'components/subscribed-chats'

export default function Home() {
  const { resetChat } = useChat()

  useEffect(() => {
    resetChat()
    document.getElementById('main').style.opacity = 1
  }, [])

  return (
    <Layout page={`Ghostchat`}>
      <div className='flex justify-center items-center h-full transition-all rounded-2xl overflow-hidden'>
        <div className='flex flex-col justify-center items-center pb-4 pt-16 w-full h-full duration-500 transition-all
          opacity-0 relative' id='main'>
          <Header />
          <Form />
          <Subscribed />
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
    props: {},
  }
} 

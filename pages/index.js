import { useEffect } from 'react'
import { unstable_getServerSession } from 'next-auth/next'
import { authOptions } from './api/auth/[...nextauth]'

import { useChat } from 'context/context'
import Layout from 'components/layout'
import Header from 'components/header'
import Form from 'components/form-select-room'

export default function Home() {
  const { resetChat } = useChat()

  useEffect(() => {
    document.getElementById('main').style.opacity = 1
    resetChat()
  }, []);

  return (
    <Layout page={`Secret chat`}>
      <div className='flex justify-center items-center h-5/6'>
        <div className='flex flex-col justify-center items-center w-full duration-500
          opacity-0 relative' id='main'>
          <Header />
          <Form />
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

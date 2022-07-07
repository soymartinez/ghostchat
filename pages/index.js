import { unstable_getServerSession } from 'next-auth/next'
import { getSession, signOut } from 'next-auth/react'
import Form from 'components/form'
import Icon from 'components/icon'
import Layout from 'components/layout'
import { createOrJoinConversation } from 'services/chat'
import { authOptions } from './api/auth/[...nextAuth]'
import { useEffect, useState } from 'react'

export default function Home({ data }) {
  const [session, setSession] = useState({})
  const { name, email, image } = session.user

  useEffect(() => {
    async function session() {
      const user = await getSession()
      setSession({
        user: user.user,
      })
    }
    session()
  }, []);

  return (
    <Layout page={`Secret chat`}>
      <div className='
            flex justify-center items-center
            w-full h-5/6'>
        <div className='flex flex-col justify-center items-center'>
          <Icon />
          <h1 className='font-bold text-5xl text-white mb-4 tracking-tight'>Secret chat</h1>
          {
            session.user && (
              <div className='flex justify-between items-center 
                              w-full transition-all mb-4' key={email}>
                <span className='text-md text-white font-semibold'>{name}</span>
                <button className='text-md text-black font-bold 
                                  bg-white hover:bg-black hover:text-white
                                  px-3 py-1 rounded-full transition-all' onClick={() => signOut()}>
                  Sign Out
                </button>
              </div>
            )
          }
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

  const req = await fetch('http://localhost:3000/api/get-token')
  const data = await req.json()
  createOrJoinConversation('test', data.token)

  return {
    props: {
      data,
    },
  }
} 

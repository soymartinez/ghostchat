import { unstable_getServerSession } from 'next-auth'
import { getToken } from 'next-auth/jwt'
import { useRouter } from 'next/router'
import { authOptions } from './api/auth/[...nextauth]' 

import Layout from 'components/layout'
import ConversationInput from 'components/conversation-input'
import Conversation from 'components/conversation'
import Header from 'components/header'

export default function Room({ user }) {
  const { query } = useRouter()
  
  return (
    <Layout page={`${query.room}`}>
      <div className='flex justify-center items-center h-5/6'>
        <div className='flex flex-col justify-center items-center w-full'>
          <Header user={user} room={query.room} />
          <Conversation room={query.room} />
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

  const accessTokenNextAuth = await getToken({
    req: context.req,
    secret: process.env.NEXTAUTH_SECRET
  })

  return {
    props: {
      user: accessTokenNextAuth,
    }
  }
}
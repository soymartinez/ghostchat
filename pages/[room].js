import { unstable_getServerSession } from 'next-auth'
import { getToken } from 'next-auth/jwt'
import { useRouter } from 'next/router'
import { authOptions } from './api/auth/[...nextAuth]'

import Layout from 'components/layout'
import ConversationInput from 'components/conversation-input'
import Conversation from 'components/conversation'
import Header from 'components/header'

export default function Room({ data }) {
  const { query } = useRouter()
  
  return (
    <Layout page={`${query.room}`}>
      <div className='flex justify-center items-center h-5/6'>
        <div className='flex flex-col justify-center items-center w-full'>
          <Header user={data} room={query.room} />
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
  } else {
    // try {
    //   joinConversation({room: context.params, token: getAccessToken()})

    // } catch (e) {
    //   return {
    //     redirect: {
    //       destination: '/',
    //       permanent: false,
    //     }
    //   }
    // }
  }

  const accessTokenNextAuth = await getToken({
    req: context.req,
    secret: process.env.NEXTAUTH_SECRET
  })

  return {
    props: {
      data: accessTokenNextAuth,
    }
  }
}
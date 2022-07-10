import { unstable_getServerSession } from 'next-auth'
import { getToken } from 'next-auth/jwt'
import { useRouter } from 'next/router'
import { authOptions } from './api/auth/[...nextAuth]'
import Image from 'next/image'

import Layout from 'components/layout'
import Conversation from 'components/conversation'

export default function Room({ data }) {
  const { name, picture } = data
  const router = useRouter()
  return (
    <Layout page={`${router.query.room}`}>
      <div className='flex justify-center items-center h-5/6'>
        <div className='flex flex-col justify-center items-center w-full'>
          <h1 className='text-center text-transparent text-4xl leading-normal
              bg-clip-text bg-gradient-to-tr
              from-blue-400 to-blue-700 font-bold'>
            {router.query.room}
          </h1>
          <div className='flex justify-end gap-2 w-full'>
            <Image src={picture} className='rounded-full' width={32} height={32} />
            <h1 className='text-lg lowercase font-semibold'>{name}</h1>
          </div>
          <Conversation />
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
      data: accessTokenNextAuth,
    }
  }
}
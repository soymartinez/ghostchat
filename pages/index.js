import Form from 'components/form'
import Icon from 'components/icon'
import Layout from 'components/layout'
import { createOrJoinConversation } from 'services/chat'

export default function Home({ data }) {


  return (
    <Layout page={`Secret chat`}>
      <div className='
            flex justify-center items-center
            w-full h-5/6'>
        <div className='flex flex-col justify-center items-center'>
          <Icon />
          <h1 className='font-bold text-5xl text-white mb-4'>Secret chat</h1>
          <Form />
        </div>
      </div>
    </Layout>
  )
}

export async function getServerSideProps() {
  const req = await fetch('http://localhost:3000/api/get-token')
  const data = await req.json()
  createOrJoinConversation('test', data.token)

  return {
    props: { data },
  }
} 
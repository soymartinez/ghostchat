import Form from 'components/form'
import Layout from 'components/layout'
import { createOrJoinConversation } from 'services/chat'

export default function Home({ data }) {


  return (
    <Layout page={`Secret chat`}>
      <div className='
            flex justify-center items-center
            w-full h-screen'>
        <div>
          <h1 className='font-bold text-3xl'>Secret chat</h1>
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
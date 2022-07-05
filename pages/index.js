import Form from 'components/form'
import Layout from 'components/layout'

export default function Home() {
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

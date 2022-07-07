import { getProviders, signIn } from 'next-auth/react'
import Layout from 'components/layout'
import Github from 'components/github'

export default function Signin({ providers }) {
    return (
        <Layout page={'Login'}>
            <div className='flex justify-center items-center w-full h-5/6'>
                <div className='flex flex-auto flex-col'>
                    <div className='text-center mb-10'>
                        <h1 className='text-white text-[32px] font-extrabold'>
                            Log in to Secret Chat
                        </h1>
                    </div>
                    <div className='w-full max-w-xs self-center'>
                        <div className='pb-4 border-b border-white'>
                            <button onClick={() => signIn(providers.github.id, {callbackUrl: `/`})}
                                className='flex justify-center items-center 
                                          bg-white hover:bg-zinc-100 text-black text-center font-bold
                                            py-3 min-w-full max-w-full mb-3
                                            border border-transparent rounded-md transition-all'>
                                <Github />
                                <span>Continue whit {providers.github.name}</span>
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </Layout>
    )
}

export async function getServerSideProps() {
    const providers = await getProviders()

    return {
        props: {
            providers,
        }
    }
}

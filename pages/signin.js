import { getProviders, signIn } from 'next-auth/react'
import { useState } from 'react'
import Layout from 'components/layout'
import Github from 'components/github'

export default function Signin({ providers }) {
    const [hover, setHover] = useState(false)

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
                        <div className='pb-4'>
                            <button onClick={() => signIn(providers.github.id, { callbackUrl: `/` })}
                                onMouseEnter={() => setHover(true)}
                                onMouseLeave={() => setHover(false)}
                                className='flex justify-center items-center
                                          bg-white hover:bg-transparent hover:text-white text-black 
                                            py-3 min-w-full max-w-full mb-3 border-2 hover:border-white
                                            border-transparent rounded-full transition-all font-bold'>
                                <Github active={hover} />
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

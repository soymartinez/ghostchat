import { signIn } from 'next-auth/react'
import Layout from './layout'

export default function AccessDenied() {
    return (
        <Layout page={'Access denied'}>
            <div className='flex justify-center items-center w-full h-5/6'>
                <div className='flex flex-auto flex-col'>
                    <div className='text-center mb-10'>
                        <h1 className='text-white text-[32px] font-extrabold'>
                            Access denied
                        </h1>
                    </div>
                    <div className='w-full max-w-xs self-center'>
                        <p>
                            This page is only accessible to authenticated users.
                            You must be
                            <a className='mx-1 text-pink-500 hover:underline'
                                href={'/signin'}
                                onClick={(e) => {
                                    e.preventDefault()
                                    signIn()
                                }}>
                                signed
                            </a>
                            in to view this page.
                        </p>
                    </div>
                </div>
            </div>
        </Layout>
    )
}

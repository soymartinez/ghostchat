import Head from 'next/head'
import Navbar from './navbar'

export default function Layout({ children, page }) {
    return (
        <div>
            <Head>
                <title>{page}</title>
                <meta name="description" content="Secret chat whit Nextjs and twilio" />
                <link rel="icon" href="/favicon.ico" />
            </Head>

            {/* <Navbar /> */}

            <main className='max-w-5xl mx-auto
                            px-4 md:px-8 lg:px-12'>
                {children}
            </main>
        </div>
    )
}

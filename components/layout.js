import Head from 'next/head'

export default function Layout({ children, page }) {
    return (
        <div>
            <Head>
                <title>{page}</title>
                <meta name="description" content="Secret chat whit Nextjs and twilio" />
                <link rel="icon" href="/favicon.ico" />
            </Head>
            
            <main className='max-w-lg md:max-w-3xl  mx-auto h-screen
                            px-6 md:px-8 lg:px-12'>
                {children}
            </main>
        </div>
    )
}

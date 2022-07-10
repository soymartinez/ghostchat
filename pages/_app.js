import { SessionProvider } from 'next-auth/react'
import { Context } from 'context/context'
import '../styles/globals.css'

function MyApp({
  Component,
  pageProps: { session, ...pageProps },
}) {
  return (
    <Context>
      <SessionProvider session={session}>
        <Component {...pageProps} />
      </SessionProvider>
    </Context>
  )
}

export default MyApp

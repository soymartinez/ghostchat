import { SessionProvider } from 'next-auth/react'
import { ChatContext } from 'context/context'
import '../styles/globals.css'

function MyApp({
  Component,
  pageProps: { session, ...pageProps },
}) {
  return (
    <ChatContext>
      <SessionProvider session={session}>
        <Component {...pageProps} />
      </SessionProvider>
    </ChatContext>
  )
}

export default MyApp

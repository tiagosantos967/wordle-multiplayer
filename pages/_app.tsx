import '../styles/globals.css'
import type { AppProps } from 'next/app'
import { useEffect } from 'react'
import { createTheme, ThemeProvider } from '@material-ui/core'
import Head from 'next/head'

const theme = createTheme();


const MyApp = ({ Component, pageProps }: AppProps) => {
  useEffect(() => {
    const jssStyles = document.querySelector('#jss-server-side')
      jssStyles?.parentElement?.removeChild(jssStyles)
  }, [])

  return (
    <>
      <Head>
        <title>World Multiplayer</title>
        <meta name="viewport" content="minimum-scale=1, initial-scale=1, width=device-width" />
      </Head>
      <ThemeProvider theme={theme}>
        <Component {...pageProps} />
      </ThemeProvider>
    </>
  )
}

export default MyApp

import { AutenticacaoProvider } from '@/data/contexts/AutenticacaoContext'
import '@/styles/globals.css'
import { MantineProvider } from '@mantine/core'
import type { AppProps } from 'next/app'
import Particles from '@/components/landing/particles'




export default function App({ Component, pageProps }: AppProps) {
  return (
    <MantineProvider theme={{ colorScheme: 'dark' }}>
      <AutenticacaoProvider>
     
      
        <Component {...pageProps} />
        
        <Particles className="absolute inset-0 -z-10 animate-fade-in" quantity={100} />
      </AutenticacaoProvider>
    </MantineProvider>
  )
}

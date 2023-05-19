import '@/styles/globals.css'
import { ChakraProvider } from '@chakra-ui/react'
import { Inter } from 'next/font/google'
const inter = Inter({
  weight: ['100','200','300','400','500','600','700','800','900'], 
  subsets: ['latin'] 
})
export default function App({ Component, pageProps }) {
  return (
    <ChakraProvider>
      <main className={inter.className}>
        <Component {...pageProps} />
      </main>
    </ChakraProvider>
  )
}

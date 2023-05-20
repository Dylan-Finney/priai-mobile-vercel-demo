import Head from 'next/head'
import Image from 'next/image'
import { Inter } from 'next/font/google'
import styles from '@/styles/Home.module.css'
import { Box, Flex, Text } from '@chakra-ui/react'
import App from '@/components/App'
import { useState, createContext } from 'react'
import { register } from 'swiper/element/bundle';
import 'swiper/swiper.min.css';

const inter = Inter({ subsets: ['latin'] })


export async function getServerSideProps({ req }) {
  const username = req.headers['x-custom-username'] || "User";
  const aiName = req.headers['x-custom-ainame'] || "";

  // Return the custom headers as props
  return {
    props: {
      customHeaders: {
        username,
        aiName,
      },
    },
  };
}


export default function Home({ customHeaders }) {
  register();
  console.log("customHeaders",customHeaders)
  return (
    <>
    {/* <Head>
    <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1"/>
    </Head> */}
    {/* <main> */}
    <App username={customHeaders.username} aiName={customHeaders.aiName}/>
    {/* </main> */}
    </>
  )
}

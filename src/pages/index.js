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

export default function Home() {
  register();
  return (
    <App />
  )
}

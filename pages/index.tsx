import Head from 'next/head'
import { Box, Center, Spacer, Stack } from "@chakra-ui/react"
import type { NextPage } from "next"
import {useWallet} from '@solana/wallet-adapter-react';
import styles from "../styles/Home.module.css"
import Navbar from '../components/Navbar'
import Disconnected from '../components/Disconnected'
import Connected from '../components/Connected'

export default function Home() {
  const {connected, publicKey} = useWallet();

  return (
    <div className={styles.container}>
      <Head>
        <title>Builder</title>
        <meta name="The NFT Collection for Buildoors" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Box
        w="full"
        h="calc(100vh)"
        bgImage={publicKey? "" : "url(/home-background.svg)"}
        backgroundPosition="center"
      >
        <Stack w="full" h="calc(100vh)" justify="center">
          <Navbar />
          <Spacer />
          <Center>
            {publicKey ? <Connected /> : <Disconnected />}
          </Center>
          <Spacer />
          <Center>
            <Box marginBottom={4} color="white">
              <a href='' target="_blank" rel="noopener noreferrer">Built with passion</a>
            </Box>
          </Center>
        </Stack>

      </Box>
    </div>
  )
}

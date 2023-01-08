import {FC, ReactNode} from "react"
import Head from "next/head"
import styles from "../styles/Home.module.css"
import {Box, Center, Spacer, Stack} from "@chakra-ui/react"
import NavBar from "./Navbar"
import { useWallet } from "@solana/wallet-adapter-react"

const MainLayout: FC<{children: ReactNode}> = ({children}) => {
    const {connected} = useWallet();

    return (
        <div className={styles.container}>
            <Head>
                <title>Builderr</title>
                <meta name="The NFT Collection for Builderr" />
                <link rel="icon" href="/favicon.ico" />
            </Head>
            <Box
                w="full"
                h="calc(100vh)"
                bgImage={connected ? "" : "url(/home-background.svg)"}
                backgroundPosition="center"
            >
                <Stack w="full" h="calc(100vh)" justify="center">
                    <NavBar />
                    <Spacer />
                    <Center>{children}</Center>
                    <Spacer />

                    <Center>
                        <Box marginBottom={4} color="white">
                            built with passion
                        </Box>
                    </Center>
                </Stack>
            </Box>
        </div>
    )
}

export default MainLayout;
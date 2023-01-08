import {
    Button, 
    Text, 
    HStack, 
    Image, 
    VStack, 
    Container,
    Heading
} from '@chakra-ui/react';
import {MouseEventHandler, useCallback, useState,useMemo, useEffect} from 'react';
import {ArrowForwardIcon} from '@chakra-ui/icons';
import { NextPage } from 'next';
import MainLayout from '../components/MainLayout';
import { useConnection, useWallet } from '@solana/wallet-adapter-react';
import { Metaplex, walletAdapterIdentity } from '@metaplex-foundation/js';
import { PublicKey } from '@solana/web3.js';

const NewMint: NextPage<NewMintProps> = ({mint}) => {
    const [metadata, setMetadata] = useState<any>();
    const {connection} = useConnection();
    const wallet = useWallet();
    const metaplex = useMemo(() => {
        return Metaplex.make(connection)
        .use(walletAdapterIdentity(wallet))
    },[wallet, connection]);

    useEffect(() => {
        metaplex.nfts().findByMint({mintAddress: mint})
        .then(nft => {
            fetch(nft.uri)
            .then(res => res.json())
            .then(metadata => {
                setMetadata(metadata);
            })
        })
    },[mint,metaplex,wallet]);

    const handleClick: MouseEventHandler<HTMLButtonElement> = useCallback(async event => {}, []);

    return (
        <MainLayout>
            <VStack spacing={20}>
                <Container>
                    <VStack spacing={8}>
                        <Heading color="white" as="h1" size="2xl" textAlign="center">
                            A new builderr has appeared!
                        </Heading>

                        <Text color="bodyText" fontSize="x1" textAlign="center">
                            Congratulations! You minted a builderr!<br />
                            Stake to earn rewards and level up!
                        </Text>
                    </VStack>
                </Container>
            </VStack>

            <Image src={metadata?.image ?? ""} width="300px" alt="" />

            <VStack>
                <Button
                    bgColor="accent"
                    color="white"
                    maxWidth="380px"
                    onClick={handleClick}
                >
                    <HStack>
                        <Text>Stake my builderr</Text>
                        <ArrowForwardIcon / >
                    </HStack>
                </Button>
            </VStack>
            
        </MainLayout>
    )
}

interface NewMintProps {
    mint: PublicKey
}

NewMint.getInitialProps = async ({query}) => {
    const {mint} = query;

    if (!mint) throw {error: "no mint"};

    try {
        const mintPubKey = new PublicKey(mint);
        return {mint: mintPubKey};
    } catch {
        throw {error: "invalid mint"};
    }
}

export default NewMint;
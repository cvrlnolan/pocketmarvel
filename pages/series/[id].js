import React from "react"
import Head from "next/head"
import {
    Container,
    Stack,
    SimpleGrid,
    Heading,
    Box,
    Text,
    List,
    Link,
    ListItem,
    Skeleton
} from "@chakra-ui/react"
import Image from "next/image"
import { useRouter } from "next/router"
import axios from "axios"
import useSWR from "swr"
import Navbar from "@/components/layout/navbar"

export default function SeriePage() {

    const router = useRouter()

    const { id } = router.query

    const fetcher = url => axios.get(url).then(res => res.data)

    const { data: serie, error } = useSWR(() => "/api/comics/" + id, fetcher)

    if (error) {
        return (
            <>
                <div>Error encountered ...</div>
            </>
        )
    }


    if (!serie) {
        return (
            <>
                <Head>
                    <title>PocketMarvel | Serie</title>
                </Head>
                <Navbar>
                    <Skeleton height="container.xl">
                        <Box maxW="container.xl" w="full" p={8} rounded="lg" boxShadow="lg"></Box>
                    </Skeleton>
                </Navbar>
            </>
        )
    }

    return (
        <>
            <Head>
                <title>PocketMarvel | {serie.title}</title>
            </Head>
            <Navbar>
                <Container
                    maxW="container.xl"
                    w="full"
                    p={8}
                    rounded="lg"
                    boxShadow="lg"
                    centerContent
                >
                    <Stack alignItems="center" spacing={10}>
                        <Heading as="h2" letterSpacing="tight">
                            {serie.title}
                        </Heading>
                        <Box
                            boxSize={["xs", "sm"]}
                            pos="relative"
                        >
                            <Image
                                src={serie.thumbnail.path + "." + serie.thumbnail.extension}
                                alt="chr_img"
                                layout="fill"
                                objectFit="cover"
                                className="page_image"
                            />
                        </Box>
                        <Text color="gray.500">
                            {serie.description !== null ? serie.description : "No brief description available for this serie. Check out the information links below."}
                        </Text>
                        <SimpleGrid w="full" columns={[1, 2, 3]} spacing={10}>
                            <Stack color="gray.500">
                                <Text fontWeight="bold">Info Links</Text>
                                <List>
                                    {serie.urls.map((link) => (
                                        <ListItem key={link.url}>
                                            <Link
                                                href={link.url}
                                                color="cyan.400"
                                                _hover={{
                                                    textDecoration: "none",
                                                    color: "cyan.900"
                                                }}
                                                isExternal
                                            >
                                                {
                                                    link.type === "detail" && "Serie Link" ||
                                                    link.type === "wiki" && "Wiki"
                                                }
                                            </Link>
                                        </ListItem>
                                    ))}
                                </List>
                            </Stack>
                            <Stack color="gray.500">
                                <Text fontWeight="bold">Characters</Text>
                                <List>
                                    {serie.characters.items.map((character) => (
                                        <ListItem key={character.resourceURI}>{character.name}</ListItem>
                                    ))}
                                    {serie.characters.items.length === 0 && "No character found for this series."}
                                </List>
                            </Stack>
                            <Stack color="gray.500">
                                <Text fontWeight="bold">Comics</Text>
                                <List>
                                    {serie.comics && serie.comics.items.map((comic) => (
                                        <ListItem key={comic.resourceURI}>{comic.name}</ListItem>
                                    ))}
                                </List>
                            </Stack>
                        </SimpleGrid>
                        <Stack direction={["column", "row"]} spacing={2}>
                            <Text fontWeight="bold" color="gray.500">Creators:</Text>
                            <Text color="gray.500">
                                {serie.creators.items.map((creator) => (
                                    creator.name + "-" + creator.role + "," + " "
                                ))}
                            </Text>
                        </Stack>
                    </Stack>
                </Container>
            </Navbar>
        </>
    )
}
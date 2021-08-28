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
    ListItem
} from "@chakra-ui/react"
import Image from "next/image"
import { useRouter } from "next/router"
import axios from "axios"
import useSWR from "swr"
import Navbar from "@/components/layout/navbar"

export default function CharacterPage() {

    const router = useRouter()

    const { id } = router.query

    const fetcher = url => axios.get(url).then(res => res.data)

    const { data: character, error } = useSWR(() => "/api/characters/" + id, fetcher)

    if (error) {
        return (
            <>
                <div>Error encountered ...</div>
            </>
        )
    }


    if (!character) {
        return (
            <>
                <div>Loading...</div>
            </>
        )
    }

    return (
        <>
            <Head>
                <title>PocketMarvel | {character.name}</title>
            </Head>
            <Navbar>
                <Container
                    maxW="container.xl"
                    p={8}
                    rounded="lg"
                    boxShadow="lg"
                    centerContent
                >
                    <Stack align="center" spacing={10}>
                        <Heading as="h2" letterSpacing="tight">
                            {character.name}
                        </Heading>
                        <Box
                            boxSize="sm"
                            pos="relative"
                        >
                            <Image
                                src={character.thumbnail.path + "." + character.thumbnail.extension}
                                alt="chr_img"
                                layout="fill"
                                objectFit="cover"
                                className="page_image"
                            />
                        </Box>
                        <Text color="gray.500">
                            {character.description !== "" ? character.description : "No brief description available for this character. Check out the information links below."}
                        </Text>
                        <SimpleGrid w="full" columns={[1, 2, 3]} spacing={10}>
                            <Stack color="gray.500">
                                <Text fontWeight="bold">Info Links</Text>
                                <List>
                                    {character.urls.map((link) => (
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
                                                    link.type === "detail" && "Biography" ||
                                                    link.type === "wiki" && "Wiki" ||
                                                    link.type === "comiclink" && "Comic Link"
                                                }
                                            </Link>
                                        </ListItem>
                                    ))}
                                </List>
                            </Stack>
                            <Stack color="gray.500">
                                <Text fontWeight="bold">Comics</Text>
                                <List>
                                    {character.comics.items.map((comic) => (
                                        <ListItem key={comic.resourceURI}>{comic.name}</ListItem>
                                    ))}
                                </List>
                            </Stack>
                            <Stack color="gray.500">
                                <Text fontWeight="bold">Series</Text>
                                <List>
                                    {character.series.items.map((serie) => (
                                        <ListItem key={serie.resourceURI}>{serie.name}</ListItem>
                                    ))}
                                </List>
                            </Stack>
                        </SimpleGrid>
                    </Stack>
                </Container>
            </Navbar>
        </>
    )
}
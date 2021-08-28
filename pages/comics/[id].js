import Head from "next/head"
import {
    Container,
    Stack,
    HStack,
    SimpleGrid,
    Heading,
    Box,
    Text,
    List,
    Link,
    ListItem,
    Badge,
    Skeleton
} from "@chakra-ui/react"
import Image from "next/image"
import { useRouter } from "next/router"
import axios from "axios"
import useSWR from "swr"
import Navbar from "@/components/layout/navbar"

export default function ComicPage() {

    const router = useRouter()

    const { id } = router.query

    const fetcher = url => axios.get(url).then(res => res.data)

    const { data: comic, error } = useSWR(() => "/api/comics/" + id, fetcher)

    if (error) {
        return (
            <>
                <div>Error encountered ...</div>
            </>
        )
    }


    if (!comic) {
        return (
            <>
                <Head>
                    <title>PocketMarvel | Comic</title>
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
                <title>PocketMarvel | {comic.title}</title>
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
                            {comic.title}
                        </Heading>
                        <Box
                            boxSize={["xs", "sm"]}
                            pos="relative"
                        >
                            <Image
                                src={comic.thumbnail.path + "." + comic.thumbnail.extension}
                                alt="chr_img"
                                layout="fill"
                                objectFit="cover"
                                className="page_image"
                            />
                        </Box>
                        <HStack spacing={2}>
                            {comic.prices.map((price) => (
                                <Badge key={price.type}>
                                    {price.type === "printPrice" ? "Printed Copy " : "Digital Copy "}
                                    ${price.price}
                                </Badge>
                            ))}
                        </HStack>
                        {comic.textObjects && comic.textObjects.map((text) => (
                            <Text key={text.type} color="gray.500">
                                {text.text}
                            </Text>
                        ))}
                        {comic.textObjects.length === 0 &&
                            <Text color="gray.500">
                                No brief description available for this comic. Check out the information links below.
                            </Text>
                        }
                        <SimpleGrid w="full" columns={[1, 2, 3]} spacing={10}>
                            <Stack color="gray.500">
                                <Text fontWeight="bold">Info Links</Text>
                                <List>
                                    {comic.urls.map((link) => (
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
                                                    link.type === "detail" && "Comic Link" ||
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
                                    {comic.characters.items.map((character) => (
                                        <ListItem key={character.resourceURI}>{character.name}</ListItem>
                                    ))}
                                </List>
                            </Stack>
                            <Stack color="gray.500">
                                <Text fontWeight="bold">Series</Text>
                                <List>
                                    <ListItem>{comic.series.name}</ListItem>
                                </List>
                            </Stack>
                        </SimpleGrid>
                        <Stack direction={["column", "row"]} spacing={2}>
                            <Text fontWeight="bold" color="gray.500">Creators:</Text>
                            <Text color="gray.500">
                                {comic.creators.items.map((creator) => (
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
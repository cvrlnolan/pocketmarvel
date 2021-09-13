import React from "react"
import Head from "next/head"
import axios from "axios"
import useSWR from "swr"
import { useState, useEffect } from "react"
import {
    Container,
    SimpleGrid,
    Flex,
    Input,
    InputGroup,
    InputLeftElement,
    InputRightElement,
    Button,
    Spinner,
    Divider
} from "@chakra-ui/react"
import { SearchIcon } from "@chakra-ui/icons"
import Navbar from "@/components/layout/navbar"
import CharacterBox from "@/components/character/characterBox"
import LoadingBox from "@/components/layout/loadingBox"

export default function Characters() {

    const [offset, setOffset] = useState(50)

    const [value, setValue] = useState({
        search: ""
    })

    const [results, setResults] = useState()

    const [hide, setHide] = useState(true)

    const [loading, setLoading] = useState(false)

    useEffect(() => {
        setOffset(50)
    }, [])

    const fetcher = url => axios.get(url).then(res => res.data)

    const { data: characters, error } = useSWR("/api/characters/", fetcher, { revalidateOnFocus: false })

    const loadMore = async () => {
        setLoading(true)
        await axios.post("/api/characters/load_more", { offset }).then((response) => {
            // console.log(response.data)
            const moreCharacters = JSON.parse(JSON.stringify(response.data))
            moreCharacters.forEach((character) => {
                characters.push(character)
            })
            setOffset(offset + 50)
        }).catch((e) => {
            console.log(e)
            setLoading(false)
        }).finally(() => {
            setLoading(false)
        })
    }

    if (error) {
        return (
            <>
                <div>Error encountered...</div>
            </>
        )
    }

    if (!characters) {
        return (
            <>
                <Navbar>
                    <Container maxW="container.xl" centerContent>
                        <SimpleGrid columns={[2, 2, 3, 4]} spacing={10}>
                            {[...Array(50)].map((e, i) => (
                                <LoadingBox key={i} />
                            ))}
                        </SimpleGrid>
                    </Container>
                </Navbar>
            </>
        )
    }

    const onChange = (e) => {
        const { value, name } = e.target;
        search(value)
        setValue(prevState => ({ ...prevState, [name]: value }))
    }

    const search = async (name) => {
        setHide(false)
        if (name !== "") {
            const res = await axios.post("/api/characters/search", { name })
            const result = await res.data
            // console.log(result)
            setResults(result)
            setHide(true)
            return
        }
        setHide(true)
    }

    const clearButton = () => {
        setResults()
        setValue("")
    }

    return (
        <>
            <Head>
                <title>PocketMarvel | Characters</title>
            </Head>
            <Navbar>
                <Container maxW="container.xl" centerContent>
                    <Flex mb={3}>
                        <InputGroup>
                            <InputLeftElement
                                pointerEvents="none"
                                color="gray.300"
                                fontSize="1.2em"
                            >
                                <SearchIcon />
                            </InputLeftElement>
                            <Input
                                placeholder="Marvel Character.."
                                name="search"
                                onChange={onChange}
                                value={value.search}
                                variant="filled"
                            />
                            <InputRightElement width="4.5rem">
                                <Button
                                    h="1.75rem"
                                    size="sm"
                                    onClick={clearButton}
                                >
                                    Clear
                                </Button>
                            </InputRightElement>
                        </InputGroup>
                    </Flex>
                    <Spinner my={3} color="pink.400" hidden={hide} />
                    {/* Search Results */}
                    {results &&
                        <>
                            <SimpleGrid columns={[2, 2, 3, 4]} spacing={10}>
                                {results.map((result) => (
                                    <CharacterBox key={result.id} character={result} />
                                ))}
                            </SimpleGrid>
                            <Divider my={3} />
                        </>
                    }
                    <SimpleGrid columns={[2, 2, 3, 4]} spacing={10}>
                        {characters.map(character => (
                            <CharacterBox key={character.id} character={character} />
                        ))}
                    </SimpleGrid>
                    <Flex my={3}>
                        <Button
                            colorScheme="pink"
                            onClick={loadMore}
                            isDisabled={offset > 1560}
                            isLoading={loading}
                            loadingText="Loading"
                        >
                            Show More
                        </Button>
                    </Flex>
                </Container>
            </Navbar>
        </>
    )
}

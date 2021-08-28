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
                <div>Loading...</div>
            </>
        )
    }

    return (
        <>
            <Navbar>

            </Navbar>
        </>
    )
}
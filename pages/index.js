import Head from "next/head"
import Link from "next/link"
import {
  Container,
  Stack,
  Heading,
  Text,
  Button
} from "@chakra-ui/react"
import { GiSpiderMask, GiBookPile, GiTv } from "react-icons/gi"
import Navbar from "@/components/layout/navbar"

export default function Home() {

  return (
    <>
      <Head>
        <title>PocketMarvel | Home</title>
      </Head>
      <Navbar>
        <Container maxW="container.xl" centerContent>
          <Stack align="center" spacing={5}>
            <Heading as="h2" letterSpacing="tight">
              Welcome to the Marvel Universe.
            </Heading>
            <Text color="gray.500">Choose a category to browse through below:</Text>
            <Link href="/characters" passHref>
              <Button
                variant="ghost"
                leftIcon={<GiSpiderMask />}
                colorScheme="cyan"
              >
                Characters
              </Button>
            </Link>
            <Link href="/comics" passHref>
              <Button
                variant="ghost"
                leftIcon={<GiBookPile />}
                colorScheme="teal"
              >
                Comics
              </Button>
            </Link>
            <Link href="/series" passHref>
              <Button
                variant="ghost"
                leftIcon={<GiTv />}
                colorScheme="pink"
              >
                Series
              </Button>
            </Link>
          </Stack>
        </Container>
      </Navbar>
    </>
  )
}

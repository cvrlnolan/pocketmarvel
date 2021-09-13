import React from "react"
import {
    Box,
    Stack,
    Text,
    chakra,
    useColorModeValue
} from "@chakra-ui/react"
import Image from "next/image"
import Link from "next/link"

const ComicBox = ({ comic }) => {

    const IMAGE = comic.thumbnail.path + "." + comic.thumbnail.extension

    return (
        <>
            <Link href={`/comics/${comic.id}`} passHref>
                <chakra.a
                    transition="all"
                    transitionDuration="0.5s"
                    _hover={{
                        textDecoration: "none",
                        cursor: "pointer"
                    }}
                >
                    <Box
                        maxW="300px"
                        w="full"
                        rounded="lg"
                        overflow="hidden"
                        role="group"
                        p={6}
                        bg={useColorModeValue("gray.100", "gray.800")}
                        pos="relative"
                        zIndex={1}
                    >
                        <Box
                            h="150px"
                            bg="gray.100"
                            rounded="md"
                            pos="relative"
                            _after={{
                                transition: 'all .3s ease',
                                content: '""',
                                w: 'full',
                                h: 'full',
                                pos: 'absolute',
                                top: 5,
                                left: 0,
                                backgroundImage: `url(${IMAGE})`,
                                filter: 'blur(15px)',
                                zIndex: -1,
                            }}
                            _groupHover={{
                                _after: {
                                    filter: 'blur(20px)',
                                },
                            }}
                        >
                            {/* Character Image */}
                            <Image
                                src={comic.thumbnail.path + "." + comic.thumbnail.extension}
                                alt="char_img"
                                height="150px"
                                width="150px"
                                layout="fill"
                                objectFit="cover"
                            />
                        </Box>
                        <Stack spacing={2} align="center">
                            <Text fontWeight="bold" noOfLines={1}>{comic.title}</Text>
                        </Stack>
                    </Box>
                </chakra.a>
            </Link>
        </>
    )
}

export default ComicBox
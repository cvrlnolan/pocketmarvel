import React from "react"
import {
    Skeleton,
    Box,
    Center,
    useColorModeValue
} from "@chakra-ui/react"

const LoadingBox = () => {
    return (
        <>
            <Box
                maxW="300px"
                w="full"
                rounded="lg"
                overflow="hidden"
                p={6}
                bg={useColorModeValue("gray.100", "gray.800")}
                alignItems="center"
                pos="relative"
            >
                <Center>
                    <Skeleton h="150px" w="100px" pos="relative" />
                </Center>
            </Box>
        </>
    )
}

export default LoadingBox
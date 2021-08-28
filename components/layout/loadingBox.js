import {
    Skeleton
} from "@chakra-ui/react"

const LoadingBox = () => {
    return (
        <>
            <Skeleton h="150px" w="250px" rounded="lg">
            </Skeleton>
        </>
    )
}

export default LoadingBox
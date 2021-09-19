import { useEffect } from "react"
import Dashboard from "./Dashboard"
import { useStoreActions } from "store"
import { Box, Flex } from "@chakra-ui/react"

const Home = () => {
    const setPath = useStoreActions(action => action.setPath)
    useEffect(() => {
        setPath("/")
    }, [setPath])
    return (
        <Flex w="full" h="full" p={8}>
            <Box w="full" pos="relative">
                <Box
                    pos="absolute"
                    top={0}
                    left={0}
                    w="full"
                    h="full"
                    zIndex={2}
                    bgGradient="linear(to-r, white, whiteAlpha.800, white)"
                >
                    <Dashboard />
                </Box>
                <Box
                    pos="absolute"
                    top={0}
                    left={0}
                    w="full"
                    h="full"
                    bgImage="url('/main.png')"
                    backgroundSize="20rem"
                ></Box>
            </Box>
        </Flex>
    )
}

export default Home

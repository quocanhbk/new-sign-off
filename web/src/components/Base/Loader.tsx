import { CircularProgress, Flex } from "@chakra-ui/react"

interface LoaderProps {
    isLoading: boolean
}

const Loader = ({ isLoading }: LoaderProps) => {
    return isLoading ? (
        <Flex
            pos="absolute"
            top={0}
            left={0}
            w="full"
            h="full"
            align="center"
            justify="center"
            direction="column"
            zIndex="overlay"
            bgGradient="radial(blackAlpha.50, transparent)"
            transition="all 1s ease-in-out"
        >
            <CircularProgress isIndeterminate trackColor="white" />
        </Flex>
    ) : null
}

export default Loader

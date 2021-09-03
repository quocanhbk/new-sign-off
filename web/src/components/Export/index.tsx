import { FC } from "react"
import { RouteComponentProps, Router } from "@reach/router"
import Page from "./Page"
import { Box, Flex } from "@chakra-ui/react"

interface ExportProps extends RouteComponentProps {}
const Playground: FC<ExportProps> = () => {
    return (
        <Flex overflow="auto" justify="center" bg="gray.900">
            <Box
                bg="white"
                color="black"
                w="21cm"
                minH="100vh"
                p="0.5cm"
                pos="relative"
                borderLeft="1px"
                borderRight="1px"
                borderColor="gray.200"
                overflow="auto"
            >
                <Router>
                    <Page path="/:id" />
                </Router>
            </Box>
        </Flex>
    )
}

export default Playground

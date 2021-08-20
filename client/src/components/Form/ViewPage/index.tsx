import Detail from "./Detail"
import List from "./List"
import { RouteComponentProps, Router } from "@reach/router"
import Placeholder from "components/Placeholder"
import { Box, Flex } from "@chakra-ui/react"

interface ViewPage extends RouteComponentProps {}

const ViewPage = ({}: ViewPage) => {
    return (
        <Flex h="full">
            <List />
            <Box flex={2} h="full" pos="relative" overflow="hidden">
                <Router style={{ height: "100%" }}>
                    <Detail path="/:id" />
                    <Placeholder default type="FORM_NOT_SELECTED" />
                </Router>
            </Box>
        </Flex>
    )
}

export default ViewPage

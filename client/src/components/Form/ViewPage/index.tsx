import Detail from "./Detail"
import List from "./List"
import { RouteComponentProps, Router } from "@reach/router"
import { Placeholder } from "components/Base"
import { Box, Flex } from "@chakra-ui/react"
import { FC } from "react"

interface ViewPageProps extends RouteComponentProps {}

const ViewPage: FC<ViewPageProps> = ({ location }) => {
    console.log("LOCATION", location)
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

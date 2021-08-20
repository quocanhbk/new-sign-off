import Detail from "./Detail"
import List from "./List"
import { RouteComponentProps, Router } from "@reach/router"
import Placeholder from "components/Placeholder"
import { Box, Flex } from "@chakra-ui/react"

interface ProcedureProps extends RouteComponentProps {}

const Procedure = ({}: ProcedureProps) => {
    return (
        <Flex h="full">
            <List />
            <Box flex={2} h="full" pos="relative" overflow="hidden">
                <Router style={{ height: "100%" }}>
                    <Detail path="/:id" />
                    <Placeholder type="PROCEDURE_NOT_SELECTED" default />
                </Router>
            </Box>
        </Flex>
    )
}

export default Procedure

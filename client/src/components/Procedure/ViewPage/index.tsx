import { Box, Flex } from "@chakra-ui/react"
import { RouteComponentProps, Router } from "@reach/router"
import { Placeholder } from "components/Base"
import { FC } from "react"
import Detail from "./Detail"
import List from "./List"

interface ProcedureProps extends RouteComponentProps {}

const Procedure: FC<ProcedureProps> = () => {
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

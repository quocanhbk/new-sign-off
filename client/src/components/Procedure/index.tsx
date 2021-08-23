import { Router, Redirect } from "@reach/router"
import useMediaQuery from "hooks/useMediaQuery"
import CreatePage from "./CreatePage"
import ViewPage from "./ViewPage"
import { adminEmails } from "constant"
import { useMsal } from "@azure/msal-react"
import { Flex } from "@chakra-ui/react"

const Procedure = () => {
    const device = useMediaQuery()
    const { accounts } = useMsal()
    if (!adminEmails.includes(accounts[0].username) || device !== "PC") return <Redirect to="/" noThrow />

    return (
        <Flex direction="column" h="full" w="full">
            <Router style={{ width: "100%", height: "100%" }}>
                <CreatePage path="/create" />
                <CreatePage path="/create/:id" />
                <ViewPage path="/view/*" />
                <Redirect from="/" to="/procedure/view" noThrow />
            </Router>
        </Flex>
    )
}

export default Procedure

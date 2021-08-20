import { useMsal } from "@azure/msal-react"
import { Flex } from "@chakra-ui/react"
import { Redirect, Router } from "@reach/router"
import { adminEmails } from "constant"
import useMediaQuery from "hooks/useMediaQuery"
import CreatePage from "./CreatePage"
import ViewPage from "./ViewPage"

const Form = () => {
    const device = useMediaQuery()
    const { accounts } = useMsal()
    if (!adminEmails.includes(accounts[0].username) || device !== "PC") return <Redirect to="/" noThrow />
    return (
        <Flex direction="column" h="full" w="full" className="formindex">
            <Router style={{ width: "100%", height: "100%" }}>
                <CreatePage path="/create" />
                <CreatePage path="/create/:id" />
                <ViewPage path="/view/*" />
                <Redirect from="/" to="/form/view" noThrow />
            </Router>
        </Flex>
    )
}

export default Form

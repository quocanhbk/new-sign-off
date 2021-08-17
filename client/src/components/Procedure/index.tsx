import { Router, Redirect } from "@reach/router"
import useMediaQuery from "hooks/useMediaQuery"
import styled from "styled-components"
import CreatePage from "./CreatePage"
import ViewPage from "./ViewPage"
import { adminEmails } from "constant"
import { useMsal } from "@azure/msal-react"

const Container = styled.div`
    display: flex;
    flex-direction: column;
    height: 100%;
    width: 100%;
    & .router {
        height: 100%;
    }
`

const Procedure = () => {
    const device = useMediaQuery()
    const { accounts } = useMsal()
    if (!adminEmails.includes(accounts[0].username) || device !== "PC") return <Redirect to="/" noThrow />

    return (
        <Container>
            <Router className="router">
                <CreatePage path="/create" />
                <CreatePage path="/create/:id" />
                <ViewPage path="/view/*" />
                <Redirect from="/" to="/procedure/view" noThrow />
            </Router>
        </Container>
    )
}

export default Procedure

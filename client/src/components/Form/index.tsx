/* eslint-disable no-unreachable */
/* eslint-disable no-unused-vars */
import { useMsal } from "@azure/msal-react"
import { Redirect, Router } from "@reach/router"
import { adminEmails } from "constant"
import useMediaQuery from "hooks/useMediaQuery"
import styled from "styled-components"
import CreatePage from "./CreatePage"
import ViewPage from "./ViewPage"
const Container = styled.div`
    display: flex;
    flex-direction: column;
    height: 100%;
    width: 100%;
    & .router {
        height: 100%;
        width: 100%;
    }
`

const Form = () => {
    const device = useMediaQuery()
    const { accounts } = useMsal()
    if (!adminEmails.includes(accounts[0].username) || device !== "PC") return <Redirect to="/" noThrow />
    return (
        <Container>
            <Router className="router">
                <CreatePage path="/create" />
                <CreatePage path="/create/:id" />
                <ViewPage path="/view/*" />
                <Redirect from="/" to="/form/view" noThrow />
            </Router>
        </Container>
    )
}

export default Form

import { FC } from "react"
import styled from "styled-components"
import { RouteComponentProps, Router } from "@reach/router"
import Page from "./Page"
import { Flex } from "@chakra-ui/react"

const Container = styled.div`
    background-color: white;
    color: black;
    width: 21cm;
    /* height: 29.7cm; */
    min-height: 100vh;
    padding: 0.5cm;
    position: relative;
    border-left: 1px solid #ccc;
    border-right: 1px solid #ccc;
    overflow: auto;
    display: block;
`
interface ExportProps extends RouteComponentProps {}
const Playground: FC<ExportProps> = () => {
    return (
        <Flex overflow="auto" justify="center">
            <Container className="test">
                <Router>
                    <Page path="/:id" />
                </Router>
            </Container>
        </Flex>
    )
}

export default Playground

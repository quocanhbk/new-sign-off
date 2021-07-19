import React from "react"
import styled from "styled-components"
import { Router } from "@reach/router"
import Export from "./Export"

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

const Playground = () => {
    return (
        <Container className="test">
            <Router>
                <Export path="/:id" />
            </Router>
        </Container>
    )
}

export default Playground

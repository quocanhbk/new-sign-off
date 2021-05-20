/* eslint-disable no-unreachable */
/* eslint-disable no-unused-vars */
import { Router } from '@reach/router';
import React from 'react';
import styled from "styled-components";
import CreatePage from './CreatePage'
import ViewPage from './ViewPage';
const Container = styled.div`
    display:flex;
    flex-direction: column;
    height: 100%;
    width: 100%;
    & .router {
        height: 100%;
    }
`

const Playground3 = () => {
    return (
        <Container>
            <Router className="router">
                <ViewPage path="/" />
                <CreatePage path="create" />
            </Router>
        </Container>
    )
}

export default Playground3
/* eslint-disable no-unreachable */
/* eslint-disable no-unused-vars */
import { Redirect, Router } from '@reach/router';
import React, {useRef, useState} from 'react'
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

const Form = () => {
    return (
        <Container>
            <Router className="router">
                <CreatePage path="/create" />
                <CreatePage path="/create/:id" />
                <ViewPage path="/view/*" />
                <Redirect from="/" to="/form/view" noThrow/>
            </Router>
        </Container>
    )
}

export default Form
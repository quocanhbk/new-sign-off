/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import React, { useState } from 'react'
import styled from 'styled-components'
import Detail from './Detail'
import List from './List'
import {Router} from '@reach/router'
import Placeholder from 'components/Placeholder'
import useMediaQuery from 'hooks/useMediaQuery'
import useRequests from './List/useRequests'

const StyleContainer = styled.div`
    display:flex;
    width: 100%;
    height: 100%;
`
const DetailWrapper = styled.div`
    flex: 10;
    height: 100%;
    background-color: ${(props) => props.theme.color.background.secondary};
    color: ${(props) => props.theme.color.text.primary};
    border-left: 1px solid ${(props) => props.theme.color.border.primary};
    display: flex;
    flex-direction: column;
    position: relative;
    & .search-router {
        height: 100%;
    }
`;


const Search = ({mode}) => {
    let device = useMediaQuery()
    let hook = useRequests(mode)

    return (
        <StyleContainer>
            {device === "PC" ? 
            <>
            <List mode={mode} hook={hook}/>
            <DetailWrapper>
                <Router className="search-router">
                    <Detail path="/:id" mode={mode}/>
                    <Placeholder type="REQUEST_NOT_SELECTED" default/>
                </Router>
            </DetailWrapper>
            </> :
            <DetailWrapper>
                <Router className="search-router">
                    <Detail path="/:id" mode={mode}/>
                    <List mode={mode} hook={hook} default/>
                </Router>
            </DetailWrapper>
            }

        </StyleContainer>
    )
}

Search.defaultProps = {
    mode: "search"
}

export default Search
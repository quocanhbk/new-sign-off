/* eslint-disable no-unused-vars */
import React from 'react'
import styled from 'styled-components'
import Detail from './Detail'
import List from './List'
import {Router} from '@reach/router'
import NoSelectionIndicator from './Detail/NoSelectionIndicator'

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
const Search = () => {

    return (
        <StyleContainer>
            <List/>
            <DetailWrapper>
                <Router className="search-router">
                    <Detail path="/:id"/>
                    <NoSelectionIndicator path="/"/>
                </Router>
            </DetailWrapper>
        </StyleContainer>
    )
}

export default Search
import React from 'react'
import styled from 'styled-components'
import DisplayContent from './DisplayContent'
import List from './List'

const StyleContainer = styled.div`
    display:flex;
    width: 100%;
    height: 100%;
`
const Search = () => {
    return (
        <StyleContainer>
            <List/>
            <DisplayContent/>
        </StyleContainer>
    )
}

export default Search
import React from 'react'
import styled from 'styled-components'
import Searchbar from './Searchbar'
import VerticalLine from './VerticalLine'

const StyledIcon = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
    border: 1px solid ${props => props.theme.color.border.primary};
    border-radius: 0.5rem;
    padding: 0.5rem;
    color: ${props => props.theme.color.background.primary};
    background: ${props => props.theme.color.fill.primary};
    cursor: pointer;
    gap: 0.5rem;
`

const Filterer = () => {
    return (
        <StyledIcon>
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-funnel" viewBox="0 0 16 16">
                <path d="M1.5 1.5A.5.5 0 0 1 2 1h12a.5.5 0 0 1 .5.5v2a.5.5 0 0 1-.128.334L10 8.692V13.5a.5.5 0 0 1-.342.474l-3 1A.5.5 0 0 1 6 14.5V8.692L1.628 3.834A.5.5 0 0 1 1.5 3.5v-2zm1 .5v1.308l4.372 4.858A.5.5 0 0 1 7 8.5v5.306l2-.666V8.5a.5.5 0 0 1 .128-.334L13.5 3.308V2h-11z"/>
            </svg>
            Filter
        </StyledIcon>
    )
}

const StyledToolbar = styled.div`
    display: flex;
    padding: 0.5rem;
    gap: 0.5rem;
`

const Toolbar = () => {
    return (
        <StyledToolbar>
            <Searchbar/>
            <VerticalLine/>
            <Filterer/>
        </StyledToolbar>
    )
}

export default Toolbar

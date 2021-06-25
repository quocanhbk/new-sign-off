import React from 'react'
import styled from 'styled-components'

const Container = styled.div`
    //background: ${props => props.theme.color.background.primary};
    border: 1px solid ${props => props.theme.color.border.primary};
    padding: 0.5rem;
    text-align: center;
    color: ${props => props.theme.color.text.secondary};
    font-style: italic;
    user-select: none;
`

const NoFile = () => {
    return (
        <Container>
            No File
        </Container>
    )
}

export default NoFile
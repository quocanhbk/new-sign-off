import React from 'react'
import styled from 'styled-components'
const Container = styled.div`
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;
    gap: 0.5rem;
    background: ${props => props.theme.color.background.primary};
    & svg {
        margin-bottom: 0.5rem;
    }
    & .sub {
        color: ${props => props.theme.color.text.secondary};
    }
`

const NoSelectionIndicator = () => {
    return (
        <Container>
            <svg xmlns="http://www.w3.org/2000/svg" width="56" height="56" fill="currentColor" className="bi bi-info-circle-fill" viewBox="0 0 16 16">
                <path d="M8 16A8 8 0 1 0 8 0a8 8 0 0 0 0 16zm.93-9.412-1 4.705c-.07.34.029.533.304.533.194 0 .487-.07.686-.246l-.088.416c-.287.346-.92.598-1.465.598-.703 0-1.002-.422-.808-1.319l.738-3.468c.064-.293.006-.399-.287-.47l-.451-.081.082-.381 2.29-.287zM8 5.5a1 1 0 1 1 0-2 1 1 0 0 1 0 2z"/>
            </svg>
            <p className="headline">Select an item to read</p>
            <p className="sub">Nothing is selected</p>
        </Container>
    )
}

export default NoSelectionIndicator
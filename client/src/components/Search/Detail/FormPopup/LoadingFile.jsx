import React from 'react'
import styled, { keyframes } from "styled-components";

const spin = keyframes`
    from {transform: rotate(0deg)}
    to {transform: rotate(360deg)}
`
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
        animation: ${spin} 1s linear 0s infinite forwards normal;
    }
    & .sub {
        color: ${props => props.theme.color.text.secondary};
    }
`

const LoadingFile = () => {
    return (
        <Container>
            <svg xmlns="http://www.w3.org/2000/svg" width="56" height="56" fill="currentColor" className="bi bi-circle-half" viewBox="0 0 16 16">
                <path d="M8 15A7 7 0 1 0 8 1v14zm0 1A8 8 0 1 1 8 0a8 8 0 0 1 0 16z"/>
            </svg>
            <p className="headline">File is being uploaded</p>
            <p className="sub">Please wait...</p>
        </Container>
    )
}

export default LoadingFile
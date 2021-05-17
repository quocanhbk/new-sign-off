/* eslint-disable react/prop-types */
import React from 'react'
import styled from "styled-components";

const Container = styled.button`
    background: ${props => props.theme.color.fill.primary};
    color: ${props => props.theme.color.background.primary};
    padding: 0.5rem;
    text-align: center;
    border-radius: 0.5rem;
    cursor: pointer;
    border: none;
    font-size: 1rem;
`

const Button = ({onClick, children}) => {
    return (
        <Container onClick={onClick}>
            {children}
        </Container>
    )
}

export default Button
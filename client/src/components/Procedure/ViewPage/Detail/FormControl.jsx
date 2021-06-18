/* eslint-disable react/prop-types */
import React from 'react'
import styled, { css } from 'styled-components'

const Container = styled.div`
    flex: 1;
    display:flex;
    flex-direction: column;
    gap: 0.25rem;
`
const Headline = styled.label`
    font-size: .9rem;
`
const Sub = styled.p`
    font-size: 0.8rem;
    color : ${props => props.theme.color.text.secondary};
    font-style: italic;
    height: 1rem;
    ${props => props.noSpace && css`
        height: auto;
        margin-top: -0.25rem;
    `}
`

const Asterisk = styled.span`
    color: ${props => props.theme.color.fill.danger};
    padding-left: 0.3rem;
`
const FormControl = ({headline, children, sub, required, noSpace}) => {
    return (
        <Container>
            <Headline>
                {headline} 
                {required && <Asterisk>*</Asterisk>}
            </Headline>
            {children}
            <Sub noSpace={noSpace}>{sub}</Sub>
        </Container>
    )
}

export default FormControl
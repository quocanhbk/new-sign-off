/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import React from 'react'
import styled, { css } from 'styled-components'

const Container = styled.div`
    flex: 1;
    display: flex;
    flex-direction: column;
    & > * + * {
		margin-top: 0.25rem;
	}
`
const Headline = styled.label`
    font-size: .9rem;

    ${props => props.disabled && css`
        color: ${props => props.theme.color.text.disabled};
    `}
`

const Sub = styled.p`
    font-size: 0.8rem;
    color : ${props => props.theme.color.text.secondary};
    font-style: italic;
    height: ${props => props.readOnly ? "auto" : "1rem"};
    ${props => props.noSpace && css`
        height: auto;
        margin-top: -0.25rem;
    `}
    ${props => props.error && css`
        color : ${props => props.theme.color.text.danger};
    `}
`

const Asterisk = styled.span`
    color: ${props => props.theme.color.fill.danger};
    padding-left: 0.3rem;
    ${props => props.disabled && css`
        color: ${props => props.theme.color.text.disabled};
    `}
`
const FormControl = ({headline, children, sub, required, noSpace, errorText, readOnly, disabled}) => {
    return (
        <Container className="form-control">
            <Headline disabled={disabled}>
                {headline} 
                {required && <Asterisk disabled={disabled}>*</Asterisk>}
            </Headline>
            {children}
            {errorText ? 
                <Sub noSpace={noSpace} error>{errorText}</Sub> :
                <Sub noSpace={noSpace} readOnly={readOnly}>{sub}</Sub>
            }
        </Container>
    )
}

export default FormControl
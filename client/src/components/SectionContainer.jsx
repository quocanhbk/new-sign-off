/* eslint-disable react/prop-types */
import React from 'react'
import styled, { css } from "styled-components";

const Container = styled.div`
    display: flex;
    flex-direction: column;
    & > * + * {
		margin-top: 0.4rem;
	}
`
const Headline = styled.h3`
    font-weight: 500;
    color: ${props => props.theme.color.fill.secondary};
    //font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;
    font-size: 1.1rem;
    ${props => props.haveBorder && css`
        font-size: 1.2rem;
        padding-bottom: 0.5rem;
        border-bottom: 1px solid ${props => props.theme.color.border.primary};
    `}
`
const Body = styled.div`
    
`
const SectionContainer = ({headline, children, haveBorder}) => {
    return (
        <Container>
            <Headline haveBorder={haveBorder}>
                {headline}
            </Headline>
            <Body>
                {children}
            </Body>
        </Container>
    )
}

export default SectionContainer
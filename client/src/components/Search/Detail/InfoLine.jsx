/* eslint-disable react/prop-types */
import React from 'react'
import styled from 'styled-components'

const Container = styled.tr`
`
const Headline = styled.td`
    vertical-align: top;
    padding: 0.4rem 0;
    /* border-bottom: 1px solid ${props => props.theme.color.border.primary}; */
    position: relative;
    padding-left: 1rem;
    &:before {
        content: '';
        position: absolute;
        width: 5px;
        height: 5px;
        border-radius: 4px;
        background: ${props => props.theme.color.text.primary};
        left: 0;
        top: 50%;
        transform: translateY(-50%);
    }
`
const Content = styled.td`
    text-align: right;
    /* border-bottom: 1px solid ${props => props.theme.color.border.primary}; */
`
const InfoLine = ({headline, content, span}) => {
    return (
        <Container>
            <Headline colSpan={span ? 2 : 1}>{headline}</Headline>
            {content && <Content>{content}</Content>}
        </Container>
    )
}

export default InfoLine
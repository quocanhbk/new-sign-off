/* eslint-disable react/prop-types */
import React from 'react'
import styled from 'styled-components'

const Container = styled.div`
    display: flex;
    justify-content: space-between;
    position: relative;
    margin-left: 1rem;
    &:before {
        content: '';
        position: absolute;
        height: 4px;
        width: 4px;
        border-radius: 99px;
        background: ${props => props.theme.color.text.secondary};
        left: -1rem;
        top: 50%;
        transform: translateY(-50%);
    }

`
const Left = styled.div`
`
const Right = styled.div`

`

const InfoLine = ({headline, content}) => {
    return (
        <Container>
            <Left>{headline}</Left>
            <Right>{content}</Right>
        </Container>
    )
}

export default InfoLine
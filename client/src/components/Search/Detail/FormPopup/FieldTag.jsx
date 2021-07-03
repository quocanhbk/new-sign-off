/* eslint-disable react/prop-types */
import React from 'react'
import styled, {  } from 'styled-components'

const Container = styled.div`
    position: absolute;
    min-width: 6rem;
    min-height: 2rem;
    color: #0000CC;
    padding-left: 0.2rem;
    z-index: 3;
    user-select: none;
    font-size: ${props => props.fontSize || "1rem"};
    & p {
        word-break: keep-all;
    }
    & .field-tag-name {
        position: absolute;
        transform: translateY(-110%);
        font-size: 0.8rem;
        font-style: italic;
        color: #A3A3A3;
    }

    & .type {
        position: absolute;
        bottom: 0;
        transform: translateY(100%);
        font-size: 0.8rem;
        font-style: italic;
        color: #A3A3A3;
    }
`
const Background = styled.div`
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    border-radius: 0.25rem;
    z-index: -1;
`
const FieldTag = ({data, fontSize}) => {
    return (
        <Container 
            fontSize={fontSize}
            style={{left: data.position.X + "%", top: data.position.Y + "%", width: data.size.width + "%", height: data.size.height + "%"}}
        >
            <span className="field-tag-name">{data.name}</span>
            <p>{data.content}</p>
            {/* <span className="type">Field</span> */}
            <Background/>
        </Container>
    )
}

export default FieldTag
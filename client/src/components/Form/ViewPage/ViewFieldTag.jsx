/* eslint-disable react/prop-types */
import React from 'react'
import styled from 'styled-components'

const Container = styled.div`
    position: absolute;
    min-width: 6rem;
    min-height: 2rem;
    color: black;
    padding-left: 0.2rem;
    z-index: 3;
    user-select: none;
    cursor: pointer;
    font-size: ${props => props.fontSize || "1rem"};
    & p {
        word-break: keep-all;
    }
    & .name {
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
    //border: 1px solid #000000;
    background: #fff493a4;
    border-radius: 0.2rem;
    z-index: -1;
`
const FieldTag = ({data, fontSize}) => {
    return (
        <Container
            fontSize={fontSize}
            style={{left: data.x_position + "%", top: data.y_position + "%", width: data.width + "%", height: data.height + "%"}}
        >
            <span className="name" data-html2canvas-ignore>{data.field}</span>
            <p>
                {data.value}
            </p>
            <span className="type" data-html2canvas-ignore>Field</span>
            <Background data-html2canvas-ignore/>
        </Container>
    )
}

export default FieldTag
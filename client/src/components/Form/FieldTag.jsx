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
    background: #fffef6;
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
    border: 1px solid #000000;
    background: #fff493;
    border-radius: 0.2rem;
    z-index: -1;
`
let Resizer = styled.div`
    position: absolute;
    cursor: se-resize;
    right: 0;
    bottom: 0;
    height: 0.4rem;
    width: 0.4rem;
    transform: translate(45%,45%);
    background: #02467e;
    border-radius: 0.2rem;
`
const FieldTag = ({data, onMouseDown, onMouseDownResizer, reff, fontSize}) => {
    return (
        <Container 
            ref={reff}
            onMouseDown={onMouseDown}
            fontSize={fontSize}
            style={{left: data.position.X + "%", top: data.position.Y + "%", width: data.size.width + "%", height: data.size.height + "%"}}
        >
            <Resizer onMouseDown={onMouseDownResizer} data-html2canvas-ignore/>
            <span className="name" data-html2canvas-ignore>{data.name}</span>
            <p>
                {data.content}
            </p>
            <span className="type" data-html2canvas-ignore>Field</span>
            <Background data-html2canvas-ignore/>
        </Container>
    )
}

export default FieldTag
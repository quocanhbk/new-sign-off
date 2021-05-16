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
    background: #f6f8ff;
    & span {
        position: absolute;
        transform: translateY(-110%);
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
    border: 1px solid #02467e;
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
    transform: translate(50%,50%);
    background: #02467e;
    border-radius: 0.2rem;
`
const FieldTag = ({data, onMouseDown, onMouseDownResizer}) => {
    return (
        <Container 
            onMouseDown={onMouseDown}
            style={{left: data.position.X + "%", top: data.position.Y + "%", width: data.size.width + "%", height: data.size.height + "%"}}
        >
            <Resizer onMouseDown={onMouseDownResizer} data-html2canvas-ignore/>
            <span data-html2canvas-ignore>{data.name}</span>
            <p>
                {data.content}
            </p>
            <Background data-html2canvas-ignore/>
        </Container>
    )
}

export default FieldTag
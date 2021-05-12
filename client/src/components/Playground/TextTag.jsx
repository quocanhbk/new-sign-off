/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import React from 'react'
import styled from 'styled-components'

const StyledTextTag = styled.div`
    position: absolute;
    background: #fff9d6;
    border: 1px solid black;
    transform: translate(-50%, -50%);
    width: 100px;
    height: 24px;
    color: black;
    cursor: pointer;
`
const NameTag = styled.div`
    color: black;
    font-size: 0.8rem;
    position: absolute;
    transform: translateY(-100%);
`
const TextTag = ({position, name, content, selectTag}) => {
    const handleOnClick = (e) => {
        selectTag(name)
    }

    return (
        <StyledTextTag style={{top: position.top + "%", left: position.left + "%"}} onClick={handleOnClick}>
            <NameTag>{name}</NameTag>
            {content}
        </StyledTextTag>
    )
}

export default TextTag
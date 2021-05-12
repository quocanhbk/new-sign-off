/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import React from 'react'
import styled from 'styled-components'

const StyledTextTag = styled.div`
    position: absolute;
    background: #ffe553;
    transform: translate(-50%, -50%);
    width: 15%;
    height: 3%;
    color: black;
    cursor: pointer;
`
const NameTag = styled.div`
    color: black;
    font-size: 0.8rem;
    position: absolute;
    transform: translateY(-100%);
`
const ContentTag = styled.div`
    height: 100%;
    display: flex;
    align-items: center;
    flex-wrap: wrap;
    line-height: 0.9;
`

const TextTag = ({position, name, content, selectTag}) => {
    const handleOnClick = (e) => {
        selectTag(name)
    }

    return (
        <StyledTextTag style={{top: position.top + "%", left: position.left + "%"}} onClick={handleOnClick}>
            <NameTag>{name}</NameTag>
            <ContentTag>
                {content}
            </ContentTag>
            
        </StyledTextTag>
    )
}

export default TextTag
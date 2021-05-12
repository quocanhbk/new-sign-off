/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import React, { useRef, useState } from 'react'
import styled from "styled-components";
import TextTag from './TextTag'

const Container = styled.div`
    position: relative;
`

const ImageItem = ({src, isAdd, addTextTag, tagList, selectTag}) => {
    const ref = useRef()
    const [curPos, setCurPos] = useState()
    const [mouseIn, setmouseIn] = useState(false)

    const handleMouseMove = (e) => {
        let ele = ref.current.getBoundingClientRect()
        setCurPos({top: (e.clientY - ele.y)/ele.height*100 , left: (e.clientX - ele.x)/ele.width*100})
    }
    const handleMouseEnter = (e) => {
        setTimeout(() => {
            setmouseIn(true)
        }, 20);
    }
    const handleMouseLeave = (e) => {
        setmouseIn(false)
    }
    const handleClick = (e) => {
        addTextTag(curPos)
    }
    return (
        <Container ref={ref} onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave} onMouseMove={handleMouseMove} onMouseDown={handleClick} >
            {tagList.map(tag => <TextTag position={tag.position} key={tag.name} name={tag.name} content={tag.content} selectTag={selectTag}/>)}
            {isAdd && mouseIn && <TextTag position={curPos}/>}
            <img src={src} alt=""/>f
        </Container>
    )
}

export default ImageItem
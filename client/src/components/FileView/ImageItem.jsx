/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import React, { useRef, useState } from 'react'
import styled from "styled-components";
import TextTag from '../Playground/TextTag'

const Container = styled.div`
    position: relative;
`

const ImageItem = ({src, tagList}) => {
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

    return (
        <Container ref={ref} onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave} onMouseMove={handleMouseMove} >
            {tagList.map(tag => <TextTag position={tag.position} key={tag.name} name={tag.name} content={tag.content}/>)}
            <img src={src} alt=""/>
        </Container>
    )
}

export default ImageItem
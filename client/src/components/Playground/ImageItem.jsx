/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import React, { useRef, useState } from 'react'
import styled from "styled-components";

const Container = styled.div`
    position: relative;
`
const Reddot = styled.div`
    position: absolute;
    background: red;
    transform: translate(-50%, -50%);
    width: 20px;
    height: 20px;
`
const ImageItem = ({src, isAdd, setIsAdd}) => {
    const [arr, setArr] = useState([])
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
        if (isAdd) {
            let ele = e.target.getBoundingClientRect()
            setArr([...arr, curPos])
            setIsAdd(false)
        }
    }
    return (
        <Container ref={ref} onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave} onMouseMove={handleMouseMove} onMouseDown={handleClick} >
            {arr.map(dot => <Reddot style={{top: dot.top + "%", left: dot.left + "%"}} key={dot.top}/>)}
            {isAdd && mouseIn && <Reddot style={{top: curPos.top + "%", left: curPos.left + "%"}}/>}
            <img src={src} alt=""/>
        </Container>
    )
}

export default ImageItem
/* eslint-disable react/prop-types */
import React, { useState, useEffect } from 'react'
import styled, { keyframes } from 'styled-components'
import PropTypes from 'prop-types'
import {BsX} from 'react-icons/bs'
import { getFader } from 'utils/color'

const XContainer = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
    color: ${props => props.theme.color.fill.danger};
    border-radius: 99px;
    transition: all 0.25s ease-in-out;
    cursor: pointer;
    &:hover {
        background: ${props => getFader(props.theme.color.border.primary, 0.5)};
    }
`
const X = ({onClick}) => {
    return (
        <XContainer onClick={onClick}>
            <BsX size="1.5rem"/>
        </XContainer>
    )
}

const StyledModal = styled.div`
    color: ${props => props.theme.color.text.primary};
    position: ${props => props.fixed ? "fixed" : "absolute"};
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    display: ${props => props.visible ? "flex" : "none"};
    align-items: center;
    justify-content: center;
    transition: opacity 200ms ease-in-out;
    opacity: ${props => props.ani ? 1: 0};
    z-index: 995;
    
`;
const opa = keyframes`
    from {opacity: 0;}
    to {opacity: 1;}
`;

const StyledBackground = styled.div`
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
`;
const StyledContainer = styled.div`
    display: flex;
    flex-direction: column;
    //background: ${props => props.theme.color.background.primary};
    transition: all 500ms linear;
    height: ${props => props.height || "auto"};
    width: ${props => props.width || "auto"};
    max-width: ${props => props.maxWidth || "1280px"};
    max-height: ${props => props.maxHeight || "720px"};
    overflow: ${props => props.overflow ? props.overflow : "visible"};
    animation: ${opa} 0.25s ease-out 0s 1 forwards normal;
    z-index: 999;
    box-shadow: ${props => props.theme.shadow};
`;
const StyledTitle = styled.div`
    border-bottom: 1px solid ${props => props.theme.color.border.primary};
    font-size: 1.2rem;
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 0 1rem;
    & h4 {
        padding: 0.5rem 0;
        font-weight: 500;
    }
`;
const StyledBody = styled.div`
    height: 100%;
`;
const Modal = (props) => {
    const [open, setOpen] = useState(props.visible)
    const [runAni, setRunAni] = useState(true)
    let { onClickOutside, visible, overflow, fixed} = props
    useEffect(() => {
        if (!props.visible) {
            setRunAni(false)
            setTimeout(() => {
                setOpen(visible)
            }, 200);
        } else {
            setOpen(visible)
            setRunAni(true)
        }

    }, [props.visible])
    useEffect(() => {
        let escape = document.addEventListener("keydown", (e) => {
            if (e.key === "Escape")  {onClickOutside() }
        })

        return(() => {
            document.removeEventListener("keydown", escape)
        })
      }, [onClickOutside])
    return (
        <StyledModal visible={open} ani={runAni} fixed={fixed}>
            <StyledContainer ani={runAni} height={props.height} width={props.width} overflow={overflow} maxWidth={props.maxWidth} maxHeight={props.maxHeight}>
                {props.title && 
                    <StyledTitle>
                        <h4>{props.title}</h4>
                        <X onClick={props.onClickOutside}/>
                    </StyledTitle>}
                {open &&
                <StyledBody className="body">
                    {props.children}
                </StyledBody>}
            </StyledContainer>
            <StyledBackground onClick={props.onClickOutside} />
        </StyledModal>
    )
}
Modal.propTypes = {
    onClickOutside: PropTypes.func,
    visible: PropTypes.bool,
    title: PropTypes.string,
    overflow: PropTypes.string,
    children2: PropTypes.bool
}
export default Modal
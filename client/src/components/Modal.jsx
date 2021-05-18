/* eslint-disable react/prop-types */
import React, { useState, useEffect } from 'react'
import styled, { keyframes } from 'styled-components'
import {getDarker} from '../utils/color'
import PropTypes from 'prop-types'

const StyledModal = styled.div`
    color: ${props => props.theme.color.text.primary};
    position: fixed;
    top: 0;
    left: 0;
    width: 100vw;
    height: 100vh;
    display: ${props => props.visible ? "block" : "none"};
    transition: opacity 200ms linear;
    opacity: ${props => props.ani ? 1: 0};
    z-index: 995;
    
`;
const ExitIcon = styled.div`
    --clr: ${props => props.theme.color.fill.danger};
    left: 100%;
    top: 50%;
    transform: translate(-140%, -50%) rotate(45deg);
    width: 24px;
    height: 24px;
    position: absolute;
    transition: all 0.3s ease-in-out;
    &:hover {
        transform: translate(-140%, -50%) rotate(225deg);
        cursor: pointer;
    }
    &::before {
        border-radius: 25%;
        position: absolute;
        content: "";
        top: 2px;
        left: 10px;
        width: 4px;
        height: 18px;
        background: var(--clr);
    }
    &::after {
        border-radius: 25%;
        position: absolute;
        content: "";
        top: 2px;
        left: 10px;
        width: 4px;
        height: 18px;
        background: var(--clr);
        transform: rotate(90deg);
    }
`;
const modalEnter = keyframes`
    from { top: -20%; }
    to { top: 50%; }
`;
const grayen = keyframes`
    from { background: rgba(0,0,0,0);}
    to {background: rgba(0,0,0,0.3);}
`;
const StyledBackground = styled.div`
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    animation: ${grayen} 0.5s ease-out 0s 1 forwards normal;
`;
const StyledContainer = styled.div`
    border: 1px solid ${props => props.theme.color.border.primary};
    background: ${props => props.theme.color.background.primary};
    border-radius: 8px;
    display: inline-block;
    overflow: hidden;
    position: absolute;
    left: ${props => props.children2 ? '40%' : '50%'};
    transition: all 500ms linear;
    height: ${props => props.height || "auto"};
    width: ${props => props.width || "auto"};
    transform: ${props => !props.children2 ? "translate(-50%, -50%)" : "translate(-50%, -70%)"};
    animation: ${modalEnter} 0.5s ease-out 0s 1 forwards normal;
    z-index: 999;
    box-shadow: ${props => props.theme.shadow};
`;
const StyledTitle = styled.h1`
    position: relative;
    border-bottom: 2px solid ${props => props.theme.color.border.primary};
    font-size: 1.4rem;
    padding: 0.5rem 1rem;
    text-align: left;
    box-shadow: 0px 0px 5px ${props => getDarker(props.theme.color.border.primary)};
`;
const StyledBody = styled.div`
    padding: 8px 16px;
`;
const Modal = (props) => {
    const [open, setOpen] = useState(props.visible)
    const [runAni, setRunAni] = useState(true)
    let { onClickOutside } = props
    useEffect(() => {
        if (!props.visible) {
            setRunAni(false)
            setTimeout(() => {
                setOpen(props.visible)
            }, 200);
        } else {
            setOpen(props.visible)
            setRunAni(true)
        }

    }, [props.visible])
    useEffect(() => {
        document.addEventListener("keydown", (e) => {
            if (e.key === "Escape")  {onClickOutside() }
        })

        return(() => {
            document.removeEventListener("keydown", (e) => {
                if (e.key === "Escape") { onClickOutside() }
            })
        })
      }, [onClickOutside])
    return (
        <StyledModal visible={open} ani={runAni}>
            <StyledContainer ani={runAni} {...props}>
                {props.title && 
                    <StyledTitle>
                        <ExitIcon onClick={props.onClickOutside}/>
                        {props.title}
                    </StyledTitle>}
                <StyledBody>
                    {props.children}
                </StyledBody>
            </StyledContainer>
            <StyledBackground onClick={props.onClickOutside} />
        </StyledModal>
    )
}
Modal.propTypes = {
    onClickOutside: PropTypes.func,
    visible: PropTypes.bool,
    title: PropTypes.string,
    children2: PropTypes.bool
}
export default Modal
/* eslint-disable react/prop-types */
import { useState, useEffect } from "react"
import styled, { keyframes } from "styled-components"
import PropTypes from "prop-types"
import { BsX } from "react-icons/bs"
import { getFader } from "../utils/color"

const XContainer = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    color: ${props => props.theme.color.fill.danger};
    border-radius: 99px;
    transition: all 0.25s ease-in-out;
    cursor: pointer;
    &:hover {
        background: ${props => getFader(props.theme.color.border.primary, 0.5)};
    }
`
const X = ({ onClick }) => {
    return (
        <XContainer onClick={onClick}>
            <BsX size="1.5rem" />
        </XContainer>
    )
}

const StyledModal = styled.div`
    color: ${props => props.theme.color.text.primary};
    position: fixed;
    top: 0;
    left: 0;
    width: 100vw;
    height: 100vh;
    display: ${props => (props.visible ? "block" : "none")};
    transition: opacity 200ms linear;
    opacity: ${props => (props.ani ? 1 : 0)};
    z-index: 995;
`
const modalEnter = keyframes`
    from { top: -20%; opacity: 0;}
    to { top: 50%; opacity: 1;}
`
const grayen = keyframes`
    from { background: rgba(0,0,0,0);}
    to {background: rgba(0,0,0,0.3);}
`
const StyledBackground = styled.div`
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    animation: ${grayen} 0.5s ease-out 0s 1 forwards normal;
`
const StyledContainer = styled.div`
    display: flex;
    flex-direction: column;
    //border: 1px solid ${props => props.theme.color.border.primary};
    background: ${props => props.theme.color.background.primary};
    border-radius: 0.5rem;
    position: absolute;
    left: 50%;
    transition: all 500ms linear;
    height: ${props => props.height || "auto"};
    width: ${props => props.width || "auto"};
    transform: translate(-50%, -50%);
    overflow: hidden;
    animation: ${modalEnter} 0.25s ease-out 0s 1 forwards normal;
    z-index: 999;
    box-shadow: ${props => props.theme.shadow};
`
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
`
const StyledBody = styled.div`
    height: 100%;
`
const Modal = props => {
    const [open, setOpen] = useState(props.visible)
    const [runAni, setRunAni] = useState(true)
    let { onClickOutside } = props
    useEffect(() => {
        if (!props.visible) {
            setRunAni(false)
            setTimeout(() => {
                setOpen(props.visible)
            }, 200)
        } else {
            setOpen(props.visible)
            setRunAni(true)
        }
    }, [props.visible])
    useEffect(() => {
        document.addEventListener("keydown", e => {
            if (e.key === "Escape") {
                onClickOutside()
            }
        })

        return () => {
            document.removeEventListener("keydown", e => {
                if (e.key === "Escape") {
                    onClickOutside()
                }
            })
        }
    }, [onClickOutside])
    return (
        <StyledModal visible={open} ani={runAni}>
            <StyledContainer ani={runAni} height={props.height} width={props.width}>
                {props.title && (
                    <StyledTitle>
                        <h4>{props.title}</h4>
                        <X onClick={props.onClickOutside} />
                    </StyledTitle>
                )}
                <StyledBody className="body">{props.children}</StyledBody>
            </StyledContainer>
            <StyledBackground onClick={props.onClickOutside} />
        </StyledModal>
    )
}
Modal.propTypes = {
    onClickOutside: PropTypes.func,
    visible: PropTypes.bool,
    title: PropTypes.string,
    children2: PropTypes.bool,
}
export default Modal

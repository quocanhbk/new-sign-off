/* eslint-disable react/prop-types */
import { useState, useEffect } from "react"
import styled, { keyframes } from "styled-components"
import { getFader } from "utils/color"
const StyledModal = styled.div`
    color: ${props => props.theme.color.text.primary};
    position: ${props => (props.fixed ? "fixed" : "absolute")};
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    display: ${props => (props.visible ? "flex" : "none")};
    align-items: center;
    justify-content: center;
    transition: opacity 200ms ease-in-out;
    opacity: ${props => (props.ani ? 1 : 0)};
    z-index: 995;
`
const opa = keyframes`
    from {opacity: 0;}
    to {opacity: 1;}
`

const StyledBackground = styled.div`
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: radial-gradient(rgba(0, 0, 0, 0.7), rgba(0, 0, 0, 0.5)); //${props =>
        getFader(props.theme.color.background.primary, 0.8)}
`
const StyledContainer = styled.div`
    display: flex;
    flex-direction: column;
    //background: ${props => props.theme.color.background.primary};
    transition: all 500ms linear;
    height: ${props => props.height || "auto"};
    width: ${props => props.width || "auto"};
    max-width: ${props => props.maxWidth || "1280px"};
    max-height: ${props => props.maxHeight || "720px"};
    overflow: ${props => (props.overflow ? props.overflow : "visible")};
    animation: ${opa} 0.25s ease-out 0s 1 forwards normal;
    z-index: 999;
    box-shadow: ${props => props.theme.shadow};
`
const StyledBody = styled.div`
    height: 100%;
`
const Modal = props => {
    const [open, setOpen] = useState(props.visible)
    const [runAni, setRunAni] = useState(true)
    let { onClickOutside, visible, overflow, fixed } = props
    useEffect(() => {
        if (!props.visible) {
            setRunAni(false)
            setTimeout(() => {
                setOpen(visible)
            }, 200)
        } else {
            setOpen(visible)
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
        <StyledModal visible={open} ani={runAni} fixed={fixed}>
            <StyledContainer
                ani={runAni}
                height={props.height}
                width={props.width}
                overflow={overflow}
                maxWidth={props.maxWidth}
                maxHeight={props.maxHeight}
            >
                {open && <StyledBody className="body">{props.children}</StyledBody>}
            </StyledContainer>
            <StyledBackground onClick={props.onClickOutside} />
        </StyledModal>
    )
}
export default Modal

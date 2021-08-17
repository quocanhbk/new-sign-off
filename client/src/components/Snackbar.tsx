import { useEffect, useState } from "react"
import styled, { keyframes } from "styled-components"

const snackbarIn = keyframes`
    from { opacity: 0;}
    to { opacity: 1; }
`
const snackbarOut = keyframes`
    from { opacity: 1; }
    to { opacity: 0; }
`

const StyledSnackbarWrapper = styled.div`
    position: fixed;

    ${props =>
        props.horizontal === "right"
            ? "right: 20px;"
            : props.horizontal === "left"
            ? "left: 1rem;"
            : "left:50%;transform: translateX(-50%);"}
    ${props => (props.vertical === "top" ? "top: 1rem;" : "bottom: 2rem;")}
    transition: all 500ms linear;
    animation: ${props => (props.slideIn ? snackbarIn : snackbarOut)} 0.25s ease-in-out 0s 1 forwards normal;
    display: ${props => (props.visible ? "block" : "none")};
    z-index: 999;
    box-shadow: 0px 3px 5px -1px rgba(0, 0, 0, 0.2), 0px 6px 10px 0px rgba(0, 0, 0, 0.14),
        0px 1px 18px 0px rgba(0, 0, 0, 0.12);
    min-width: 288px;
`

interface SnackbarProps {
    timeOut?: number
    visible: boolean
    onClose: () => void
    position?: string
    children: JSX.Element
}

const Snackbar = ({ visible, timeOut = 5000, onClose, position = "bottomCenter", children }: SnackbarProps) => {
    const getHorizontalPosition = position => {
        if (position === "topLeft" || position === "bottomLeft") return "left"
        if (position === "topRight" || position === "bottomRight") return "right"
        return "center"
    }

    const getVerticalPosition = position => {
        if (position === "bottomLeft" || position === "bottomCenter" || position === "bottomRight") return "bottom"
        return "top"
    }
    const [open, setOpen] = useState(false)
    const [slideIn, setSlideIn] = useState(true)
    useEffect(() => {
        if (!visible) {
            setSlideIn(false)
            setTimeout(() => {
                setOpen(visible)
            }, 250)
        } else {
            setOpen(visible)
            setSlideIn(true)
        }
    }, [visible])

    useEffect(() => {
        const autoHide = setTimeout(() => {
            onClose()
        }, timeOut)
        return () => clearTimeout(autoHide)
    })

    return (
        <StyledSnackbarWrapper
            horizontal={getHorizontalPosition(position)}
            vertical={getVerticalPosition(position)}
            visible={open}
            slideIn={slideIn}
        >
            {children}
        </StyledSnackbarWrapper>
    )
}

export default Snackbar

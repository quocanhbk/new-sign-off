/* eslint-disable react/display-name */
/* eslint-disable react/prop-types */
import React, { forwardRef } from "react"
import FillButton from "./FillButton"
import FadeButton from "./FadeButton"
import GhostButton from "./GhostButton"

const Button = forwardRef(({ type, ...props }, ref) => {
    return type === "fill" ? (
        <FillButton {...props} ref={ref}>
            {props.children}
        </FillButton>
    ) : type === "ghost" ? (
        <GhostButton {...props} ref={ref}>
            {props.children}
        </GhostButton>
    ) : (
        <FadeButton {...props} ref={ref}>
            {props.children}
        </FadeButton>
    )
})

export default Button

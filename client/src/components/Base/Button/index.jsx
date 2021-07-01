/* eslint-disable react/prop-types */
import React from 'react'
import FillButton from './FillButton'
import FadeButton from './FadeButton'
import GhostButton from './GhostButton'

const Button = ({type, ...props}) => {
    return type === "fill" ? <FillButton {...props}>{props.children}</FillButton> : 
    type === "ghost" ? <GhostButton {...props}>{props.children}</GhostButton> : 
    <FadeButton {...props}>{props.children}</FadeButton>
}

export default Button
/* eslint-disable react/prop-types */
import React from 'react'
import styled, { css } from "styled-components";
import { getFader } from '../utils/color';

const Container = styled.button`
    padding: ${props => props.padding};
    border-radius: ${props => props.radius};
    cursor: pointer;
    border: none;
    font-size: ${props => props.fontSize};
    display: flex;
    align-items: center;
    justify-content: center;
    gap: ${props => props.gap};

    ${props => props.variant === "contained" ? css`
        background: ${props => props.theme.color.fill[props.color]};
        border: 1px solid ${props => props.theme.color.fill[props.color]};
        color: ${props => props.theme.color.background.primary};

        &:hover {
            background: ${props => getFader(props.theme.color.fill[props.color], 0.8)};
        }
        &:active {
            background: ${props => getFader(props.theme.color.fill[props.color], 0.5)};
        }
    ` : props.variant === "outline" ? css`
        background: transparent;
        border: 1px solid ${props => props.theme.color.fill[props.color]};
        color: ${props => props.theme.color.fill[props.color]};

        &:hover {
            background: ${props => getFader(props.theme.color.border.primary, 0.5)}
        }
        &:active {
            background: ${props => getFader(props.theme.color.border.primary, 1)}
        }
    ` : props.variant === "ghost" ? css`
        background: transparent;
        color: ${props => props.color ? props.theme.color.fill[props.color] : "inherit"};
        
        &:hover {
            background: ${props => getFader(props.theme.color.border.primary, 0.5)}
        }
        &:active {
            background: ${props => getFader(props.theme.color.border.primary, 1)}
        }
    ` : css`
        background: ${props => getFader(props.theme.color.border.primary, 0.5)};
        color: ${props => props.theme.color.text[props.color]};
        border: 1px solid ${props => props.theme.color.border.primary};

        &:hover {
            background: ${props => getFader(props.theme.color.border.primary, 0.8)};
        }
        &:active {
            background: ${props => getFader(props.theme.color.border.primary, 1)};
        }
    `
    }

    ${props => props.normalBorder && css`
        border-color: ${props => props.theme.color.border.primary};
    `}

`

const Button = ({onClick, children, padding, radius, fullWidth, color, variant, gap, normalBorder, fontSize}) => {
    return (
        <Container 
            onClick={onClick} 
            padding={padding}
            radius={radius}
            fullWidth={fullWidth}
            color={color}
            variant={variant}
            gap={gap}
            normalBorder={normalBorder}
            fontSize={fontSize}
        >
            {children}
        </Container>
    )
}

Button.defaultProps = {
    padding: "0.5rem 1rem",
    radius: "0.2rem",
    fullWidth: false,
    color: "primary",
    variant: "contained",
    gap: "1rem",
    fontSize: "1rem"
}

export default Button
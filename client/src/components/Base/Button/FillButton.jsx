/* eslint-disable react/prop-types */
import React from 'react'
import styled, { css } from "styled-components";
import { getFader } from 'utils/color';

const Container = styled.button`
    padding: ${props => props.padding};
    border-radius: ${props => props.radius};
    cursor: pointer;
    border: none;
    font-size: ${props => props.fontSize};
    font-weight: ${props => props.weight};
    display: flex;
    align-items: center;
    justify-content: center;
    gap: ${props => props.gap};
    pointer-events: ${props => props.readOnly ? "none" : "all"};

    color: ${props => props.theme.color.background.primary};
    background: ${props => props.theme.color.fill[props.color]};

    ${props => props.disabled && css`
        color: ${props => props.theme.color.text.disabled};
        pointer-events: none;
    `}

    &:hover {
        background: ${props => getFader(props.theme.color.fill[props.color], 0.9)};
    }
    &:active {
        background: ${props => getFader(props.theme.color.fill[props.color], 0.8)};
    }

`

const FillButton = ({className, onClick, children, padding, radius, fullWidth, color, gap, fontSize, weight, disabled, readOnly}) => {
    return (
        <Container 
            className={className}
            onClick={onClick} 
            padding={padding}
            radius={radius}
            fullWidth={fullWidth}
            color={color}
            gap={gap}
            fontSize={fontSize}
            weight={weight}
            disabled={disabled}
            readOnly={readOnly}
        >
            {children}
        </Container>
    )
}

FillButton.defaultProps = {
    padding: "0.5rem 1rem",
    radius: "0.2rem",
    fullWidth: false,
    color: "primary",
    variant: "contained",
    gap: "1rem",
    fontSize: "1rem",
    weight: "600",
    readOnly: false
}

export default FillButton
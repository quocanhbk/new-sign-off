/* eslint-disable react/prop-types */
import React from "react"
import styled from "styled-components"

const Container = styled.div`
    display: flex;
    border-radius: 0.2rem;
    overflow: hidden;
    margin-top: 0.5rem;
    & > * {
        flex: 1;
    }
    & > * + * {
        border-left: 1px solid ${(props) => props.theme.color.border.primary};
    }
`

const ButtonGroup = ({ children, value, onSelect }) => {
    const handleSelect = (newValue) => {
        if (newValue === value) onSelect(null)
        else onSelect(newValue)
    }

    return (
        <Container>
            {children.map((child) =>
                React.cloneElement(child, {
                    key: child.props.value,
                    onClick: () => handleSelect(child.props.value),
                    radius: "0rem",
                    type: value === child.props.value ? "fill" : "fade",
                    padding: "0.4rem 0.8rem",
                    weight: "400",
                })
            )}
        </Container>
    )
}

export default ButtonGroup

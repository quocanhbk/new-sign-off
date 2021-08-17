/* eslint-disable react/prop-types */
import styled from "styled-components"
import { getFader } from "utils/color"

const Container = styled.div`
    display: flex;
    & > * + * {
        margin-left: 0.5rem;
    }
    padding: 0.2rem 0.5rem;
    align-items: center;
    color: ${props => props.theme.color.text[props.color || "primary"]};
    background: ${props => props.theme.color.background.secondary};
    border-bottom: 1px solid ${props => props.theme.color.border.primary};
    cursor: pointer;
    font-size: 0.9rem;
    &:hover {
        background: ${props => getFader(props.theme.color.border.primary, 0.5)};
    }
`
interface IconWrapperProps {
    onClick?
    color?
    children?
}

const IconWrapper = ({ onClick, color, children }: IconWrapperProps) => {
    return (
        <Container color={color} onClick={onClick}>
            {children}
        </Container>
    )
}

export default IconWrapper

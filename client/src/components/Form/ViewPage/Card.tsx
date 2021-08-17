import styled, { css } from "styled-components"
import { getFader } from "utils/color"
import { BsFileEarmarkText } from "react-icons/bs"

const CardWrapper = styled.div`
    border: 1px solid ${props => props.theme.color.border.primary};
    border-radius: 0.2rem;
    //box-shadow: ${props => props.theme.shadow};
    display: flex;
    position: relative;
    & > * + * {
        margin-left: 1rem;
    }
    padding: 0.5rem 1rem;
    cursor: pointer;
    color: ${props => props.theme.color.text.primary};
    overflow: hidden;

    ${props =>
        props.active &&
        css`
            background: ${props => getFader(props.theme.color.border.primary, 0.5)};
            color: ${props => props.theme.color.fill.primary};
            font-weight: 600;
            &:hover {
                background: ${props => props.theme.color.border.primary};
            }
        `}

    &:hover {
        background: ${props => getFader(props.theme.color.border.primary, 0.5)};
    }
`
let IconWrapper = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
`
let InfoWrapper = styled.div`
    display: flex;
    flex: 1;
    flex-direction: column;
    & > * + * {
        margin-top: 0.2rem;
    }
`
let FormName = styled.div`
    -webkit-line-clamp: 1;
    -webkit-box-orient: vertical;
    overflow: hidden;
    text-overflow: ellipsis;
    display: -webkit-box;
`
function Card({ name, onClick, active }) {
    return (
        <CardWrapper onClick={onClick} active={active}>
            <IconWrapper>
                <BsFileEarmarkText size="1.2rem" />
            </IconWrapper>
            <InfoWrapper>
                <FormName>{name}</FormName>
            </InfoWrapper>
        </CardWrapper>
    )
}

export default Card

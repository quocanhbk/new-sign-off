/* eslint-disable react/prop-types */
import styled from "styled-components"
import Avatar from "./Avatar"
import { BsCheck, BsDash, BsX } from "react-icons/bs"

const Span = styled.span`
    width: auto;
    position: relative;
    &.advisor_flow {
        &:before {
            content: "";
            position: absolute;
            width: 3px;
            height: 50%;
            background: ${props => props.theme.color.fill.primary};
            top: 90%;
            margin-left: 50%;
            transform: translateX(-50%);
        }
    }
`
const Icon = styled.span`
    position: absolute;
    bottom: 0;
    right: 0;
    background: ${props =>
        props.theme.color.fill[
            props.status === "approved" ? "success" : props.status === "rejected" ? "danger" : "warning"
        ]};
    color: ${props => props.theme.color.background.primary};
    padding: 0.1rem;
    border-radius: 99px;
    display: flex;
    align-items: center;
`

function AvatarStatus({ src, status }) {
    return (
        <Span>
            <Avatar src={src} width="2.5rem" height="2.5rem" />
            <Icon status={status}>
                {status === "approved" ? (
                    <BsCheck size="0.8rem" />
                ) : status === "rejected" ? (
                    <BsX size="0.8rem" />
                ) : (
                    <BsDash size="0.8rem" />
                )}
            </Icon>
        </Span>
    )
}
export default AvatarStatus

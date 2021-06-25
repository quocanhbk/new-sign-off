/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
// Request Card, used to display in Search and Sign Page
import React from 'react';
import styled, { css } from 'styled-components'
import {BiDislike, BiLike, BsChevronRight, BsClock, BsExclamation, GiPauseButton} from 'react-icons/all'
import {getFader} from 'utils/color'
import { navigate } from '@reach/router';

const Container = styled.div`
    border: 1px solid ${props => props.theme.color.border.primary};
    border-radius: 0.5rem;
    display: flex;
    box-shadow: ${props => props.theme.shadow};

    ${props => props.active && css`
        background: ${props => getFader(props.theme.color.border.primary, 0.5)};
        color: ${props => props.theme.color.fill.primary};
        &:hover {
            background: ${props => props.theme.color.border.primary};
        }
    `}
`
const DivInfo = styled.div`
    flex: 1;
    padding: 0.5rem;
    display: flex;
    flex-direction: column;
    gap: 0.4rem;
`
const Title = styled.div`
    -webkit-line-clamp: 1;
    -webkit-box-orient: vertical;
    overflow: hidden;
    text-overflow: ellipsis;
    display: -webkit-box;
    font-weight: 500;
    color: ${props => props.theme.color.fill.primary};
`
const Line = styled.div`
    display: flex;
    gap: 0.5rem;
    color: ${props => props.theme.color.text.secondary};
    & span {
        font-size: 0.8rem;
        cursor: pointer;
    }
`
const StyleButton = styled.button`
    cursor: pointer;
    color: ${props => props.theme.color.text.secondary};
    background: transparent;
    border: none;
    padding: 0.5rem;
    border-radius: 99px;
    display: grid;
    place-items: center;
    border: 1px solid transparent;
    &:hover {
        background: ${props => getFader(props.theme.color.border.primary, 0.5)};
    }
    &:active {
        background: ${props => props.theme.color.border.primary};
    }
    &:focus {
        border-color: ${props => props.theme.color.border.primary};
    }
`
const ApproveStatus = styled.span`
    background: ${(props) => 
        props.status === "Approved" ? props.theme.color.fill.success : 
        props.status === "Rejected" ? props.theme.color.fill.danger : 
        props.status === "Pending" ? props.theme.color.fill.warning : 
        props.theme.color.fill.secondary};
    color: ${(props) => props.theme.color.background.primary};
    padding: 0.2rem 0.4rem;
    border-radius: 0.2rem;
    display: flex;
    align-items: center;
    gap: 0.2rem;
    
`
const RequestType = styled.span`
    background: ${(props) => props.theme.color.border.primary};
    color: ${props => props.theme.color.text.primary};
    text-align: center;
    padding: 0.2rem 0.4rem;
    border-radius: 0.2rem;
`
const UrgentTag = styled.span`
    background: ${(props) => props.theme.color.fill.danger};
    color: ${props => props.theme.color.background.primary};
    text-align: center;
    padding: 0.2rem 0.4rem 0.2rem 0;
    border-radius: 0.2rem;
    display: inline-flex;
    align-items: center;
`
const ButtonContainer = styled.div`
    display: flex;
    align-items: center;
    padding: 0.5rem;
`
const Deadline = styled.span`
    color: ${props => props.theme.color.text[props.overdue ? "danger" : "inherit"]};
`
const formatDate = (dateString) => {
    let date = new Date(dateString)
    return date.getDate() + "/" + (date.getMonth() + 1) + "/" + date.getFullYear()
}

const Card = ({id, title, type, createdBy, status, deadline, page, priority, active}) => {

    const renderIcon = (status) => {
        switch(status) {
            case "Approved":
                return <BiLike/>
            case "Pending":
                return <BsClock/>
            case "Rejected":
                return <BiDislike/>
            default:
                return <GiPauseButton/>
        }
    }

    return (
        <Container active={active}>
            <DivInfo>
                <Title>{title}</Title>
                <Line>
                    <span>Created: {createdBy}</span>
                    {status === "Pending" && 
                        <>
                            <span>|</span>
                            <Deadline overdue={(new Date(deadline)).getTime() < (new Date()).getTime()}>Deadline: {formatDate(deadline)}</Deadline>
                        </>
                    }
                </Line>
                <Line>
                    <ApproveStatus status={status}>
                        {renderIcon(status)}
                        {status}
                    </ApproveStatus>
                    <RequestType>{type}</RequestType>
                    {priority === "Urgent" && <UrgentTag><BsExclamation size="1rem"/>Urgent</UrgentTag>}
                </Line>
            </DivInfo>
            <ButtonContainer>
                <StyleButton onClick={() => navigate(`/${page}/${id}`)}><BsChevronRight size="1.2rem"/></StyleButton>
            </ButtonContainer>
            
        </Container>
    )
}

export default Card;
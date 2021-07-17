/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
// Request Card, used to display in Search and Sign Page
import React, {memo} from 'react';
import styled, { css } from 'styled-components'
import {BsChevronRight, BsClock, BsDot, BsStarFill, GiPauseButton} from 'react-icons/all'
import {getFader} from 'utils/color'
import { navigate } from '@reach/router';
import Button from 'components/Base/Button'
import StatusTag from '../StatusTag'

const Container = styled.div`
    border: 1px solid ${props => props.theme.color.border.primary};
    border-radius: 0.5rem;
    display: flex;
    box-shadow: ${props => props.theme.shadow};
    margin-bottom: 0.5rem;
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
    & > * + * {
		margin-top: 0.4rem;
	}
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
    & > * + * {
		margin-left: ${props => props.gap || "0.5rem"};
	}
    align-items: center;
    color: ${props => props.theme.color.text.secondary};
    & span {
        font-size: 0.8rem;
        cursor: pointer;
    }
    ${props => props.last && css`
        padding-top: 0.2rem;
    `}
`
const ButtonContainer = styled.div`
    display: flex;
    align-items: center;
    padding: 0.5rem;
`

const formatDate = (dateString) => {
    let date = new Date(dateString)
    return date.getDate() + "/" + (date.getMonth() + 1) + "/" + date.getFullYear()
}

const Card = ({page, active, data, set}) => {
    const {id, title, status, priority, type, deadline, author} = data
    const overdue = (new Date(deadline)).getTime() < (new Date()).getTime()
    return (
        <Container active={active}>
            <DivInfo>
                <Title>{title}</Title>
                <Line gap="0.2rem">
                    <span onClick={() => set("createdBy", author.id, author.name)}>Created: {author.name}</span>
                    {(status === "Pending" || status === "Revising") && 
                        <>
                            <BsDot size="0.8rem"/>
                            <span>Deadline: {formatDate(deadline)}</span>
                        </>
                    }
                </Line>
                <Line last>
                    <StatusTag status={status} onClick={() => set("status", status)}/>
                    <Button weight="400" gap="0.2rem" padding="0.2rem 0.4rem" fontSize="0.8rem" onClick={() => set("type", type)}>{type}</Button>
                    {priority === "Urgent" && status === "Pending" &&
                        <Button weight="400" type="fade" gap="0.2rem" color="danger" padding="0.2rem 0.4rem" fontSize="0.8rem" onClick={() => set("priority", priority)}>
                            <BsStarFill/><p>Urgent</p>
                        </Button>
                    }
                    {overdue && <Button weight="400" readOnly color="danger" padding="0.2rem 0.4rem" fontSize="0.8rem">Overdue</Button>}
                </Line>
            </DivInfo>
            <ButtonContainer>
                <Button padding="0.5rem" radius="99px" type="ghost" onClick={() => {navigate(`/${page}/${id}`);}}><BsChevronRight size="1.2rem"/></Button>
            </ButtonContainer>
            
        </Container>
    )
}

// memo is a higher order component that help reduces render times
export default memo(Card);
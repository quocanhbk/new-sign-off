/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
// Request Card, used to display in Search and Sign Page
import React from 'react';
import styled, { css } from 'styled-components'
import {BiDislike, BiLike, BsChevronRight, BsClock, BsDot, BsStarFill, GiPauseButton} from 'react-icons/all'
import {getFader} from 'utils/color'
import { navigate } from '@reach/router';
import Button from 'components/Button'
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
    gap: ${props => props.gap || "0.5rem"};
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
    const genColor = () => {
		switch (status) {
			case "Approved":
				return "success"
			case "Rejected":
				return "danger"
			case "Draft":
				return "secondary"
			case "Pending":
				return "warning"
			case "Revising":
				return "info"
			default:
				return "primary"
		}
	}
	const renderIcon = () => {
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
    const overdue = (new Date(deadline)).getTime() < (new Date()).getTime()
    return (
        <Container active={active}>
            <DivInfo>
                <Title>{title}</Title>
                <Line gap="0.2rem">
                    <span onClick={() => set("createdBy", author.id, author.name)}>Created: {author.name}</span>
                    {status === "Pending" && 
                        <>
                            <BsDot size="0.8rem"/>
                            <span>Deadline: {formatDate(deadline)}</span>
                        </>
                    }
                </Line>
                <Line last>
                    <Button gap="0.2rem" color={genColor()} padding="0.2rem 0.4rem" fontSize="0.8rem" onClick={() => set("status", status)}>{renderIcon()}{status}</Button>
                    <Button gap="0.2rem" variant={"abc"} padding="0.2rem 0.4rem" fontSize="0.8rem" onClick={() => set("type", type)}>{type}</Button>
                    {priority === "Urgent" && 
                        <Button gap="0.2rem" color="info" padding="0.2rem 0.4rem" fontSize="0.8rem" onClick={() => set("priority", priority)}>
                            <BsStarFill/>Urgent
                        </Button>
                    }
                    {overdue && 
                        <Button variant="outline" readOnly color="danger" padding="0.2rem 0.4rem" fontSize="0.8rem">Overdue</Button>}
                </Line>
            </DivInfo>
            <ButtonContainer>
                <Button padding="0.5rem" radius="99px" variant="ghost" onClick={() => navigate(`/${page}/${id}`)}><BsChevronRight size="1.2rem"/></Button>
            </ButtonContainer>
            
        </Container>
    )
}

export default Card;
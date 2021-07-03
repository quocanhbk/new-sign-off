/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import React from "react"
import {getAvatar} from 'api/user'
import {useStoreActions} from 'easy-peasy'
import styled from "styled-components"
import {getFader} from "utils/color"
const Container = styled.li`
    list-style: none;
    padding: 0.5rem 1rem;
    border-radius: 0.5rem;
    cursor: pointer;
    user-select: none;
    background: ${props => getFader(props.theme.color.border.primary, 0.5)};
    &:hover {
        background: ${props => getFader(props.theme.color.border.primary, 0.8)};
    }
    &:active {
        background: ${props => getFader(props.theme.color.border.primary, 1)};
    }
`
const Title = styled.p`
    margin-bottom: 0.5rem;
    -webkit-line-clamp: 1;
    -webkit-box-orient: vertical;
    overflow: hidden;
    text-overflow: ellipsis;
    display: -webkit-box;
    color: ${props => props.theme.color.text.primary};
    font-weight: 500;
`

const UserTag = styled.div`
    display: flex;
    gap: 0.5rem;
    align-items: center;
    & img {
        height: 1.2rem;
        border-radius: 99px;
    }
    & p {
        color: ${props => props.theme.color.text.secondary};
        font-style: italic;
        font-size: 0.8rem;
    }
    
`
const RequestTag = ({title, name, email, id}) => {
    const setPath = useStoreActions(action => action.setPath)

    return (
        <Container onClick={() => setPath("/sign/" + id)}>
            <Title>{title}</Title>
            <UserTag>
                <img src={getAvatar(email)} alt={email}/>
                <p>{name}</p>
            </UserTag>
        </Container>
    )
}

export default RequestTag
/* eslint-disable react/prop-types */
import React from 'react';
import styled, { css } from 'styled-components'
import {BsChevronRight, BsPlayFill, BsStopFill} from 'react-icons/all'
import {getFader} from 'utils/color'
const CardWrapper = styled.div`
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
        & ${Title} {
            font-weight: 600;
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
const Status = styled.span`
    background: ${(props) => props.running ? props.theme.color.fill.success : props.theme.color.fill.danger};
    color: ${(props) => props.theme.color.background.primary};
    padding: 0.2rem 0.4rem;
    border-radius: 0.2rem;
    display: flex;
    align-items: center;
    gap: 0.2rem;
    
`
const ButtonContainer = styled.div`
    display: flex;
    align-items: center;
    padding: 0.5rem;
`
const Card = ({title, isActive, createdBy, active, onClick}) => {
    return (
        <CardWrapper active={active}>
            <DivInfo>
                <Title>{title}</Title>
                <Line>
                    <span>Created by: {createdBy && createdBy.name}</span>
                </Line>
                <Line>
                    <Status running={isActive}>
                        {isActive ? <BsPlayFill/> : <BsStopFill/>}
                        {isActive ? "Running" : "Stopped"}
                    </Status>
                </Line>
            </DivInfo>
            <ButtonContainer>
                <StyleButton onClick={onClick}><BsChevronRight size="1rem"/></StyleButton>
            </ButtonContainer>
            
        </CardWrapper>
    )
}

export default Card;
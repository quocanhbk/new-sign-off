/* eslint-disable react/prop-types */
import React from 'react';
import styled from 'styled-components'
import IconStatus from './IconStatus';

const CardWrapper = styled.div`
    border: 1px solid ${props => props.theme.color.border.primary};
    border-radius: 0.5rem;
    background-color: ${(props) =>
        props.selected ? props.theme.color.background.secondary : 'transparent'};
    box-shadow: ${props => props.theme.shadow};
    
    display: flex;
    position: relative;
    min-height: 7rem;
    flex-direction: column;

    padding: 1rem;
    cursor: pointer;

    &:hover {
        background: ${props => props.theme.color.background.secondary};
    }
`
const StyleTypes = styled.span`
    flex: 1;
    display:flex;
    justify-content: flex-end;
    overflow: hidden;
    position:absolute;
    top: 0;
    right: 5%;

    background: ${props => props.theme.color.border.primary};
    color: ${(props) => props.theme.color.text.primary};
    padding: 0.2rem 1rem;
    font-size: 0.8rem;

    border-bottom-left-radius: 0.5rem;
    border-bottom-right-radius: 0.5rem;

    &.process{
        background: ${props => props.theme.color.text.secondary};
        color: ${props => props.theme.color.border.primary};
    }
`
const DivMain = styled.div`
    flex: 10;
    display:flex;
    align-items: center;
    width: 100%;
`
const DivIcon = styled.div`
    display:flex;
    flex-direction: column;
    align-items: center;
    flex: 1;
    width: 20%;

    background: ${props => props.status==="Approved" ? props.theme.color.fill.success
                : props.status==="Stoped" ? props.theme.color.fill.info
                : props.status==="Pending" ? props.theme.color.fill.warning
                : props.status==="Rejected" ? props.theme.color.fill.danger
                : ''};

    padding: 0.5rem ;
    & p{
        font-size : 0.7rem;
        color: ${props => props.theme.color.background.primary};
    }
    & svg{
        color: ${props => props.theme.color.background.primary};
    }
`
const DivInfo = styled.div`
    padding: 0.5rem;
    width: 80%;
    flex: 5;
    & p {
        color: ${props => props.theme.color.text.secondary};
    }
    & .card-deadline{
        font-size: 0.85rem;
    }
    & .card-title{
        -webkit-line-clamp: 1;
        -webkit-box-orient: vertical;
        overflow: hidden;
        text-overflow: ellipsis;
        display: -webkit-box;
        font-weight: bold;
    }
    & .card-create_by{
        font-size: 0.85rem;
    }
`
function Card({approved,status,deadline,title,create_by}) {

    return (
        <CardWrapper>
            <StyleTypes className={`card-approved ${approved==='Flexible' ? 'flexible' : 'process'}`}>{approved}</StyleTypes>
            <DivMain>
                <DivIcon status={status}>
                    <IconStatus icon={status} size='1.5rem'/>
                    <p>{status}</p>
                </DivIcon>
                <DivInfo>
                    <p className="card-deadline">Deadline: {deadline}</p>
                    <p className="card-title">{title}</p>
                    <p className="card-create_by">{create_by}</p>
                </DivInfo>
            </DivMain>
        </CardWrapper>
    );
}

export default Card;
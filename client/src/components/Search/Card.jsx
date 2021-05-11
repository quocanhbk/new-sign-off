/* eslint-disable react/prop-types */
import React from 'react';
import styled from 'styled-components'
import IconStatus from './IconStatus';
import {IoChevronForwardCircle} from 'react-icons/all'

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
                : props.status==="Stopped" ? props.theme.color.fill.info
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
const StyleButton = styled.button`
    cursor: pointer;

    background: transparent;
    border: none;

    position: absolute;
    bottom: 0;
    right: 5%;

    & svg{
        color: ${props => props.theme.color.text.secondary};
    }
`
function Card({task,setSelectData,setOpen}) {

    const handleSelect = (task) =>{
        setSelectData(task)
        setOpen(true)
    }

    return (
        <CardWrapper>
            <StyleTypes className={`card-approved ${task.approved==='Flexible' ? 'flexible' : 'process'}`}>{task.approved}</StyleTypes>
            <DivMain>
                <DivIcon status={task.status}>
                    <IconStatus icon={task.status} size='1.5rem'/>
                    <p>{task.status}</p>
                </DivIcon>
                <DivInfo>
                    <p className="card-deadline">Deadline: {task.deadline}</p>
                    <p className="card-title">{task.title}</p>
                    <p className="card-create_by">{task.create_by}</p>
                </DivInfo>
            </DivMain>
            <StyleButton onClick={() => handleSelect(task)}><IoChevronForwardCircle size="1.5rem"/></StyleButton>
        </CardWrapper>
    );
}

export default Card;
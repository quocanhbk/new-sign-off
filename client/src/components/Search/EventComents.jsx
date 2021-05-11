/* eslint-disable react/prop-types */
import React, { useState } from 'react';
import styled from 'styled-components'
import {IoMdSend} from 'react-icons/all'
import Avatar from '../Avatar'
import CardEvents from './CardEvents';

const StyleWrapper = styled.div`

`
const TableForm = styled.div`

`
const TableTitle = styled.h4`
    color: ${props => props.theme.color.text.secondary};
`
const Input = styled.textarea`
    flex: 10;
    height: auto;
    resize:initial;
    border:none;

    padding: 0.5rem 0.5rem 0.5rem 1rem;

    background: transparent;
    color: ${props => props.theme.color.text.secondary};

    &:focus{
        outline: none;
    }
`
const Form = styled.div`
    display:flex;
    align-items: center;

    background: ${props => props.theme.color.background.primary};
    border: 1px solid ${props => props.theme.color.border.primary};

    width: 100%;
    padding: 0 0.3rem;
    
    & button{
        flex: 1;
        display:flex;
        align-items: center;
        justify-content: center;

        cursor: pointer;
        background: transparent;
        border : none;
        
        color: ${props => props.theme.color.text.secondary};
    }
`
const TableEvents = styled.div`

`

function EventComents({dataList,setComment}) {
    const [value,setValue] = useState()

    const handleSubmit = (e) =>{
        e.preventDefault()
        setComment([{
            id: Math.random(),
            title: value,
            create_by: 'Gấu',
            create_date: '10:08 11/05/2021'
        },...dataList])
        setValue('')
    }

    return (
        <StyleWrapper>
            <TableForm>
                <TableTitle>Event & Comments ({dataList.length})</TableTitle>
                <Form>
                    <Avatar width="2.5rem" height="2.5rem" src={`/avatar.png`} />
                    <Input placeholder="Write comment here ..." value={value} onChange={(e) => setValue(e.target.value)}/>
                    <button onClick={handleSubmit}><IoMdSend size="1.5rem"/></button>
                </Form>
            </TableForm>
            <TableEvents>
                {dataList.map((task) => (
                        <CardEvents
                        key={task.id}
                        title={task.title}
                        create_date={task.create_date}
                        create_by={task.create_by}
                        />
                    ))}
            </TableEvents>
        </StyleWrapper>
    );
}

export default EventComents;
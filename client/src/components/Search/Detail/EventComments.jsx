/* eslint-disable react/prop-types */
import React, { useState } from 'react';
import styled from 'styled-components'
import {IoMdSend} from 'react-icons/all'
import CardEvents from './CardEvents';
import { getFader } from '../../../utils/color';

const StyleWrapper = styled.div`
    display: flex;
    flex-direction: column;
    gap: 0.5rem;
`

const Input = styled.input`
    flex: 1;
    border: 1px solid ${props => props.theme.color.border.primary};
    border-radius: 99px;
    background: ${props => props.theme.color.background.primary};
    padding: 0.5rem 1rem;
    font-size: 1rem;
    color: ${props => props.theme.color.text.primary};
    outline: none;

    &:focus {
        border-color: ${props => props.theme.color.fill.primary};
    }
`
const Form = styled.div`
    display:flex;
    align-items: center;
    width: 100%;
    padding: 0rem;
    gap: 0.5rem;

    & button{
        display:flex;
        align-items: center;
        justify-content: center;
        cursor: pointer;
        background: transparent;
        border : none;
        color: ${props => props.theme.color.fill.primary};
        padding: 0.5rem;
        border-radius: 99px;
        &:hover {
            background: ${props => getFader(props.theme.color.border.primary, 0.5)}
        }
    }
`
const TableEvents = styled.div`
    display: flex;
    flex-direction: column;
    gap: 0.5rem;
`

function EventComents({logs ,dataList,setComment}) {
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
            <Form>
                <Input placeholder="Write comment here ..." value={value} onChange={(e) => setValue(e.target.value)}/>
                <button onClick={handleSubmit}><IoMdSend size="1.2rem"/></button>
            </Form>
            <TableEvents>
                {logs && logs.map((log) => (
                        <CardEvents
                        key={log.log_id}
                        description={log.description}
                        created_at={log.created_at}
                        created_by={log.author}
                        />
                    ))}
            </TableEvents>
        </StyleWrapper>
    );
}

export default EventComents;
/* eslint-disable react/prop-types */
import React, { useState } from 'react';
import styled from 'styled-components'
import {IoMdSend} from 'react-icons/all'
import CardEvents from './CardEvents';
import { getFader } from 'utils/color';
import format from 'date-fns/format'
import { postComment } from 'api/request';

const StyleWrapper = styled.div`
    display: flex;
    flex-direction: column;
    & > * + * {
      margin-top: 0.5rem;
    }
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
const Form = styled.form`
    display:flex;
    align-items: center;
    width: 100%;
    padding: 0rem;
    & > * + * {
      margin-left: 0.5rem;
    }

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
    & > * + * {
      margin-top: 0.5rem;
    }
`

function EventComents({ requestId, logs, setLogs }) {
  const [comment, setComment] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    const newComment = await postComment(requestId, comment);
    setLogs([newComment,...logs]);
    setComment('');
  };
  return (
    <StyleWrapper>
      <Form onSubmit={handleSubmit}>
        <Input
          placeholder="Write comment here ..."
          value={comment}
          onChange={(e) => setComment(e.target.value)}
          required={true}
        />
        <button>
          <IoMdSend size="1.2rem" />
        </button>
      </Form>
      <TableEvents>
        {logs &&
          logs.map((log) => (
            <CardEvents
              type={log.type}
              key={log.id}
              description={log.description}
              createdAt={format(new Date(log.createdAt), 'HH:mm dd/MM/yyyy')}
              createdBy={log.author}
            />
          ))}
      </TableEvents>
    </StyleWrapper>
  );
}

export default EventComents;
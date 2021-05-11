/* eslint-disable react/prop-types */
import React from 'react';
import styled from 'styled-components'
import Avatar from '../Avatar';

const CardWrapper = styled.div`
    display:flex;
    align-items: center;
    
    padding: 0.5rem 0.3rem;
    gap: 0.5rem;
    margin: 0.5rem 0;

`
const DivAvatar = styled.div`
    padding: 0;
`
const DivInfo = styled.div`
    display:flex;
    flex-direction: column;
    
    & p{
        color: ${props => props.theme.color.text.secondary};
    }

    & .create-event{
        display:flex;
        align-items: flex-end;

        & .create-by-event{
            font-weight: bold;
        }
        & .create-date-event{
            font-size: 0.8rem;
            padding-left: 1rem;
        }
    }

    & .title-event{
        font-size : 0.9rem;
        line-height: 1.2;

        -webkit-line-clamp: 2;
        -webkit-box-orient: vertical;
        overflow: hidden;
        text-overflow: ellipsis;
        display: -webkit-box;
    }
`
function CardEvents({create_by,create_date,title}) {
    return (
        <CardWrapper>
            <DivAvatar>
                <Avatar width="2.5rem" height="2.5rem" src={`/avatar.png`} />
            </DivAvatar>
            <DivInfo>
                <span className="create-event">
                    <p className="create-by-event">{create_by}</p>
                    <p className="create-date-event">{create_date}</p>
                </span>
                <p className="title-event">{title}</p>
            </DivInfo>
        </CardWrapper>
    );
}

export default CardEvents;
/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import React from 'react';
import styled from 'styled-components'
import Avatar from '../../Avatar';

const CardWrapper = styled.div`
    display:flex;
    padding: 0.5rem 0;
    gap: 0.5rem;
`
const DivAvatar = styled.div`
    padding: 0;
`
const DivInfo = styled.div`
    display:flex;
    flex-direction: column;
    gap: 0.2rem;
    & .create-event{
        display:flex;
        align-items: center;
        gap: 1rem;

        & .create-by-event{
            font-weight: 600;
            color: ${props => props.theme.color.fill.secondary};
        }
        & .create-date-event{
            font-size: 0.8rem;
            color: ${props => props.theme.color.text.secondary};
            font-style: italic;
        }
    }

    & .title-event{
        font-size : 1rem;
        line-height: 1.2;
    }
`
function CardEvents({created_at, created_by, description}) {
    const { first_name, middle_name, last_name} = created_by;
    const fullname = `${last_name} ${middle_name} ${first_name}`;
    return (
        <CardWrapper>
            <DivAvatar>
                <Avatar width="2rem" height="2rem" src={`/avatar.png`} />
            </DivAvatar>
            <DivInfo>
                <span className="create-event">
                    <p className="create-by-event">{fullname}</p>
                    <p className="create-date-event">{created_at}</p>
                </span>
                <p className="title-event">{description}</p>
            </DivInfo>
        </CardWrapper>
    );
}

export default CardEvents;
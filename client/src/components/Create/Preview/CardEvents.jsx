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
function CardEvents({create_by,create_date,title}) {
    return (
        <CardWrapper>
            <DivAvatar>
                <Avatar width="2rem" height="2rem" src={`/avatar.png`} />
            </DivAvatar>
            <DivInfo>
                <span className="create-event">
                    <p className="create-by-event">{create_by}</p>
                    <p className="create-date-event">{create_date}</p>
                </span>
                <p className="title-event">Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, similique, cupiditate nesciunt ullam officia nulla eum tempora ea distinctio natus, sed rerum magni et. Aperiam ut reiciendis expedita explicabo voluptate quaerat, corrupti natus ad est. Quia quod sit dicta autem!</p>
            </DivInfo>
        </CardWrapper>
    );
}

export default CardEvents;
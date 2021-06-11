/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import React from 'react';
import { BsCheckCircle } from 'react-icons/bs';
import styled from 'styled-components'
import { getFader } from '../../../utils/color';
import Avatar from '../../Avatar';

const Main = styled.div`
    display:flex;
    padding: 1rem 0;
    gap: 0.5rem;
    border-bottom: 1px solid ${props => props.theme.color.border.primary};
`
const DivAvatar = styled.div`
    padding: 0;
`
const DivInfo = styled.div`
    flex: 1;
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
const Sub = styled.div`
    display: flex;
    flex-direction: column;
    padding-top: 0.4rem;
    gap: 0.4rem;

`
const Line = styled.div`
    display: flex;
    gap: 0.5rem;
    align-items: center;
    font-size: 0.9rem;
    font-style: italic;
    color: ${props => props.theme.color.text.secondary};

    & .name {
        font-weight: 500;
    }

    & .icon {
        color: ${props => props.theme.color.fill.success};
    }
`
const Button = styled.button`
    border: none;
    color: ${props => props.theme.color.fill.warning};
    background: transparent;
    align-self: center;
    padding: 0.5rem;
    font-weight: 500;
    width: 8rem;
    cursor: pointer;
    //border: 1px solid ${props => props.theme.color.border.primary};
    &:hover {
        background: ${props => getFader(props.theme.color.border.primary, 0.5)}
    }
    &:active {
        background: ${props => getFader(props.theme.color.border.primary, 1)}
    }
`

function ApprovalOpinionCard({createdBy, createdDate, content}) {
    return (
        <Main>
            <DivAvatar>
                <Avatar width="2rem" height="2rem" src={`/avatar.png`} />
            </DivAvatar>
            <DivInfo>
                <span className="create-event">
                    <p className="create-by-event">{createdBy}</p>
                    <p className="create-date-event">{createdDate}</p>
                </span>
                <p className="title-event">
                    {content ? content : "Lorem ipsum dolor sit amet consectetur, adipisicing elit. Fugiat, debitis."}
                </p>
                <Sub>
                    <Line>
                        <BsCheckCircle className="icon"/>
                        <Avatar width="1.2rem" height="1.2rem" src={`/avatar.png`} />
                        <p><span className="name">Nguyen Van Gau</span> approved with this opinion</p>
                    </Line>
                    <Line>
                        <BsCheckCircle className="icon"/>
                        <Avatar width="1.2rem" height="1.2rem" src={`/avatar.png`} />
                        <p><span className="name">Tran Le Roi</span> approved with this opinion</p>
                    </Line>
                </Sub>
            </DivInfo>
            <Button>Approve With This Opinion</Button>
        </Main>
    );
}

export default ApprovalOpinionCard;
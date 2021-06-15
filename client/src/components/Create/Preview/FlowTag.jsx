/* eslint-disable react/prop-types */
import React from 'react'
import { BsBellFill } from 'react-icons/bs';
import styled from "styled-components";
import { getFader } from '../../../utils/color';
import AvatarStatus from "../../AvatarStatus"

const CardChild = styled.div`
  display: flex;
  align-items: center;
  gap: 1rem;
  z-index: 2;
  & .info {
    flex: 1;
    display: flex;
    flex-direction: column;
  }
  & .name {
    color: ${props => props.theme.color.text.primary};
    flex: 1;
  }
  & .job {
    color: ${props => props.theme.color.text.secondary};
    font-size: 0.8rem;
    font-style: italic;
  }
  & button {
      border: none;
      padding: 0.5rem;
      border-radius: 99px;
      color: ${props => props.theme.color.fill.warning};
      cursor: pointer;
      background: transparent;
      display: grid;
      place-items: center;
      &:hover {
          background: ${props => getFader(props.theme.color.border.primary, 0.5)};
      }
  }
`;

const FlowTag = ({reff, data, bell, onBellClick}) => {
    return (
        <CardChild ref={reff}>
            <AvatarStatus src="/avatar.png" status={"approved"} />
            <div className="info">
                <p className="name">{data.name}</p>
                <p className="job">{data.job}</p>
            </div>
            {bell && <button onClick={onBellClick}><BsBellFill size="1.2rem"/></button>}
        </CardChild>
    )
}

export default FlowTag
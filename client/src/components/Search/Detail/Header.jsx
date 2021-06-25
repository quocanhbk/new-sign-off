/* eslint-disable react/prop-types */
import React from "react";
import styled from "styled-components";
import { getFader } from "../../../utils/color";
import {format} from 'date-fns'
const ContentInfo = styled.div`
  display: flex;
  padding: 0.5rem 1rem;
  background: ${props => props.theme.color.background.primary};
  border-bottom: 1px solid ${(props) => props.theme.color.border.primary};
`;
const ContentTitle = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  flex: 1;
  & .content-modified {
    font-size: 0.8rem;
    color: ${props => props.theme.color.text.secondary};
    font-style: italic;
  }
  & .content-title {
    font-weight: 600;
    font-size: 1.2rem;
    color: ${props => props.theme.color.fill.primary};
  }
`;
const ContentProperties = styled.div`
  display: flex;
  flex-direction: column;
  font-size: 0.9rem;
  gap: 0.5rem;
  & div {
    text-align: center;
    font-weight: 600  ;
    padding: 0.4rem 2rem;
    background: ${props => getFader(props.theme.color.border.primary, 0.5)};
  }
  & .request-type {
    background: ${(props) => props.theme.color.border.primary};
    color: ${props => props.theme.color.text.primary};
    border-bottom: 2px solid ${props => props.theme.color.fill.primary};
  }
`;
const ApproveStatus = styled.div`
  border-bottom: 2px solid ${(props) => props.status === "Approved" ? props.theme.color.fill.success 
              : props.status === "Stopped" ? props.theme.color.fill.info 
              : props.status === "Pending" ? props.theme.color.fill.warning 
              : props.theme.color.fill.danger};
  color: ${(props) => props.status === "Approved" ? props.theme.color.fill.success 
              : props.status === "Stopped" ? props.theme.color.fill.info 
              : props.status === "Pending" ? props.theme.color.fill.warning 
              : props.theme.color.fill.danger};
`
const Header = ({title, status, type, updatedAt}) => {
	return (
		<ContentInfo>
		<ContentTitle>
			<p className="content-modified">{format(updatedAt, "'Last updated at '  p MMM do yyyy")}</p>
			<p className="content-title">{title}
			</p>
		</ContentTitle>
		<ContentProperties>
			<ApproveStatus status={status}>{status}</ApproveStatus>
			<div className="request-type">{type}</div>
		</ContentProperties>
		</ContentInfo>
	);
};

export default Header;

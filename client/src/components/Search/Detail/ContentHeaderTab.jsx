/* eslint-disable react/prop-types */
import React from "react";
import styled from "styled-components";

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
  & span {
    text-align: center;
    font-weight: 600  ;
    padding: 0.5rem 1rem;
    border-radius: 0.2rem;
  }
  & .content-approved {
    background: ${(props) => props.theme.color.border.primary};
    color: ${props => props.theme.color.text.primary};
  }
`;
const ApproveStatus = styled.span`
  background: ${(props) => props.status === "Approved" ? props.theme.color.fill.success 
              : props.status === "Stopped" ? props.theme.color.fill.info 
              : props.status === "Pending" ? props.theme.color.fill.warning 
              : props.theme.color.fill.danger};
    color: ${(props) => props.theme.color.background.primary};
`
const ContentHeaderTab = ({data}) => {
  return (
    <ContentInfo>
      <ContentTitle>
        <p className="content-modified">Last modified at 05:35 pm 04/05/2021</p>
        <p className="content-title">
         {data.title}
        </p>
      </ContentTitle>
      <ContentProperties>
        <ApproveStatus status={data.status}>{data.status}</ApproveStatus>
        <span className="content-approved">{data.approved}</span>
      </ContentProperties>
    </ContentInfo>
  );
};

export default ContentHeaderTab;

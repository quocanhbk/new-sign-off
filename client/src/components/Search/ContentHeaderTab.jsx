/* eslint-disable react/prop-types */
import React from "react";
import styled from "styled-components";

const ContentInfo = styled.div`
  display: flex;
  flex: 1;
  height: auto;

  padding-bottom: 0.5rem;
  border-bottom: 3px solid ${(props) => props.theme.color.text.secondary};
`;
const ContentTitle = styled.div`
  display: flex;
  flex-direction: column;
  flex: 10;
  padding: 0 1rem;
  & p {
    color: ${(props) => props.theme.color.text.secondary};
    flex: 1;
  }
  & .content-modified {
    font-size: 0.8rem;
  }
  & .content-title {
    font-weight: bold;
  }
`;
const ContentProperties = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  font-size: 0.8rem;

  & span {
    text-align: center;
    font-weight: bold;
    padding: 0.3rem 0.5rem;
  }

`;
const Approved = styled.span`
  background: ${(props) => props.theme.color.border.primary};
  color: ${(props) => props.theme.color.text.primary};

  margin-top: 0.5rem;
`
const Status = styled.span`
  background: ${(props) => props.status === "Approved" ? props.theme.color.fill.success 
              : props.status === "Stopped" ? props.theme.color.fill.info 
              : props.status === "Pending" ? props.theme.color.fill.warning 
              : props.theme.color.fill.danger};
  color: ${(props) => props.theme.color.background.primary};
`
const ContentHeaderTab = ({selectData}) => {
  console.log(selectData)
  return (
    <ContentInfo>
      <ContentTitle>
        <p className="content-modified">Last modified at 05:35 pm 04/05/2021</p>
        <p className="content-title">
         {selectData && selectData.title}
        </p>
      </ContentTitle>
      <ContentProperties>
        <Status className="content-status" status={selectData.status}>{selectData && selectData.status}</Status>
        <Approved className="content-approved">{selectData && selectData.approved}</Approved>
      </ContentProperties>
    </ContentInfo>
  );
};

export default ContentHeaderTab;

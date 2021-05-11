import React from "react";
import styled from "styled-components";

const SearchInfo = styled.div`
  height: 100vh;
  padding: 1.5rem;
  overflow: scroll;
`;
const SearchInfoContent = styled.div`
  padding-bottom: 1rem;
  margin-bottom: 2rem;
  border-bottom: 5px solid #807660;
`;
const Elements = styled.ul`
  margin: 1rem;
`;
const TitleInfo = styled.h4`
  text-transform: uppercase;
`;
const CardChild = styled.ul`
  display: flex;
  align-items: center;
  margin: 1rem 1rem 1rem 3rem;
  li {
    width: 90%;
    .info {
      margin-left: 2rem;
      div {
        margin: 0.5rem;
      }
    }
  }
`;
const TitleContent = styled.div`
  display: flex;
  align-items: center;
  width: 90%;
  margin: 0.5rem 0;
  .info {
    margin-left: 2rem;
    div {
      margin: 0.5rem;
    }
  }
`;
const ContentStatus = styled.div`
  text-transform: capitalize;
  color: #c6c0b3;
`;

const ApprovalInfo = () => {
  const title = [
    "Document ID",
    "Priority",
    "Deadline",
    "Related Project",
    "Number of approval document",
    "Final appoval by",
    "Final approval at",
  ];
  return (
    <SearchInfo>
      <SearchInfoContent>
        <Elements>
          <TitleInfo>document info</TitleInfo>
          {title.map((value) => {
            return (
              <CardChild key={value}>
                <li>
                  <TitleContent>{value}</TitleContent>
                </li>
                <ContentStatus>ahihi</ContentStatus>
              </CardChild>
            );
          })}
        </Elements>
        <Elements>
          <TitleInfo>creator</TitleInfo>
          {title.map((value) => {
            return (
              <CardChild key={value}>
                <li>
                  <TitleContent>{value}</TitleContent>
                </li>
                <ContentStatus>ahihi do ngoc</ContentStatus>
              </CardChild>
            );
          })}
        </Elements>
      </SearchInfoContent>
      <SearchInfoContent>
        <Elements>
          <TitleInfo>Log</TitleInfo>
          {title.map((value) => {
            return (
              <CardChild key={value}>
                <li>
                  <TitleContent>{value}</TitleContent>
                </li>
                <ContentStatus>ahihi</ContentStatus>
              </CardChild>
            );
          })}
          <CardChild>
            <li>
              <TitleContent>test</TitleContent>
            </li>
            <ContentStatus>ahihi</ContentStatus>
          </CardChild>
        </Elements>
      </SearchInfoContent>
    </SearchInfo>
  );
};

export default ApprovalInfo;

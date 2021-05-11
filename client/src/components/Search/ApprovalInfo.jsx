import React from "react";
import { getFader } from "../../utils/color";
import styled from "styled-components";

const SearchInfo = styled.div`
  display: flex;
  flex-direction: column;
  flex: 10;
  padding: 1rem;
  height: 80%;
  overflow: auto;
  position: relative;

  ::-webkit-scrollbar {
    width: 0.5rem;
  }
  ::-webkit-scrollbar-track {
    background: transparent;
  }
  ::-webkit-scrollbar-thumb {
    background: ${(props) => getFader(props.theme.color.fill.secondary, 0.5)};
    border-radius: 99px;
  }
  ::-webkit-scrollbar-thumb:hover {
    background: ${(props) => props.theme.color.fill.secondary};
  }
`;
const SearchInfoContent = styled.div`
  border-bottom: 2px solid #807660;
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
    width: 85%;
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
        {/* <Elements>
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
        </Elements> */}
      </SearchInfoContent>
    </SearchInfo>
  );
};

export default ApprovalInfo;

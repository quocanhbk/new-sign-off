import React from "react";
import { getFader } from "../../../utils/color";
import styled from "styled-components";
import SectionContainer from '../../SectionContainer'
import InfoLine from "./InfoLine";

const Container = styled.div`
  display: flex;
  flex-direction: column;
  padding: 1rem;
  overflow: overlay;
  position: relative;
  gap: 1rem;
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
const LineContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
`

const ApprovalInfo = () => {
  return (
    <Container>
      <SectionContainer headline="Document">
        <LineContainer>
          <InfoLine headline={"Document Id"} content={"01061999"}/>
          <InfoLine headline={"Priority"} content={"Normal"}/>
          <InfoLine headline={"Deadline"} content={"June 1st 1999"}/>
          <InfoLine headline={"Related project"} content={"TTG - Trung Thuy"}/>
          <InfoLine headline={"Number of approval file"} content={"2"}/>
          <InfoLine headline={"Final approval by"} content={"Thomas Shelby"}/>
          <InfoLine headline={"Final approval at"} content={"May 29th 1999 17:30"}/>
        </LineContainer>
      </SectionContainer>
      <SectionContainer headline="Creator"> 
        <LineContainer>
          <InfoLine headline={"Name"} content={"Arthur Shelby"}/>
          <InfoLine headline={"Job title"} content={"Software developer"}/>
          <InfoLine headline={"Created"} content={"May 26th 1999 9:00"}/>
        </LineContainer>
      </SectionContainer>
      <SectionContainer headline="Log">
        <LineContainer>
          <InfoLine headline="Nothing to see here...."/>
          <InfoLine headline="Nothing to see here...."/>
          <InfoLine headline="Nothing to see here...."/>
        </LineContainer>
      </SectionContainer>
    </Container>
  );
};

export default ApprovalInfo;

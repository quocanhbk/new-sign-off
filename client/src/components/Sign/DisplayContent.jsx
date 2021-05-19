/* eslint-disable react/prop-types */
import React from "react";
import styled from "styled-components";
import Tab from "../Tab";
import TabPane from "../TabPane";
import Content from "./Content";
import ContentHeaderTab from "./ContentHeaderTab";
import ApprovalFlow from "./ApprovalFlow";
import ApprovalInfo from "./ApprovalInfo";
import NoSelectionIndicator from "./NoSelectionIndicator";
import Approve from './Approve'
const StyleContentWrapper = styled.div`
  flex: 10;
  height: 100%;
  background-color: ${(props) => props.theme.color.background.secondary};
  color: ${(props) => props.theme.color.text.primary};
  border-left: 1px solid ${(props) => props.theme.color.border.primary};
  height: 100%;
  position: relative;
  display:flex;
  flex-direction: column;
`;
const StyleTab = styled.div`
  flex : 1;
  overflow: hidden;
`
function DisplayContent({data}) {
  return (
    <StyleContentWrapper>
      {
        data ?
        <>
          <StyleTab>
            <Tab fullHeight>
              <TabPane name="Content" key={1} value="1">
                <ContentHeaderTab data={data}/>
                <Content />
              </TabPane>
              <TabPane name="Approval Flow" key={2} value="2">
              <ContentHeaderTab data={data}/>
                <ApprovalFlow />
              </TabPane>
              <TabPane name="Info" key={3} value="3">
              <ContentHeaderTab data={data}/>
                <ApprovalInfo />
              </TabPane>
            </Tab>
          </StyleTab>
          <Approve/>
        </>
        :
          <NoSelectionIndicator/>
      }
      </StyleContentWrapper>
  );
}

export default DisplayContent;

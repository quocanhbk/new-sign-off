/* eslint-disable react/prop-types */
import React from "react";
import styled from "styled-components";
import Tab from "../../Tab";
import TabPane from "../../TabPane";
import Content from "./Content";
import ContentHeaderTab from "./ContentHeaderTab";
import ApprovalFlow from "./ApprovalFlow";
import ApprovalInfo from "./ApprovalInfo";
import NoSelectionIndicator from "./NoSelectionIndicator";
import ApproveWindow from "./ApproveWindow";

const StyleContentWrapper = styled.div`
  flex: 10;
  height: 100%;
  background-color: ${(props) => props.theme.color.background.secondary};
  color: ${(props) => props.theme.color.text.primary};
  border-left: 1px solid ${(props) => props.theme.color.border.primary};
  display: flex;
  flex-direction: column;
  position: relative;
`;
const  DisplayContent = ({data}) => {
  return (
    <StyleContentWrapper>
      {
        data ?
        <>
          <ContentHeaderTab data={data}/>
          <Tab fullHeight className="tab-container">
            <TabPane name="Content" key={1} value={1}>
              <Content />
            </TabPane>
            <TabPane name="Approval Flow" key={2} value={2}>
              <ApprovalFlow />
            </TabPane>
            <TabPane name="Info" key={3} value={3}>
              <ApprovalInfo />
            </TabPane>
          </Tab>
          <ApproveWindow/>
        </>
        :
          <NoSelectionIndicator/>
      }
    </StyleContentWrapper>
  );
}

export default DisplayContent;

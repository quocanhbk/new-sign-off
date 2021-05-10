import React from "react";
import styled from "styled-components";
import Tab from "../Tab";
import TabPane from "../TabPane";
import Content from "./Content";
import ContentHeaderTab from "./ContentHeaderTab";

const StyleContentWrapper = styled.div`
  flex: 10;
  height: 100%;
  padding: 1rem 0;
  background-color: ${(props) => props.theme.color.background.secondary};
  color: ${(props) => props.theme.color.text.primary};
  border-left: 1px solid ${(props) => props.theme.color.border.primary};
`;
function DisplayContent() {
  return (
    <StyleContentWrapper>
      <Tab fullHeight>
        <TabPane name="Content" key={1} value="1">
            <ContentHeaderTab/>
          <Content />
        </TabPane>
        <TabPane name="Approval Flow" key={2} value="2">
            <ContentHeaderTab/>
        </TabPane>
        <TabPane name="Info" key={3} value="3">
            <ContentHeaderTab/>
        </TabPane>
      </Tab>
    </StyleContentWrapper>
  );
}

export default DisplayContent;

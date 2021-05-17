/* eslint-disable react/prop-types */
import React from "react";
import styled from "styled-components";

const StyleContentWrapper = styled.div`
  flex: 10;
  height: 100%;
  padding: 1rem 0;
  background-color: #333 ;//${(props) => props.theme.color.background.secondary};
  color: ${(props) => props.theme.color.text.primary};
  border-left: 1px solid ${(props) => props.theme.color.border.primary};
  height: 100%;
  position: relative;
`;
function DisplayContent() {
  return (
    <StyleContentWrapper>
      content
    </StyleContentWrapper>
  );
}

export default DisplayContent;

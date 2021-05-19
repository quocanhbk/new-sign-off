/* eslint-disable react/prop-types */
import React from "react";
import styled from "styled-components";

const StyleContentWrapper = styled.div`
  flex: 10;
  height: 100%;
  padding: 1rem 0;
  background-color: ${(props) => props.theme.color.background.secondary};
  color: ${(props) => props.theme.color.text.primary};
  border-left: 1px solid ${(props) => props.theme.color.border.primary};
  height: 100%;
  position: relative;
`;
function DisplayContent() {
  return (
    <StyleContentWrapper>

    </StyleContentWrapper>
  );
}

export default DisplayContent;

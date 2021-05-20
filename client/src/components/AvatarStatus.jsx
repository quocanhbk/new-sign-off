/* eslint-disable react/prop-types */
import React from "react";
import styled from "styled-components";
import propTypes from "prop-types";
import Avatar from "./Avatar";
import { IoCloseCircleSharp, FaCheckCircle } from "react-icons/all";

const Span = styled.span`
  width: auto;
  position: relative;
  &.advisor_flow {
    &:before {
      content: "";
      position: absolute;
      width: 3px;
      height: 50%;
      background: ${props => props.theme.color.fill.primary};
      top: 90%;
      margin-left: 50%;
      transform: translateX(-50%);
    }
  }

`;
const Icon = styled.span`
  position: absolute;
  top: 68%;
  right: 0;
`;
Icon.defaultProps = {
  status: true,
};

function AvatarStatus(props) {
  const { src } = props;
  const status = true;
  return (
    <Span {...props}>
      <Avatar
        src={src}
        width="3rem"
        height="3rem"
      />
      <Icon>
        {status === true ? (
          <FaCheckCircle color="#00875A" size="1rem" />
        ) : (
          <IoCloseCircleSharp color="red" size="1rem" />
        )}
      </Icon>
    </Span>
  );
}
Image.propTypes = {
  src: propTypes.string,
};

export default AvatarStatus;

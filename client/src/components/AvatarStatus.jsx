import React from "react";
import styled from "styled-components";
import propTypes from "prop-types";
import Avatar from "./Avatar";
import { IoCloseCircleSharp, FaCheckCircle } from "react-icons/all";

const Span = styled.span`
  width: auto;
  position: relative;
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
  const status = true;
  return (
    <Span {...props}>
      <Avatar src="/avatar.png" width="3.5rem" height="3.5rem" />
      <Icon>
        {status === true ? (
          <FaCheckCircle color="#00875A" size="1.5rem" />
        ) : (
          <IoCloseCircleSharp color="red" size="1.5rem" />
        )}
      </Icon>
    </Span>
  );
}
Image.propTypes = {
  src: propTypes.string,
};

export default AvatarStatus;

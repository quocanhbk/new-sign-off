import React from "react";
import styled from "styled-components";
import propTypes from "prop-types";

const Span = styled.span`

`;
const Images = styled.img`
  width: 100px;
`;

function AvatarStatus(props) {
  return (
      <Span>
          <Images src="/avatar.png" {...props}/>
      </Span>
  )
}
Image.propTypes = {
  src: propTypes.string,
};

export default AvatarStatus;

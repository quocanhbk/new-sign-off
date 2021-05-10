/* eslint-disable react/prop-types */
import React from 'react';
import styled from 'styled-components';

const TagWrapper = styled.div`
  padding: 0.2rem 0.4rem;
  color: ${(props) => props.theme.color.text.primary};
  background: ${props => props.theme.color.border.primary};
  font-size: 0.8rem;
  cursor: pointer;
`;

const Tag = ({ text, onClick }) => {
  return (
    <TagWrapper onClick={onClick}>
      {text}
    </TagWrapper>
  );
};

export default Tag;

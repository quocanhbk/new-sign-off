import React, {  } from 'react'
import styled from 'styled-components'

const StyleTitle = styled.div`
  display: flex;
  justify-content: space-between;
  border-bottom: 1px solid ${props => props.theme.color.border.primary};
  padding: 0 1rem;
  & h3 {
    color: ${(props) => props.theme.color.fill.primary};
    padding: 1rem 0;
    font-weight: 500;
  }
`;
const Header = () => {
    return (
      <StyleTitle>
          <h3>CREATE NEW PROCEDURE</h3>
      </StyleTitle>
    )
}

export default Header
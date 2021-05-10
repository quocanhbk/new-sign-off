import styled from 'styled-components';

const Divider = styled.div`
  width: 100%;
  height: 1px;
  background-color: ${(props) => props.theme.color.fill.primary};
  box-sizing: border-box;
  margin-top: 4px;
  margin-bottom: 4px;
`

export default Divider
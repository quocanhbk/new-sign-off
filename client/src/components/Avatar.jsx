import styled from 'styled-components';

const Avatar = styled.img`
  width: ${(props) => props.width ? props.width : '48px'};
  height: ${(props) => props.height ? props.height : '48px'};
  border-radius: 99px;
`;

export default Avatar;
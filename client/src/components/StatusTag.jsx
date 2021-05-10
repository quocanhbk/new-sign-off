import PropTypes from 'prop-types';
import styled from 'styled-components';

const StatusTag = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 96px;
  min-height: 24px;
  height: 24px;
  border-radius: 12px;
  font-size: 12px;
  color: #ffffff;
  background-color: ${(props) => props.backgroundColor ? props.theme.color.fill[props.backgroundColor] : props.theme.color.fill.info};
`;

StatusTag.propTypes = {
  backgroundColor: PropTypes.string,
}

export default StatusTag;
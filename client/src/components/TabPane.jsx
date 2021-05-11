/* eslint-disable react/react-in-jsx-scope */
import styled from "styled-components";
import PropTypes from "prop-types";

const DivTab = styled.div`
  display: block;
  background: transparent;
  height: 100%;
  flex : 1;
`;
const TabPane = (props) => {
  return <DivTab {...props} />;
};
DivTab.propTypes = {
  disabled: PropTypes.bool,
  selected: PropTypes.bool,
  // key: PropTypes.any.isRequired,
};
DivTab.defaultProps = {
  disabled: false,
  selected: false,
};

export default TabPane;

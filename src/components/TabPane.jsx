/* eslint-disable react/react-in-jsx-scope */
import styled from 'styled-components'
import PropTypes from 'prop-types'

const DivTab = styled.div`
    display:block;
    flex:1;
    background:transparent;
`;
const TabPane = (props) => {
    return(
        <DivTab {...props}/>
    )
}
TabPane.propTypes = {
    disabled: PropTypes.bool,
    selected: PropTypes.bool,
    key: PropTypes.any.isRequired
}
TabPane.defaultProps = {
    disabled: false,
    selected: false
}

export default TabPane
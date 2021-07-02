import styled from 'styled-components'
import PropTypes from 'prop-types'
const Container = styled.div``

const FlexContainer = ({direction, alignItems, justifyContents, gap, padding, border, radius, children}) => {
    return (
        <Container>
            {children}
        </Container>
    )
}

FlexContainer.propTypes
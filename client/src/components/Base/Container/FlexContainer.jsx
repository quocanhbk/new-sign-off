import React from 'react'
import styled from 'styled-components'
import pt from 'prop-types'
const Container = styled.div`
    display: flex;
    flex-direction: ${props => props.column ? "column" : "row"};
    justify-content: ${props => props.justifyContent};
    align-items: ${props => props.alignItems};
    gap: ${props => props.gap};
    padding: ${props => props.padding};
    border-radius: ${props => props.radius};
    border-color: ${props => props.theme.color.border.primary};
    border: ${props => props.border};
`

const FlexContainer = ({children, ...props}) => {
    return (
        <Container {...props}>
            {children}
        </Container>
    )
}

FlexContainer.propTypes = {
    column: pt.bool,
    alignItems: pt.oneOf["flex-start", "center"],
    justifyContent: pt.oneOf["flex-start", "center"],
    gap: pt.string,
    padding: pt.string,
    radius: pt.string,
    children: pt.arrayOf(pt.element),
    border: pt.string
}
FlexContainer.defaultProps = {
    column: false,
    alignItems: "flex-start",
    justifyContent: "flex-start",
    gap: "0.5rem",
    padding: "0rem",
    radius: "0px"
}

export default FlexContainer
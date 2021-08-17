import styled from "styled-components"

const Container = styled.div`
    //background: ${props => props.theme.color.background.primary};
    //border: 1px solid ${props => props.theme.color.border.primary};
    padding: 0.5rem;
    //text-align: center;
    color: ${props => props.theme.color.text.secondary};
    font-style: italic;
    user-select: none;
`

const Nothing = ({ type }) => {
    return <Container>{type === "FILE" ? "No File" : type === "DESCRIPTION" ? "No Description" : "Nothing"}</Container>
}

export default Nothing

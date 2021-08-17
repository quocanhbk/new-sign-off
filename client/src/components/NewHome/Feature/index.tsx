import styled from "styled-components"
import FeatureSection from "./FeatureSection"
const features = [
    {
        type: "Functionality",
        name: "System File",
        sub: "You can select file from the system and fill them out easily!",
    },
    { type: "Functionality", name: "Procedure Request", sub: "You know which files need to be submitted!" },
    {
        type: "Functionality",
        name: "Opinionated Approval",
        sub: "You can approve a document with opinion, the document will then be revised to be better!",
    },
    {
        type: "User Experience",
        name: "Fast And Performant",
        sub: "Powered by modern web app technology, we ensure the best experience to users!",
    },
    {
        type: "User Experience",
        name: "Dark Theme",
        sub: "Easy on the eyes! But you can switch to light theme if you like!",
    },
]

const Container = styled.div`
    display: flex;
    flex-direction: column;
    /* gap: 2rem; */
    & > * + * {
        margin-top: 2rem;
    }
`
const Title = styled.div`
    & h2 {
        font-weight: 500;
        font-size: calc(1.4rem + 0.5vw);
        display: inline-block;
        padding-bottom: 0.2rem;
        border-bottom: 2px solid ${props => props.theme.color.fill.primary};
        color: ${props => props.theme.color.fill.primary};
        font-family: CamptonSemiBold, "Segoe UI", sans-serif;
    }
`
const Feature = () => {
    return (
        <Container>
            <Title>
                <h2>{"New Features In Approval Online !"}</h2>
            </Title>
            <FeatureSection type={"Functionality"} data={features.filter(d => d.type === "Functionality")} />
            <FeatureSection type={"User Experience"} data={features.filter(d => d.type === "User Experience")} />
        </Container>
    )
}

export default Feature

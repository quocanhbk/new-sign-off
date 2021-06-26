import React from 'react'
import styled from 'styled-components'
import FeatureSection from './FeatureSection'
const features = [
    {type: "Functionality", name: "System File", sub: "You can select file from the system, no need to upload your own!"},
    {type: "Functionality", name: "Procedure Request", sub: "You know exactly which files need to be submitted!"},
    {type: "Functionality", name: "Opinionated Approval", sub: "You can approve a document with opinion, the document will then be revised to be better!"},
    {type: "User Experience", name: "Fast And Performant", sub: "Powered by modern web app technology, we bring you the best experience ever!"},
    {type: "User Experience", name: "Dark Theme", sub: "Easy on the eyes!"}
]

const Container = styled.div`
    display: flex;
    flex-direction: column;
    gap: 2rem;
`
const Title = styled.div`
    
    & h2 {
        font-weight: 500;
        font-size: 2rem;
        display: inline-block;
        padding-bottom: 0.2rem;
        border-bottom: 2px solid ${props => props.theme.color.fill.primary};
        color: ${props => props.theme.color.fill.primary};
        font-family: CamptonSemiBold, 'Segoe UI';
    }
   
`
const Feature = () => {
    return (
        <Container>
            <Title>
                <h2>{"What's New In Approval Online !"}</h2>
            </Title>
            <FeatureSection type={"Functionality"} data={features.filter(d => d.type === "Functionality")}/>
            <FeatureSection type={"User Experience"} data={features.filter(d => d.type === "User Experience")}/>
        </Container>
    )
}

export default Feature
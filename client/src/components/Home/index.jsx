import React from 'react'
import styled from 'styled-components'
import {getFader} from '../../utils/color'

const StyleContainer = styled.div`
    display:flex;
    flex-direction: column;
    width: 100%;
    height: 100%;
`
const StyleTitle = styled.h3`
    text-transform: uppercase;
    width: 100%;
    padding: 1rem;
    border-bottom: 1px solid ${props => props.theme.color.border.primary};

`
const ContainerItems = styled.div`
    flex: 1;
    display: flex;
    flex-wrap: wrap;
    justify-content: space-between; 
    padding: 1rem;
    gap: 1rem;
`
const DivItem = styled.div`
    flex: 1 0 40%;
    background: ${props => props.theme.color.background.secondary};
    display: flex;
    align-items: center;
    box-shadow: ${props => props.theme.shadow};
    border: 1px solid ${props => props.theme.color.border.primary};
    border-radius: 1rem;
    padding: 1rem;
    transition: transform 0.15s ease-in-out;
    cursor: pointer;
    &:hover {
        transform: scale(1.02);
    }

`
const IconContainer = styled.div`
    display: flex;
    align-items: center;
    flex: 1;
    justify-content: center;
`
const Info = styled.div`
    display:flex;
    flex-direction: column;
    width: 100%;
    padding: 1rem;
    flex: 3;
    & h4{
        font-weight: 700;
        text-transform: uppercase;
        color: ${props => props.theme.color.fill.primary};
        border-bottom: 1px solid ${props => props.theme.color.border.primary};
        padding-bottom: 0.5rem;
        margin-bottom: 0.5rem;
    }

    & p{
        text-align: left;
        color: ${props => props.theme.color.text.secondary};
    }
    
    & div{
        padding : 0.5rem 0;

        & p {
            color: ${props => props.theme.color.background.primary};
            background: ${props => props.theme.color.fill.secondary};
            padding: 0.5rem 1rem;
            margin: 0.5rem 0;
            border-radius: 0.5rem;

            &:hover {
                background: ${props => getFader(props.theme.color.fill.secondary, 0.9)};
            }
        }
    }
`
const Home = () => {

    return (
        <StyleContainer>
           <StyleTitle>Please select service</StyleTitle>
           <ContainerItems>
                <DivItem>
                        <IconContainer>
                            <img src="favicon.ico"/>
                        </IconContainer>
                        
                        <Info>
                            <h4>Search For Document</h4>
                            <p>Look for document with search engine & filter tools.</p>
                        </Info>
                </DivItem>
                <DivItem>
                        <IconContainer>
                            <img src="favicon.ico"/>
                        </IconContainer>
                        <Info>
                            <h4>SIGN DOCUMENT</h4>
                            <p>Sign files & documents that waiting for my approval</p>
                        </Info>
                </DivItem>
                <DivItem>
                        <IconContainer>
                            <img src="favicon.ico"/>
                        </IconContainer>
                        <Info>
                            <h4>VERIFY DOCUMENT</h4>
                            <p>Verify document content by upload file or via QR code scan.</p>
                            <div>
                                <p>Fast check approval info via QR scan</p>
                                <p>Upload file to verify content</p>
                            </div>
                        </Info>              
                </DivItem>
                <DivItem>
                        <IconContainer>
                            <img src="favicon.ico"/>
                        </IconContainer>
                        <Info>
                            <h4>CREATE FILE</h4>
                            <p>Create & submit file for approval</p>
                            <div>
                                <p>Flexible approval flow</p>
                                <p>Process approval flow</p>
                            </div>
                        </Info>
                </DivItem>
           </ContainerItems>
        </StyleContainer>
    )
}

export default Home
import React from 'react'
import styled from 'styled-components'
import { getFader } from '../../utils/color'

const StyleContainer = styled.div`
    display:flex;
    flex-direction: column;
    width: 100%;
    height: 100%;
    padding: 1rem 0;
`
const StyleTitle = styled.h4`
    text-transform: uppercase;

    width: 100%;
    padding: 1rem;
    flex: 1;

    box-shadow: 5px 4px 8px rgba(0, 0, 0, 0.25);

`
const ContainerItems = styled.div`
    flex: 99;
    display: -webkit-box;display: -moz-box;display: -ms-flexbox;display: -webkit-flex;display: flex;flex-wrap: wrap;-webkit-flex-wrap: wrap;
    justify-content: space-between; 
    padding: 1rem;
`
const DivItem = styled.div`
    width: 50%;
    padding: 1%;

    display: flex;


    & button{
        width: 100%;
        cursor: pointer;

        display:flex;
        flex-direction: row;
        align-items: center;

        background: ${props => props.theme.color.background.primary};
        box-shadow: 0px 8px 16px rgba(0, 0, 0, 0.25);
        border: none;

        &:hover{
            background-color: ${props => getFader(props.theme.color.border.primary, 0.5)};
        }
    }
`
const Info = styled.div`
    display:flex;
    flex-direction: column;
    width: 100%;
    padding: 1rem;
    
    & h4{
            text-align: left;
            font-weight: bold;
            text-transform: uppercase;

            color: ${props => props.theme.color.text.secondary};
            border-bottom: 3px solid ${props => props.theme.color.border.primary};

            padding-bottom: 0.5rem;
            margin-bottom: 0.5rem;
        }

    &>p{
        text-align: left;
        color: ${props => props.theme.color.text.secondary};
    }
    
    & span{
        padding : 0.5rem 0;

        & p {
            text-align: left;
            color: ${props => props.theme.color.text.secondary};
            border: 1px solid ${props => props.theme.color.border.primary};
            padding: 0.5rem 1rem;
            margin: 0.5rem 0;
        }
    }
`
const Home = () => {


    return (
        <StyleContainer>
           <StyleTitle>Please select service</StyleTitle>
           <ContainerItems>
                <DivItem>
                    <button>
                        <img src="IconHomeFile.svg"/>
                        <Info>
                            <h4>Search For Document</h4>
                            <p>Look for document with search engine & filter tools.</p>
                        </Info>
                    </button>
                </DivItem>
                <DivItem>
                    <button>
                        <img src="IconHomeFile.svg"/>
                        <Info>
                            <h4>SIGN DOCUMENT</h4>
                            <p>Sign files & documents that waiting for my approval</p>
                        </Info>
                    </button>
                </DivItem>
                <DivItem>
                    <button>
                        <img src="IconHomeFile.svg"/>
                        <Info>
                            <h4>VERIFY DOCUMENT</h4>
                            <p>Verify document content by upload file or via QR code scan.</p>
                            <span>
                                <p>Fast check approval info via QR scan</p>
                                <p>Upload file to verify content</p>
                            </span>
                        </Info>
                    </button>                  
                </DivItem>
                <DivItem>
                    <button>
                        <img src="IconHomeFile.svg"/>
                        <Info>
                            <h4>CREATE FILE</h4>
                            <p>Create & submit file for approval</p>
                            <span>
                                <p>Flexible approval flow</p>
                                <p>Process approval flow</p>
                            </span>
                        </Info>
                    </button>
                </DivItem>
           </ContainerItems>
        </StyleContainer>
    )
}

export default Home
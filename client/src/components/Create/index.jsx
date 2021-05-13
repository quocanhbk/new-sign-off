import React, { useState } from 'react'
import styled from 'styled-components'
import {getFader} from '../../utils/color'
import ApprovalDocument from './ApprovalDocument'
import Participants from './Participants'
import PrimaryInfo from './PrimaryInfo'
import ReferenceDocument from './ReferenceDocument'

const StyleContainer = styled.div`
    display:flex;
    flex-direction: column;
    width: 100%;
    height: 100%;
`
const StyleTitle = styled.div`
    display:flex;
    justify-content: space-between;

    width: 100%;
    padding: 1rem;
    flex: 1;

    box-shadow: 0px 3px 4px rgba(0, 0, 0, 0.25);

    & h4{
        text-transform: uppercase;
        color: ${props => props.theme.color.text.primary};
    }
    & span{
        padding: 0.3rem 1rem;

        font-weight: bold;
        background: ${props => props.theme.color.text.secondary};
        color: ${props => props.theme.color.background.primary};
    }
`
const ContainerItems = styled.div`
    flex: 99;
    display: -webkit-box;display: -moz-box;display: -ms-flexbox;display: -webkit-flex;display: flex;flex-wrap: wrap;-webkit-flex-wrap: wrap;
    justify-content: space-between; 
    padding: 1rem;

    overflow: auto;
    position: relative;
    
    ::-webkit-scrollbar {
    width: 0.5rem;
    }
    ::-webkit-scrollbar-track {
    background: transparent;
    }
    ::-webkit-scrollbar-thumb {
    background: ${props => getFader(props.theme.color.fill.secondary, 0.5)};
    border-radius: 99px;
    }
    ::-webkit-scrollbar-thumb:hover {
    background: ${props => props.theme.color.fill.secondary};
    }
`
const DivContent = styled.div`
    width: 100%;

    & h4{
        text-transform: uppercase;

        color: ${props => props.theme.color.text.primary};
        border-bottom: 2px solid ${props=> props.theme.color.border.primary};

        padding-bottom: 0.5rem;
        margin-bottom : 0.5rem;
    }
`
const data = [
    {
        id: 1,
        name: 'Name File have field',
    },
    {
        id: 2,
        name: 'Name File no field',
    }
]

const data2 = [
    {
        id: 1,
        name: 'Name File have fieldName File have fieldName File have fieldName File have fieldName File have fieldName File have field',
        data_field: [
            {
                id: 1,
                name: 'Date of Request',
                value: ''
            },
            {
                id: 2,
                name: 'Description',
                value: ''
            },

            {
                id: 3,
                name: 'Vat',
                value: ''
            },
            {
                id: 4,
                name: 'Value',
                value: ''
            },
        ]
    },
    {
        id: 2,
        name: 'Name File no field',
        data_field: []
    }
]
const Create = () => {

    const [approvalData,setApprovalData] = useState(data2)
    const [dataReference, setDataReference] = useState(data)

    return (
        <StyleContainer>
            <StyleTitle>
                <h4>CREATE A NEW APPROVAL DOCUMENT</h4>
                <span>PREVIEW</span>
            </StyleTitle>
            <ContainerItems>
                <DivContent>
                    <h4>Primary Info</h4>
                    <PrimaryInfo/>
                </DivContent>
                <DivContent>
                    <h4>PARTICIPANTS</h4>
                    <Participants/>
                </DivContent>
                <DivContent>
                    <h4>APPROVAL DOCUMENT ({approvalData.length})</h4>
                    <ApprovalDocument approvalData={approvalData} setApprovalData={setApprovalData}/>
                </DivContent>
                <DivContent>
                    <h4>REFERENCE DOCUMENT ({dataReference.length})</h4>
                    <ReferenceDocument dataReference={dataReference} setDataReference={setDataReference}/>
                </DivContent>
            </ContainerItems>
        </StyleContainer>
    )
}

export default Create
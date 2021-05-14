/* eslint-disable react/prop-types */
import React from 'react';
import styled from 'styled-components'
import TableApprovalProcess from './TableApprovalProcess';

const StyleWrapper = styled.div`
    padding: 0.5rem 0 1rem 0;
`
const Text = styled.label`
    display: -webkit-box;display: -moz-box;display: -ms-flexbox;display: -webkit-flex;display: flex;flex-wrap: wrap;-webkit-flex-wrap: wrap; 

    font-size: 0.9rem;
    color : ${props => props.theme.color.text.primary};

    padding: 0.5rem 0;

    & p{
        color : ${props => props.theme.color.fill.warning};
        padding-left: 0.3rem;
    }
`
function ApprovalDocumentProcess({getDataForm,setGetDataForm}) {


    return (
        <StyleWrapper>
            <Text>Process: <p>{getDataForm && getDataForm.name}</p></Text>
            <TableApprovalProcess data={getDataForm} setData={setGetDataForm}/>
        </StyleWrapper>
    );
}

export default ApprovalDocumentProcess;
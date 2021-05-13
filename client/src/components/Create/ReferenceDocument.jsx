/* eslint-disable react/prop-types */
import React from 'react';
import styled from 'styled-components'
import FileUpload from './FileUpload'
import TableReference from './TableReference';

const StyleWrapper = styled.div`

`
const Text = styled.label`
    display: -webkit-box;display: -moz-box;display: -ms-flexbox;display: -webkit-flex;display: flex;flex-wrap: wrap;-webkit-flex-wrap: wrap; 

    font-size: 0.9rem;
    color : ${props => props.theme.color.text.primary};

    padding: 0.5rem 0;
`

function ReferenceDocument({dataReference,setDataReference}) {

    const handleFile = (e) =>{
        setDataReference([...dataReference,{
            id: Math.random(),
            name: e.target.files[0].name,
        }])
    }

    return (
        <StyleWrapper>
            <Text>The flexible approval may not follow the operational procedures, approval participants are responsible for the completeness of attached documents</Text>
            <FileUpload handleFile={handleFile}/>
            <TableReference data={dataReference} setData={setDataReference}/>
        </StyleWrapper>
    );
}

export default ReferenceDocument;
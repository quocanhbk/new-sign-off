/* eslint-disable react/prop-types */
import React, { useState } from 'react';
import styled from 'styled-components'
import Combox from '../ControlledCombox';
import FileUpload from './FileUpload'
import TableReference from './TableReference';

const StyleWrapper = styled.div`
    padding: 0.5rem 0 1rem 0;
`
const Text = styled.label`
    display: -webkit-box;display: -moz-box;display: -ms-flexbox;display: -webkit-flex;display: flex;flex-wrap: wrap;-webkit-flex-wrap: wrap; 

    font-size: 0.9rem;
    color : ${props => props.theme.color.text.secondary};

    padding: 0.5rem 0;
`
const StyleItems = styled.div`
    display:flex;
    flex-direction: row;

    gap: 1rem;

    padding: 1rem 0;
`
const FormSelect = styled.div`
    flex: 2;

`
const Div = styled.div`
    width: 100%;

    text-align: right;

    & button{
        background: ${props => props.theme.color.fill.success};
        color: ${props => props.theme.color.background.primary};
        cursor: pointer;
        padding: 0.5rem 1rem;
        border: none;
    }
`
const form = [
    {
        id: 1,
        name: 'Internal payment request form - Đề nghị thanh toán nội bộ'
    },
    {
        id: 2,
        name: 'Payment request form - Đề nghị thanh toán'
    }
]

function ReferenceDocument({dataReference,setDataReference}) {
    const [formData,setFormData] = useState(form[0].name)

    const handleFormValue = () =>{
        setDataReference([...dataReference,{
            id: Math.random(),
            name: formData,
        }])
    }

    const handleFile = (e) =>{
        setDataReference([...dataReference,{
            id: Math.random(),
            name: e.target.files[0].name,
        }])
    }
    return (
        <StyleWrapper>
            <Text>The flexible approval may not follow the operational procedures, approval participants are responsible for the completeness of attached documents.</Text>
            <StyleItems>
                <FileUpload handleFile={handleFile} name="choose-file2"/>
                <FormSelect>
                    <Text>Select form from database</Text>
                    <Combox
                        className="combox-form"
                        onSelect={v => setFormData(v)}
                    >
                        {form.map((data, index) => {
                            return(
                            <Combox.Option
                            default={data.id === 1}
                            id={data.id}
                            searchText={[data.name]}
                            value={data.name}    
                            key={index}
                            >
                            {
                                data.name
                            }
                            </Combox.Option>
                            )
                        })}
                    </Combox>
                    <Text>Little caption goes here</Text>
                    <Div>
                        <button onClick={() => handleFormValue()}>Use form</button>
                    </Div>
                </FormSelect>
            </StyleItems>
            <TableReference data={dataReference} setData={setDataReference}/>
        </StyleWrapper>
    );
}

export default ReferenceDocument;
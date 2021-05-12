import React, { useState } from 'react';
import styled from 'styled-components'
import Combox from '../Combox';
import FileUpload from './FileUpload';
import TableApproval from './TableApproval';

const StyleWrapper = styled.div`
    padding: 0.5rem 0;
`
const Text = styled.label`
    display: -webkit-box;display: -moz-box;display: -ms-flexbox;display: -webkit-flex;display: flex;flex-wrap: wrap;-webkit-flex-wrap: wrap; 

    font-size: 0.9rem;
    color : ${props => props.theme.color.text.primary};

    padding: 0.5rem 0;
`
const Text1 = styled.label`
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
        color: ${props => props.theme.color.text.primary};
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
const data = [
    {
        id: 1,
        name: 'Name File have field',
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
function ApprovalDocument() {
    const [approvalData,setApprovalData] = useState(data)
    const [formData,setFormData] = useState(form)

    const handleFormValue = () =>{
        setApprovalData([...approvalData,{
            id: Math.random(),
            name: formData,
            data_field: [],
        }])
    }
    return (
        <StyleWrapper>
            <Text>The flexible approval may not follow the operational procedures, approval participants are responsible for the completeness of attached documents.</Text>
            <StyleItems>
                <FileUpload data={approvalData} setData={setApprovalData}/>
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
                    <Text1>Little caption goes here</Text1>
                    <Div>
                        <button onClick={() => handleFormValue()}>Use form</button>
                    </Div>
                </FormSelect>
            </StyleItems>
            <TableApproval data={approvalData} setData={setApprovalData}/>
        </StyleWrapper>
    );
}

export default ApprovalDocument;
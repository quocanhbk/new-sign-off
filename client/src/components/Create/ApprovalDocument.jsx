import React from 'react';
import styled from 'styled-components'
import Combox from '../Combox';
import FileUpload from './FileUpload';

const StyleWrapper = styled.div`
    padding: 1rem;
`
const Text = styled.label`
    display: -webkit-box;display: -moz-box;display: -ms-flexbox;display: -webkit-flex;display: flex;flex-wrap: wrap;-webkit-flex-wrap: wrap; 

    font-size: 0.9rem;
    color : ${props => props.theme.color.text.secondary};

    padding: 0.5rem;
`
const StyleItems = styled.div`
    display:flex;
    flex-direction: row;

    gap: 1rem;

    padding: 0.5rem;
`
const FormSelect = styled.div`
    flex: 2;
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
function ApprovalDocument() {
    return (
        <StyleWrapper>
            <Text>The flexible approval may not follow the operational procedures, approval participants are responsible for the completeness of attached documents.</Text>
            <StyleItems>
                <FileUpload/>
                <FormSelect>
                    <Text>Select form from database</Text>
                    <Combox
                        className="combox-form"
                        onSelect={v => console.log(v)}
                        // selectTodo={emailCalendar}
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
                </FormSelect>
            </StyleItems>
        </StyleWrapper>
    );
}

export default ApprovalDocument;
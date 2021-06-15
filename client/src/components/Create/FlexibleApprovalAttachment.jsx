/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import React, { useState } from 'react';
import styled from 'styled-components'
import FileUpload from './FileUpload';
import AttachmentTable from './AttachmentTable';
import FormControl from './FormControl'
import {dynamicFormList} from './sampleData'
import {v4 as uuid} from 'uuid'
import ControlledCombox from '../ControlledCombox';
import { getFader } from '../../utils/color';
const Container = styled.div`
    display: flex;
    flex-direction: column;
    gap: 1rem;
`
const Col = styled.div`
    flex: ${props => props.noSpan ? 0 : 1};
    display: flex;
    flex-direction: column;
`
const Description = styled.label`
    font-size: 0.9rem;
    color : ${props => props.theme.color.text.secondary};
`
const Wrapper = styled.div`
    display:flex;
    gap: 1rem;
`
const Button = styled.button`
    border: none;
    background: ${props => props.theme.color.fill.success};
    color: ${props => props.theme.color.background.primary};
    padding: 0.4em 1em;
    font-size: 1rem;
    border-radius: 0.2rem;
    cursor: pointer;

    &:hover {
        background: ${props => getFader(props.theme.color.fill.success, 0.8)}
    }
`
const VerticalBar = styled.div`
    height: 100%;
    width: 1px;
    background: ${props => props.theme.color.border.primary};
`

const FlexibleApprovalAttachment = ({attachments, set, onRemoveAttachment}) => {
    // eslint-disable-next-line no-unused-vars
    const [selectedDynamicForm, setSelectedDynamicForm] = useState()
    
    const selectDynamicForm = () => {
        if (!selectedDynamicForm) return
        let dynamicForm = dynamicFormList.find(form => form.id === selectedDynamicForm)
        set("referenceAttachments", [...attachments, {
            id: uuid().slice(0, 8),
            name: dynamicForm.name,
            type: 'FROM_DATABASE',
            file: dynamicForm.linkPath,
            fields: dynamicForm.fields.map(field => ({
                id: field.id,
                name: field.name,
                value: field.defaultValue,
                required: field.required
            }))
        }])
        setSelectedDynamicForm(null)
    }

    const handleFile = (fileList) => {
        set("referenceAttachments", (attachments.concat(fileList.map(file => ({
            id: uuid().slice(0, 8),
            name: file.name,
            type: 'FROM_COMPUTER',
            file: file,
            fields: []
        })))))
    }

    return (
        <Container>
            <Description>The flexible approval may not follow the operational procedures, approval participants are responsible for the completeness of attached documents.</Description>
            <Wrapper>
                <Col>
                    <FormControl headline="Upload from computer" noSpace>
                        <FileUpload onSubmit={handleFile} name="choose-file"/>
                    </FormControl>
                </Col>
                <Col noSpan><VerticalBar/></Col>
                <Col>
                    <FormControl headline="Select from database" noSpace>
                        <ControlledCombox 
                            selection={dynamicFormList}
                            value={dynamicFormList.find(form => form.id === selectedDynamicForm)}
                            displayField={"name"}
                            onSelect={newValue => setSelectedDynamicForm(newValue.id)} 
                        />
                    </FormControl>
                    <Button onClick={() => selectDynamicForm()}>Use form</Button>
                </Col>
                
            </Wrapper>
            {attachments.length > 0 && <AttachmentTable approvalAttachment={attachments} onRemoveAttachment={onRemoveAttachment}/>}
        </Container>
    );
}

export default FlexibleApprovalAttachment;
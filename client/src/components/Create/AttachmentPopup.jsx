import React, {useState} from 'react'
import styled from 'styled-components'
import FormControl from 'components/FormControl'
import FileUpload from './FileUpload'
import Button from 'components/Button'
import ControlledCombox from 'components/ControlledCombox'
import {useStoreState} from 'easy-peasy'
import {v4 as uuid} from 'uuid'
import {getFormDetail} from 'api/form'
const Container = styled.div`
    position: absolute;
    left: 0;
    top: 0;
    width: 100%;
    height: 100%;
    z-index: 5;
`
const Col = styled.div`
    flex: ${props => props.noSpan ? 0 : 1};
    display: flex;
    flex-direction: column;
`
const Wrapper = styled.div`
    display:flex;
    gap: 1rem;
`
const VerticalBar = styled.div`
    height: 100%;
    width: 1px;
    background: ${props => props.theme.color.border.primary};
`
const AttachmentPopup = (set, attachments) => {
    const forms = useStoreState(_ => _.forms)
    const [selectedForm, setSelectedForm] = useState()

    const selectForm = async () => {
        if (!selectedForm) return
        let formDetail = await getFormDetail(selectedForm) //formDetail = {id, name, fields, file, fileId}
        console.log("Form detail", formDetail);
        set("approvalAttachments", [...attachments, {
            ...formDetail,
            id: uuid().slice(0, 8),
            checklistItemId: null,
            reference: false
        }])
        setSelectedForm(null)
    }

    const handleFile = (fileList) => {
        set("approvalAttachments", (attachments.concat(fileList.map(file => ({
            id: uuid().slice(0, 8),
            name: file.name,
            checklistItemId: null,
            reference: false,
            fileId: null, // will be updated after the file is submitted. REMEMBER !!
            file: file,
            fields: []
        })))))
    }
    return (
        <Container>
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
                            selection={forms}
                            value={forms.find(form => form.id === selectedForm)}
                            displayField={"name"}
                            onSelect={newValue => setSelectedForm(newValue.id)} 
                        />
                    </FormControl>
                    <Button 
                        color="info"
                        padding="0.4rem"
                        onClick={() => selectForm()}
                    >Use form</Button>
                </Col>
            </Wrapper>
        </Container>
    )
}

export default AttachmentPopup
/* eslint-disable react/prop-types */
import React, {useState} from 'react'
import styled from 'styled-components'
import FormControl from 'components/FormControl'
import FileUpload from './FileUpload'
import Button from 'components/Base/Button'
import ControlledCombox from 'components/ControlledCombox'
import {useStoreState} from 'easy-peasy'
import {v4 as uuid} from 'uuid'
import {getFormDetail} from 'api/form'
import { BsCheckCircle } from 'react-icons/bs'
const Col = styled.div`
    flex: ${props => props.noSpan ? 0 : 1};
    display: flex;
    flex-direction: column;
`
const Container = styled.div`
    display: flex;
    flex-direction: column;
    border: 1px solid ${props => props.theme.color.border.primary};
    box-shadow: ${props => props.theme.shadow};
    border-radius: 0.5rem;
    background: ${props => props.theme.color.background.primary};
`
const Wrapper = styled.div`
    display:flex;
    & > * + * {
		margin-left: 1rem;
	}
    background: ${props => props.theme.color.background.primary};
    padding: 1rem;
    border-radius: 0.5rem;
`
const VerticalBar = styled.div`
    height: 100%;
    width: 1px;
    background: ${props => props.theme.color.border.primary};
`
const Header = styled.div`
    padding: 0.5rem 1rem;
    border-bottom: 1px solid ${props => props.theme.color.border.primary};
    
    & p {
        display: flex;
        align-items: center;
        & > * + * {
            margin-left: 0.5rem;
        }
    }
    & span {
        font-weight: 600;
        color: ${props => props.theme.color.text.info};
        display: inline-flex;
        align-items: center;
        & > * + * {
            margin-left: 0.5rem;
        }
    }
`
const AttachmentPopup = ({set, attachments, checkItemId, closePopup, checklist}) => {
    const forms = useStoreState(_ => _.forms)
    const [selectedForm, setSelectedForm] = useState()
    const selectForm = async () => {
        if (!selectedForm) return
        let formDetail = await getFormDetail(selectedForm) //formDetail = {id, name, fields, file, fileId}
        console.log("Form detail", formDetail);
        set("approvalAttachments", [...attachments, {
            ...formDetail,
            id: uuid().slice(0, 8),
            checklistItemId: checkItemId,
            reference: false
        }])
        setSelectedForm(null)
        closePopup()
    }

    const handleFile = (fileList) => {
        set("approvalAttachments", (attachments.concat(fileList.map(file => ({
            id: uuid().slice(0, 8),
            name: file.name,
            checklistItemId: checkItemId,
            reference: false,
            fileId: null, // will be updated after the file is submitted. REMEMBER !!
            file: file,
            fields: []
        })))))
        closePopup()
    }
    console.log(checklist)
    return (
        <Container>
            <Header>
                <p>Add attachment to <span><BsCheckCircle size="1.2rem"/>{checklist.find(_ => _.id === checkItemId) && checklist.find(_ => _.id === checkItemId).name}</span></p>
            </Header>
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
                    >Apply</Button>
                </Col>
            </Wrapper>
        </Container>
    )
}

export default AttachmentPopup
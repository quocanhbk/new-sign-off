/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import React, { useState } from "react"
import styled from "styled-components"
import FileUpload from "./FileUpload"
import AttachmentTable from "./AttachmentTable"
import FormControl from "../FormControl"
import { v4 as uuid } from "uuid"
import ControlledCombox from "../ControlledCombox"
import { useStoreState } from "easy-peasy"
import { getFormDetail } from "api/form"
import Button from "components/Base/Button"
const Container = styled.div`
    display: flex;
    flex-direction: column;
    & > * + * {
        margin-top: 1rem;
    }
`
const Col = styled.div`
    flex: ${(props) => (props.noSpan ? 0 : 1)};
    display: flex;
    flex-direction: column;
`
const Description = styled.label`
    font-size: 0.9rem;
    color: ${(props) => props.theme.color.text.secondary};
`
const Wrapper = styled.div`
    display: flex;
    & > * + * {
        margin-left: 1rem;
    }
`
const VerticalBar = styled.div`
    height: 100%;
    width: 1px;
    background: ${(props) => props.theme.color.border.primary};
`

const FlexibleApprovalAttachment = ({
    type,
    attachments,
    set,
    onRemoveAttachment,
    onEditAttachment,
    changeFieldContent,
    downloadAttachment,
}) => {
    // eslint-disable-next-line no-unused-vars
    const [selectedDynamicForm, setSelectedDynamicForm] = useState()
    const dynamicForms = useStoreState((_) => _.forms)
    const selectDynamicForm = async () => {
        if (!selectedDynamicForm) return
        let formDetail = await getFormDetail(selectedDynamicForm) //formDetail = {id, name, fields, file, fileId}
        console.log("Form detail", formDetail)
        set(type, [
            ...attachments,
            {
                ...formDetail,
                id: uuid().slice(0, 8),
                checklistItemId: null,
                reference: type === "referenceAttachments",
            },
        ])
        setSelectedDynamicForm(null)
    }

    const handleFile = (fileList) => {
        set(
            type,
            attachments.concat(
                fileList.map((file) => ({
                    id: uuid().slice(0, 8),
                    name: file.name,
                    checklistItemId: null,
                    reference: type === "referenceAttachments",
                    fileId: null, // will be updated after the file is submitted. REMEMBER !!
                    file: file,
                    fields: [],
                }))
            )
        )
    }

    return (
        <Container>
            <Description>
                The flexible approval may not follow the operational procedures,
                approval participants are responsible for the completeness of
                attached documents.
            </Description>
            <Wrapper>
                <Col>
                    <FormControl
                        headline={`Upload from computer ${
                            type === "referenceAttachments" ? "" : "(PDF)"
                        }`}
                        noSpace
                    >
                        <FileUpload
                            onSubmit={handleFile}
                            name="choose-file"
                            reference={type === "referenceAttachments"}
                        />
                    </FormControl>
                </Col>
                <Col noSpan>
                    <VerticalBar />
                </Col>
                <Col>
                    <FormControl headline="Select from database" noSpace>
                        <ControlledCombox
                            selection={dynamicForms}
                            value={dynamicForms.find(
                                (form) => form.id === selectedDynamicForm
                            )}
                            displayField={"name"}
                            onSelect={(newValue) =>
                                setSelectedDynamicForm(newValue.id)
                            }
                        />
                    </FormControl>
                    <Button
                        color="info"
                        padding="0.4rem"
                        onClick={() => selectDynamicForm()}
                    >
                        Apply
                    </Button>
                </Col>
            </Wrapper>
            {attachments.length > 0 && (
                <AttachmentTable
                    attachments={attachments}
                    onRemoveAttachment={onRemoveAttachment}
                    changeFieldContent={changeFieldContent}
                    onEditAttachment={onEditAttachment}
                    downloadAttachment={downloadAttachment}
                />
            )}
        </Container>
    )
}

export default FlexibleApprovalAttachment

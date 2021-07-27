/* eslint-disable react/prop-types */
/* eslint-disable no-constant-condition */
/* eslint-disable no-unused-vars */
import React, { useState, useEffect } from "react"
import styled from "styled-components"
import { getFader } from "utils/color"
import FlexibleApprovalAttachment from "./FlexibleApprovalAttachment"
import DescriptionEditor from "./DescriptionEditor"
import Participants from "./Participants"
import PrimaryInfo from "./PrimaryInfo"
import Header from "./Header"
import SectionContainer from "../SectionContainer"
import useDocument from "./useDocument"
import SubmitPopup from "./SubmitPopup"
import Snackbar from "components/Snackbar"
import { BsFillExclamationTriangleFill } from "react-icons/bs"
import { getProcedures } from "api/procedure"
import AttachmentCheckList from "./AttachmentChecklist"
import AttachmentPopup from "./AttachmentPopup"
import AbsoluteModal from "components/AbsoluteModal"
import FormPopup from "./FormPopup"
import useMediaQuery from "hooks/useMediaQuery"
import { Redirect } from "@reach/router"
const StyleContainer = styled.div`
    display: flex;
    flex-direction: column;
    width: 100%;
    height: 100%;
`
const ContainerItems = styled.div`
    flex: 1;
    display: flex;
    flex-direction: column;
    position: relative;
    overflow: overlay;
`
const Notify = styled.div`
    padding: 1rem;
    background: ${(props) => props.theme.color.fill.danger};
    color: ${(props) => props.theme.color.background.primary};
    display: flex;
    align-items: center;
    & > * + * {
        margin-left: 0.5rem;
    }
    border-radius: 0.5rem;

    & div {
        padding-left: 0.5rem;
        display: flex;
        flex-direction: column;
        & > * + * {
            margin-top: 0.5rem;
        }
    }
`
const Container = styled.div`
    display: flex;
    flex-direction: column;
    & > * + * {
        margin-top: 1rem;
    }
    padding: 1rem;
    overflow: auto;
    position: relative;
    overflow: overlay;
    ::-webkit-scrollbar {
        width: 0.5rem;
    }
    ::-webkit-scrollbar-track {
        background: transparent;
    }
    ::-webkit-scrollbar-thumb {
        background: ${(props) =>
            getFader(props.theme.color.fill.secondary, 0.5)};
        border-radius: 99px;
    }
    ::-webkit-scrollbar-thumb:hover {
        background: ${(props) => props.theme.color.fill.secondary};
    }
`
const Create = ({ id, mode }) => {
    const [modal, setModal] = useState()
    const [errorNotify, setErrorNotify] = useState(false)
    const [procedureList, setProcedureList] = useState([])
    const [addingAttachment, setAddingAttachment] = useState(null)
    const [editingAttachment, setEditingAttachment] = useState(null)
    const device = useMediaQuery()
    const {
        title,
        description,
        type,
        priority,
        deadline,
        relatedProjects,
        advisors,
        approvers,
        observators,
        approvalAttachments,
        referenceAttachments,
        procedure,
        checklist,
        set,
        updateAttachment,
        //Helper function
        removeAttachment,
        submitRequest,
        error,
        isSubmittable,
        changeFieldContent,
        render,
        createError,
        setCreateError,
    } = useDocument(id, mode)

    const popupSubmit = (type) => {
        if (!isSubmittable()) setErrorNotify(true)
        else setModal(type)
    }

    const renderModal = () => {
        return (
            <>
                <AbsoluteModal
                    visible={modal === "Pending" || modal === "Draft"}
                    onClickOutside={() => setModal("")}
                >
                    <SubmitPopup
                        type={modal}
                        closeSubmit={() => setModal("")}
                        submitRequest={() => submitRequest(modal)}
                        title={title}
                    />
                </AbsoluteModal>
            </>
        )
    }

    useEffect(() => {
        const fetchProcedures = async () => {
            let data = await getProcedures()
            setProcedureList(data.filter((d) => d.isActive))
        }
        fetchProcedures()
    }, [])

    return device === "PC" ? (
        <StyleContainer>
            {renderModal()}
            <Header
                openSubmit={() => popupSubmit("Pending")}
                openDraft={() => popupSubmit("Draft")}
                mode={mode}
            />

            <ContainerItems className="ContainerItems">
                <AbsoluteModal
                    visible={addingAttachment !== null}
                    onClickOutside={() => setAddingAttachment(null)}
                    width="60%"
                    maxWidth="800px"
                >
                    <AttachmentPopup
                        checkItemId={addingAttachment}
                        set={set}
                        attachments={approvalAttachments}
                        closePopup={() => setAddingAttachment(null)}
                        checklist={checklist}
                    />
                </AbsoluteModal>
                <AbsoluteModal
                    visible={editingAttachment !== null}
                    onClickOutside={() => setEditingAttachment(null)}
                    fixed
                    overflow="overlay"
                    height="80%"
                    width="90%"
                >
                    {editingAttachment && (
                        <FormPopup
                            attachmentType={editingAttachment.type}
                            attachment={(editingAttachment.type === "approval"
                                ? approvalAttachments
                                : referenceAttachments
                            ).find((_) => _.id === editingAttachment.id)}
                            onUpdateAttachment={(name, fields) => {
                                updateAttachment(
                                    editingAttachment.type,
                                    editingAttachment.id,
                                    name,
                                    fields
                                )
                                setEditingAttachment(null)
                            }}
                        />
                    )}
                </AbsoluteModal>
                {render(
                    <Container className="Container">
                        {/* SECTION PRIMARY INFO */}
                        <SectionContainer
                            headline="Primary Information"
                            haveBorder
                        >
                            <PrimaryInfo
                                error={error}
                                title={title}
                                type={type}
                                priority={priority}
                                deadline={deadline}
                                relatedProjects={relatedProjects}
                                set={set}
                                procedureList={procedureList}
                                procedure={procedure}
                            />
                        </SectionContainer>

                        {/* SECTION PARTICIPANTS */}
                        <SectionContainer headline="Participants" haveBorder>
                            <Participants
                                advisors={advisors}
                                approvers={approvers}
                                observators={observators}
                                set={set}
                                error={error}
                                mode={mode}
                            />
                        </SectionContainer>

                        {/* SECTION APPROVAL DOCUMENT */}
                        <SectionContainer
                            headline="Approval Attachment"
                            haveBorder
                        >
                            {type === "Procedure" ? (
                                <AttachmentCheckList
                                    checklist={checklist}
                                    attachments={approvalAttachments}
                                    onRemoveAttachment={(id) =>
                                        removeAttachment("approval", id)
                                    }
                                    onEditAttachment={(id) =>
                                        setEditingAttachment({
                                            type: "approval",
                                            id,
                                        })
                                    }
                                    setAddingAttachment={setAddingAttachment}
                                    changeFieldContent={(
                                        attachmentId,
                                        fieldId,
                                        content
                                    ) =>
                                        changeFieldContent(
                                            "approvalAttachments",
                                            attachmentId,
                                            fieldId,
                                            content
                                        )
                                    }
                                />
                            ) : (
                                <FlexibleApprovalAttachment
                                    type="approvalAttachments"
                                    attachments={approvalAttachments}
                                    set={set}
                                    onRemoveAttachment={(id) =>
                                        removeAttachment("approval", id)
                                    }
                                    onEditAttachment={(id) =>
                                        setEditingAttachment({
                                            type: "approval",
                                            id,
                                        })
                                    }
                                    changeFieldContent={(
                                        attachmentId,
                                        fieldId,
                                        content
                                    ) =>
                                        changeFieldContent(
                                            "approvalAttachments",
                                            attachmentId,
                                            fieldId,
                                            content
                                        )
                                    }
                                />
                            )}
                        </SectionContainer>

                        {/* SECTION REFERENCE DOCUMENT */}
                        <SectionContainer
                            headline="Reference Attachment"
                            haveBorder
                        >
                            <FlexibleApprovalAttachment
                                type="referenceAttachments"
                                attachments={referenceAttachments}
                                set={set}
                                onRemoveAttachment={(id) =>
                                    removeAttachment("reference", id)
                                }
                                onEditAttachment={(id) =>
                                    setEditingAttachment({
                                        type: "reference",
                                        id,
                                    })
                                }
                                changeFieldContent={(
                                    attachmentId,
                                    fieldId,
                                    content
                                ) =>
                                    changeFieldContent(
                                        "referenceAttachments",
                                        attachmentId,
                                        fieldId,
                                        content
                                    )
                                }
                            />
                        </SectionContainer>

                        {/* SECTION DESCRIPTION */}
                        <SectionContainer headline="Description" haveBorder>
                            <DescriptionEditor
                                description={description}
                                set={set}
                            />
                        </SectionContainer>
                    </Container>
                )}
            </ContainerItems>
            <Snackbar
                visible={errorNotify}
                onClose={() => setErrorNotify(false)}
                timeOut={2000}
            >
                <Notify>
                    <BsFillExclamationTriangleFill size="1.2rem" />
                    <p>Please fix all fields before submitting!</p>
                </Notify>
            </Snackbar>
            <Snackbar
                visible={createError}
                onClose={() => setCreateError(false)}
                timeOut={3000}
            >
                <Notify>
                    <BsFillExclamationTriangleFill size="1.2rem" />
                    <div>
                        <p>Something wrong happened!</p>
                        <p>
                            Please check the internet connection and try again!
                        </p>
                    </div>
                </Notify>
            </Snackbar>
        </StyleContainer>
    ) : (
        <Redirect to="/" noThrow />
    )
}

export default Create

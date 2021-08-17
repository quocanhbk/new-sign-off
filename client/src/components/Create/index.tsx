import { useState } from "react"
import Participants from "./Participants"
import PrimaryInfo from "./PrimaryInfo"
import Header from "./Header"
import {
    SectionContainer,
    AttachmentChecklist,
    AttachmentBoard,
    DescriptionEditor,
    ViewAttachmentModal,
    SubmitConfirmAlert,
} from "components/Base"
import useDocument from "./useDocument"
import { getActiveProcedures } from "api/procedure"
import useMediaQuery from "hooks/useMediaQuery"
import { Redirect } from "@reach/router"
import { useQuery } from "react-query"
import AddAttachmentModal from "./AddAttachmentModal"
import { Id } from "types"
import useChakraToast from "hooks/useChakraToast"
import { Box, Flex } from "@chakra-ui/layout"
import { chakra } from "@chakra-ui/react"
interface CreateProps {
    id?: number
    mode: string
}

const Create = ({ id, mode }: CreateProps) => {
    const [modal, setModal] = useState<"Draft" | "Pending" | null>()
    // const [errorNotify, setErrorNotify] = useState(false)
    const [addingCheckItem, setAddingCheckItem] = useState<Id | null>(null)
    const [editingAttachment, setEditingAttachment] = useState<{
        type: "referenceAttachments" | "approvalAttachments"
        id: Id
    } | null>(null)
    const device = useMediaQuery()
    const toast = useChakraToast()
    const {
        values,
        setValue,
        updateAttachment,
        //Helper function
        removeAttachment,
        submitRequest,
        errors,
        isSubmittable,
        changeFieldContent,
        render,
        addAttachmentFiles,
        addAttachmentForm,
    } = useDocument(id, mode)

    const { data: procedureList } = useQuery("active_procedures", () => getActiveProcedures(), {
        initialData: [],
    })

    const popupSubmit = (type: "Pending" | "Draft") => {
        if (!isSubmittable()) toast({ status: "error", title: "Please fix all fields before submitting!" })
        else setModal(type)
    }

    const renderModal = () => {
        return (
            <>
                <SubmitConfirmAlert
                    isOpen={modal === "Pending" || modal === "Draft"}
                    onClose={() => setModal(null)}
                    onConfirm={() => submitRequest(modal!)}
                    title={modal === "Pending" ? "Submit" : "Save Draft"}
                    description={
                        modal === "Pending" ? (
                            <chakra.span>
                                Are you sure to submit{" "}
                                <chakra.span color="fill.light" fontWeight="semibold">
                                    {values.title}
                                </chakra.span>
                            </chakra.span>
                        ) : (
                            <chakra.span>
                                Are you sure to save{" "}
                                <chakra.span color="fill.light" fontWeight="semibold">
                                    {values.title}
                                </chakra.span>{" "}
                                as draft
                            </chakra.span>
                        )
                    }
                />
                <AddAttachmentModal
                    isOpen={addingCheckItem !== null}
                    checklistItemName={values.checklist.find(checkItem => checkItem.id === addingCheckItem)?.name || ""}
                    onClose={() => setAddingCheckItem(null)}
                    onAddAttachmentFiles={files =>
                        addAttachmentFiles({
                            type: "approvalAttachments",
                            files,
                            checklistItemId: addingCheckItem!,
                        })
                    }
                    onAddAttachmentForms={form =>
                        addAttachmentForm({ type: "approvalAttachments", form, checklistItemId: addingCheckItem! })
                    }
                />
                <ViewAttachmentModal
                    isOpen={editingAttachment !== null}
                    onClose={() => setEditingAttachment(null)}
                    attachmentType={editingAttachment?.type}
                    attachment={
                        editingAttachment?.type
                            ? values[editingAttachment.type].find(_ => _.id === editingAttachment!.id)
                            : undefined
                    }
                    onUpdateAttachment={(name, fields) => {
                        if (editingAttachment) {
                            updateAttachment(editingAttachment.type, editingAttachment.id, name, fields)
                            setEditingAttachment(null)
                        }
                    }}
                />
            </>
        )
    }

    return device === "PC" ? (
        <Flex h="full" direction="column">
            {renderModal()}
            <Header openSubmit={() => popupSubmit("Pending")} openDraft={() => popupSubmit("Draft")} mode={mode} />
            <Box flex={1} overflow="overlay" pos="relative">
                <Flex direction="column" maxW="960px" mx="auto">
                    {render(
                        <Flex direction="column" pos="relative" p={4}>
                            {/* SECTION PRIMARY INFO */}
                            <SectionContainer title="Primary Information">
                                <PrimaryInfo
                                    title={values.title}
                                    type={values.type}
                                    procedure={values.procedure}
                                    priority={values.priority}
                                    deadline={values.deadline}
                                    relatedProjects={values.relatedProjects}
                                    setValue={setValue}
                                    errors={errors}
                                    procedureList={procedureList}
                                />
                            </SectionContainer>

                            {/* SECTION PARTICIPANTS */}
                            <SectionContainer title="Participants">
                                <Participants
                                    advisors={values.advisors}
                                    approvers={values.approvers}
                                    observators={values.observators}
                                    setValue={setValue}
                                    errors={errors}
                                    mode={mode}
                                />
                            </SectionContainer>

                            {/* SECTION APPROVAL DOCUMENT */}
                            <SectionContainer title="Approval Attachment">
                                {values.type === "Procedure" ? (
                                    <AttachmentChecklist
                                        checklist={values.checklist}
                                        attachments={values.approvalAttachments}
                                        onRemoveAttachment={id => removeAttachment("approvalAttachments", id)}
                                        onEditAttachment={id =>
                                            setEditingAttachment({
                                                type: "approvalAttachments",
                                                id,
                                            })
                                        }
                                        setAddingAttachment={setAddingCheckItem}
                                        changeFieldContent={(attachmentId, fieldId, content) =>
                                            changeFieldContent("approvalAttachments", attachmentId, fieldId, content)
                                        }
                                    />
                                ) : (
                                    <AttachmentBoard
                                        type="approvalAttachments"
                                        attachments={values.approvalAttachments}
                                        onAddAttachmentFiles={files =>
                                            addAttachmentFiles({ type: "approvalAttachments", files })
                                        }
                                        onAddAttachmentForms={form =>
                                            addAttachmentForm({ type: "approvalAttachments", form })
                                        }
                                        onRemoveAttachment={id => removeAttachment("approvalAttachments", id)}
                                        onEditAttachment={id =>
                                            setEditingAttachment({ type: "approvalAttachments", id })
                                        }
                                        changeFieldContent={(attachmentId, fieldId, content) =>
                                            changeFieldContent("approvalAttachments", attachmentId, fieldId, content)
                                        }
                                    />
                                )}
                            </SectionContainer>

                            {/* SECTION REFERENCE DOCUMENT */}
                            <SectionContainer title="Reference Attachment">
                                <AttachmentBoard
                                    type="referenceAttachments"
                                    attachments={values.referenceAttachments}
                                    onAddAttachmentFiles={files =>
                                        addAttachmentFiles({ type: "referenceAttachments", files })
                                    }
                                    onAddAttachmentForms={form =>
                                        addAttachmentForm({ type: "referenceAttachments", form })
                                    }
                                    onRemoveAttachment={id => removeAttachment("referenceAttachments", id)}
                                    onEditAttachment={id =>
                                        setEditingAttachment({
                                            type: "referenceAttachments",
                                            id,
                                        })
                                    }
                                    changeFieldContent={(attachmentId, fieldId, content) =>
                                        changeFieldContent("referenceAttachments", attachmentId, fieldId, content)
                                    }
                                />
                            </SectionContainer>

                            {/* SECTION DESCRIPTION */}
                            <SectionContainer title="Description">
                                <DescriptionEditor description={values.description} setValue={setValue} />
                            </SectionContainer>
                        </Flex>
                    )}
                </Flex>
            </Box>
        </Flex>
    ) : (
        <Redirect to="/" noThrow />
    )
}

export default Create

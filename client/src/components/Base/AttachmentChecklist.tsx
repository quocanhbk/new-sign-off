import { Fragment } from "react"
import { BsCheckCircle, BsPlus } from "react-icons/bs"
import AttachmentTablePC from "./AttachmentTablePC"
import { IRequestInput } from "api/request"
import { Id } from "types"
import { Box, Button, chakra, Flex, IconButton, Text } from "@chakra-ui/react"

interface AttachmentChecklistProps {
    checklist: IRequestInput["checklist"]
    attachments: IRequestInput["approvalAttachments"]
    onRemoveAttachment: (attachmentID: Id) => void
    onEditAttachment: (attachmentID: Id) => void
    changeFieldContent: (attachmentId: Id, fieldId: Id, content: string) => void
    setAddingAttachment: (id: Id) => void
}

const AttachmentChecklist = ({
    checklist,
    attachments,
    onRemoveAttachment,
    onEditAttachment,
    changeFieldContent,
    setAddingAttachment,
}: AttachmentChecklistProps) => {
    return (
        <Box rounded="md" overflow="hidden" border="1px" borderColor="gray.200">
            <chakra.table w="full" xs={{ "table-collapse": "collapse" }}>
                <chakra.tbody>
                    {checklist.map(checkItem => (
                        <Fragment key={checkItem.id}>
                            <chakra.tr bg="gray.100">
                                <chakra.td colSpan={2}>
                                    <Flex align="center">
                                        <IconButton
                                            color={
                                                attachments.filter(a => a.checklistItemId === checkItem.id).length > 0
                                                    ? "green.400"
                                                    : "gray.400"
                                            }
                                            icon={<BsCheckCircle size="1.4rem" />}
                                            aria-label="checklist"
                                            variant="ghost"
                                            pointerEvents="none"
                                        />
                                        <Text flex={1}>{checkItem.name}</Text>
                                    </Flex>
                                </chakra.td>
                                <chakra.td w="10%" px={2}>
                                    <Button
                                        leftIcon={<BsPlus />}
                                        size="xs"
                                        variant="ghost"
                                        onClick={() => setAddingAttachment(checkItem.id)}
                                    >
                                        Attachment
                                    </Button>
                                </chakra.td>
                            </chakra.tr>
                            {attachments.filter(a => a.checklistItemId === checkItem.id).length > 0 && (
                                <chakra.tr>
                                    <chakra.td colSpan={3} borderTop="1px" borderBottom="1px" borderColor="gray.200">
                                        <AttachmentTablePC
                                            attachments={attachments.filter(a => a.checklistItemId === checkItem.id)}
                                            onRemoveAttachment={onRemoveAttachment}
                                            onEditAttachment={onEditAttachment}
                                            changeFieldContent={changeFieldContent}
                                            noHeader
                                        />
                                    </chakra.td>
                                </chakra.tr>
                            )}
                        </Fragment>
                    ))}
                </chakra.tbody>
            </chakra.table>
        </Box>
    )
}

export default AttachmentChecklist

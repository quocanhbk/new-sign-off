// * DESCRIPTION: display approvals attachments or reference attachments in a table

import { BsTrash, BsThreeDotsVertical } from "react-icons/bs"
import { IRequestInput } from "api"
import { Box, chakra, Flex, IconButton, Text } from "@chakra-ui/react"
import FieldTable from "./FieldTable"
import { Id } from "types"

interface AttachmentTableProps {
    attachments: IRequestInput["approvalAttachments"]
    onRemoveAttachment: (attachmentId: Id) => void
    onEditAttachment: (attachmentId: Id) => void
    changeFieldContent: (attachmentId: Id, fieldId: Id, value: string) => void
    noHeader?: boolean
}

const AttachmentTablePC = ({
    attachments,
    onRemoveAttachment,
    changeFieldContent,
    onEditAttachment,
    noHeader,
}: AttachmentTableProps) => {
    return (
        <Box
            border={!noHeader ? "1px" : "0px"}
            borderColor="gray.200"
            rounded={!noHeader ? "md" : "none"}
            overflow="hidden"
        >
            <chakra.table sx={{ tableLayout: "fixed", borderCollapse: "collapse" }} w="full">
                {!noHeader && (
                    <chakra.thead>
                        <chakra.tr bg="gray.50" borderBottom="1px" borderColor="gray.200">
                            <chakra.th textAlign="left" w="35%" p={2}>
                                File Name
                            </chakra.th>
                            <chakra.th textAlign="center" p={2}>
                                Data Field
                            </chakra.th>
                            <chakra.th textAlign="center" width="10%" p={2}>
                                Action
                            </chakra.th>
                        </chakra.tr>
                    </chakra.thead>
                )}
                <chakra.tbody>
                    {attachments.map(attachment => (
                        <chakra.tr key={attachment.id}>
                            <chakra.td textAlign="left" width="35%" p={2} verticalAlign="top">
                                <Text>{attachment.name}</Text>
                            </chakra.td>
                            <chakra.td textAlign="left" p={2}>
                                <FieldTable
                                    fields={attachment.fields}
                                    changeFieldContent={(fieldId, value) =>
                                        changeFieldContent(attachment.id, fieldId, value)
                                    }
                                />
                            </chakra.td>
                            <chakra.td textAlign="center" width="10%" p={2}>
                                <Flex justify="center">
                                    <IconButton
                                        variant="ghost"
                                        rounded="full"
                                        size="sm"
                                        icon={<BsThreeDotsVertical />}
                                        aria-label="attachment-detail"
                                        onClick={() => onEditAttachment(attachment.id)}
                                    />
                                    <IconButton
                                        ml={2}
                                        variant="ghost"
                                        rounded="full"
                                        size="sm"
                                        colorScheme="red"
                                        icon={<BsTrash />}
                                        aria-label="attachment-delete"
                                        onClick={() => onRemoveAttachment(attachment.id)}
                                    />
                                </Flex>
                            </chakra.td>
                        </chakra.tr>
                    ))}
                </chakra.tbody>
            </chakra.table>
        </Box>
    )
}

export default AttachmentTablePC

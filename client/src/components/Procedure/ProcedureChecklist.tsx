import { Fragment } from "react"
import { BsCheckCircle, BsPen, BsTrash } from "react-icons/bs"
import AttachmentTablePC from "components/Base/AttachmentTablePC"
import { IRequestInput } from "api/request"
import { Box, chakra, Flex, HStack, IconButton, Text } from "@chakra-ui/react"
import { Id } from "types"

interface ProcedureChecklistProps {
    checklist: IRequestInput["checklist"]
    onDeleteCheckItem?: (checkItemId: Id) => void
    onUpdateClick?: (checkItemId: Id) => void
}

const ProcedureChecklist = ({ checklist, onDeleteCheckItem, onUpdateClick }: ProcedureChecklistProps) => {
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
                                            color={checkItem.defaultForms.length > 0 ? "green.400" : "gray.400"}
                                            icon={<BsCheckCircle size="1.4rem" />}
                                            aria-label="checklist"
                                            variant="ghost"
                                            pointerEvents="none"
                                        />
                                        <Text flex={1}>{checkItem.name}</Text>
                                    </Flex>
                                </chakra.td>
                                {onDeleteCheckItem && onUpdateClick && (
                                    <chakra.td w="10%">
                                        <HStack>
                                            <IconButton
                                                rounded="full"
                                                size="sm"
                                                icon={<BsPen size="1.2rem" />}
                                                aria-label="delete-checkitem"
                                                variant="ghost"
                                                onClick={() => onUpdateClick(checkItem.id)}
                                            />
                                            <IconButton
                                                rounded="full"
                                                size="sm"
                                                colorScheme="red"
                                                icon={<BsTrash size="1.2rem" />}
                                                aria-label="delete-checkitem"
                                                variant="ghost"
                                                onClick={() => onDeleteCheckItem(checkItem.id)}
                                            />
                                        </HStack>
                                    </chakra.td>
                                )}
                            </chakra.tr>
                            {checkItem.defaultForms.length > 0 && (
                                <chakra.tr>
                                    <chakra.td colSpan={3} borderTop="1px" borderBottom="1px" borderColor="gray.200">
                                        <AttachmentTablePC
                                            attachments={checkItem.defaultForms}
                                            noHeader
                                            readOnly={true}
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

export default ProcedureChecklist

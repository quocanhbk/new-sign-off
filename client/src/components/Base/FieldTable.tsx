// * DESCRIPTION: display form's fields in table

import { Box, chakra, Input, Text } from "@chakra-ui/react"
import { IField } from "api"
import { Id } from "types"

interface FieldTableProps {
    fields: IField[]
    changeFieldContent: (fieldId: Id, value: string) => void
    readOnly?: boolean
}

const FieldTable = ({ fields, changeFieldContent, readOnly }: FieldTableProps) => {
    return (
        <Box w="full" borderLeft="1px" borderRight="1px" borderColor="gray.200" px={2}>
            <chakra.table w="100%">
                <chakra.tbody>
                    {fields.length > 0 ? (
                        fields.map(field => (
                            <chakra.tr key={field.id}>
                                <chakra.td w="30%" py={1}>
                                    {field.name + ":"}
                                </chakra.td>
                                <chakra.td p={1}>
                                    <Input
                                        variant="filled"
                                        size="sm"
                                        value={field.content}
                                        onChange={e => changeFieldContent(field.id, e.target.value)}
                                        spellCheck="false"
                                        _focus={{ bg: "gray.200" }}
                                        _hover={{ bg: "gray.100" }}
                                        readOnly={readOnly}
                                    />
                                </chakra.td>
                            </chakra.tr>
                        ))
                    ) : (
                        <chakra.tr>
                            <chakra.td colSpan={3}>
                                <Text w="full" textAlign="center" fontSize="sm">
                                    No field
                                </Text>
                            </chakra.td>
                        </chakra.tr>
                    )}
                </chakra.tbody>
            </chakra.table>
        </Box>
    )
}

export default FieldTable

import DocContent, { DocContentProps } from "./DocContent"
import { BsCardText } from "react-icons/bs"
import { Box, Button, Flex } from "@chakra-ui/react"

interface DocDisplayProps extends DocContentProps {
    setAddingTag: (tag: string | null) => void
    attachmentType: "approvalAttachments" | "referenceAttachments"
}

const DocDisplay = ({
    file,
    addingTag,
    setAddingTag,
    fieldData,
    handleClickDoc,
    numPage,
    setNumPage,
    moveField,
    resizeField,
    attachmentType,
}: DocDisplayProps) => {
    return (
        <Flex direction="column" flex={5}>
            {file && attachmentType === "approvalAttachments" && (
                <Flex p={2} borderBottom="1px" borderColor="gray.200">
                    <Button
                        variant="ghost"
                        leftIcon={<BsCardText />}
                        onClick={() => setAddingTag(addingTag === null ? "field" : null)}
                        size="xs"
                    >
                        Add Field
                    </Button>
                </Flex>
            )}
            <Box flex={1} pos="relative" overflow="overlay">
                <DocContent
                    file={file}
                    addingTag={addingTag}
                    fieldData={fieldData}
                    handleClickDoc={handleClickDoc}
                    numPage={numPage}
                    setNumPage={setNumPage}
                    moveField={moveField}
                    resizeField={resizeField}
                />
            </Box>
        </Flex>
    )
}

export default DocDisplay

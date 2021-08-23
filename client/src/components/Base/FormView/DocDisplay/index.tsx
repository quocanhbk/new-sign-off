import DocContent, { DocContentProps } from "./DocContent"
import { BsCardText } from "react-icons/bs"
import { Box, Button, Flex } from "@chakra-ui/react"

interface DocDisplayProps extends DocContentProps {
    setAddingTag: (value: boolean) => void
    addable?: boolean
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
    addable,
    initForm,
}: DocDisplayProps) => {
    return (
        <Flex direction="column" flex={5}>
            {file && addable && (
                <Flex p={2} borderBottom="1px" borderColor="gray.200">
                    <Button
                        variant="ghost"
                        leftIcon={<BsCardText />}
                        onClick={() => setAddingTag(!addingTag)}
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
                    initForm={initForm}
                />
            </Box>
        </Flex>
    )
}

export default DocDisplay

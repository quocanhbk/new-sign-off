import { useState } from "react"
import FormFieldInput from "./FormFieldInput"
import DocDisplay from "./DocDisplay"
import useFormData from "./useFormData"
import { IAttachmentInput, IField } from "api"
import { Button, Flex, Input, Text, VStack } from "@chakra-ui/react"
import FormControl from "../FormControl"

interface FormViewProps {
    attachmentType: "approvalAttachments" | "referenceAttachments"
    attachment: IAttachmentInput
    onUpdateAttachment: (name: string, fields: IField[]) => void
}

const FormView = ({ attachment, onUpdateAttachment, attachmentType }: FormViewProps) => {
    const {
        fieldData,
        formName,
        changeFormName,
        file,
        addingTag,
        setAddingTag,
        addNewField,
        changeContent,
        moveField,
        resizeField,
        changeName,
        deleteField,
        saveForm,
    } = useFormData(attachment, onUpdateAttachment)

    const [numPage, setNumPage] = useState(0)

    return (
        <Flex w="full" h="38rem" overflow="hidden">
            <Flex
                direction="column"
                flex={1}
                h="full"
                overflow="overlay"
                p={4}
                borderRight="1px"
                borderColor="gray.200"
            >
                <FormControl label="Form Name">
                    <Input value={formName} onChange={changeFormName} spellCheck="false" autoComplete="off" />
                </FormControl>
                <FormControl label="Fields">
                    <VStack p={2} overflow="overlay" border="1px" borderColor="gray.200" rounded="md">
                        {fieldData.length > 0 ? (
                            fieldData.map(field => (
                                <FormFieldInput
                                    key={field.id}
                                    name={field.name}
                                    content={field.content}
                                    onChangeName={newValue => changeName(field.id, newValue)}
                                    onChangeContent={newValue => changeContent(field.id, newValue)}
                                    onDelete={() => deleteField(field.id)}
                                />
                            ))
                        ) : (
                            <Text fontStyle="italic">No Field</Text>
                        )}
                    </VStack>
                </FormControl>
                <Button onClick={saveForm} mt="auto">
                    Save Form
                </Button>
            </Flex>
            <DocDisplay
                attachmentType={attachmentType}
                file={file}
                addingTag={addingTag}
                setAddingTag={setAddingTag}
                fieldData={fieldData}
                handleClickDoc={addNewField}
                numPage={numPage}
                setNumPage={setNumPage}
                moveField={moveField}
                resizeField={resizeField}
            />
        </Flex>
    )
}

export default FormView

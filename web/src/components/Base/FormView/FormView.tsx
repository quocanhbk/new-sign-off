import { useState } from "react"
import FormFieldInput from "./FormFieldInput"
import DocDisplay from "./DocDisplay"
import { IField, IFormInput } from "api"
import { Button, Flex, Input, Text, VStack } from "@chakra-ui/react"
import FormControl from "../FormControl"
import { Id } from "types"

interface FormViewProps {
    values: IFormInput
    addable?: boolean
    formUtils: {
        addNewField: (pos: IField["position"]) => void
        deleteField: (fieldId: Id) => void
        changeContent: (fieldId: Id, content: string) => void
        changeName: (fieldId: Id, name: string) => void
        moveField: (fieldId: Id, pos: IField["position"]) => void
        resizeField: (fieldId: Id, pos: IField["size"]) => void
        changeFormName: (name: string) => void
        saveForm: () => void
    }
    addingTag: boolean
    setAddingTag: (value: boolean) => void
    isSaving?: boolean
}

const FormView = ({ values, formUtils, addingTag, setAddingTag, addable, isSaving }: FormViewProps) => {
    const { name, file, fields } = values
    const { addNewField, changeContent, changeFormName, changeName, deleteField, moveField, resizeField, saveForm } =
        formUtils

    const [numPage, setNumPage] = useState(0)

    return (
        <Flex w="full" h="full" overflow="hidden">
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
                    <Input
                        value={name}
                        onChange={e => changeFormName(e.target.value)}
                        spellCheck="false"
                        autoComplete="off"
                    />
                </FormControl>
                <FormControl label="Fields">
                    <VStack p={2} overflow="overlay" border="1px" borderColor="gray.200" rounded="md">
                        {fields.length > 0 ? (
                            fields.map(field => (
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
                <Button onClick={saveForm} mt="auto" isLoading={isSaving}>
                    Save Form
                </Button>
            </Flex>
            <DocDisplay
                file={file}
                addingTag={addingTag}
                setAddingTag={setAddingTag}
                fieldData={fields}
                addable={addable}
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

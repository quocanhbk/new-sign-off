import { Flex, IconButton, Input } from "@chakra-ui/react"
import { BsX } from "react-icons/bs"

interface FormFieldInputProps {
    name: string
    content: string
    onChangeContent: (newValue: string) => void
    onChangeName: (newValue: string) => void
    onDelete: () => void
}

const FormFieldInput = ({ name, content, onChangeContent, onChangeName, onDelete }: FormFieldInputProps) => {
    return (
        <Flex direction="column">
            <Flex>
                <Input
                    size="sm"
                    variant="unstyled"
                    placeholder="Insert field name..."
                    value={name}
                    onChange={e => onChangeName(e.target.value)}
                    spellCheck={"false"}
                    autoComplete="off"
                />

                <IconButton
                    onClick={onDelete}
                    colorScheme="red"
                    icon={<BsX size="1rem" />}
                    rounded="full"
                    size="xs"
                    aria-label="delete-field"
                    variant="ghost"
                />
            </Flex>

            <Input
                size="sm"
                variant="filled"
                _focus={{ bg: "gray.200" }}
                placeholder="Insert default content..."
                value={content}
                onChange={e => onChangeContent(e.target.value)}
                spellCheck={"false"}
                autoComplete="off"
            />
        </Flex>
    )
}

export default FormFieldInput

// * DESCRIPTION: used to add checkitem into checklist

import { Box, Input } from "@chakra-ui/react"
import { getForms, getFormsByIds, ICheckItem, IForm } from "api"
import { FormControl, MultipleSelect, SubmitConfirmAlert } from "components/Base"
import { useFormCore } from "hooks"
import { useEffect, useRef } from "react"
import { useMutation, useQuery } from "react-query"
import { Id } from "types"
import { v4 } from "uuid"

interface AddCheckItemPopupProps {
    isOpen: boolean
    onClose: () => void
    onSubmit: (checkItem: ICheckItem) => void
    mode: string
    initialData?: { name: string; forms: Id[] }
}

const AddCheckItemPopup = ({
    isOpen,
    onClose,
    onSubmit,
    mode,
    initialData = { name: "", forms: [] },
}: AddCheckItemPopupProps) => {
    const { values, setValue, initForm, errors, setError } = useFormCore<{ name: string; forms: Id[] }>(initialData)

    useEffect(() => {
        initForm()
        // eslint-disable-next-line
    }, [isOpen])

    const { data: forms } = useQuery("forms", getForms, {
        initialData: [],
    })

    const { mutate, isLoading } = useMutation(getFormsByIds, {
        onSuccess: forms => {
            onSubmit({
                id: v4().slice(0, 8),
                name: values.name,
                defaultForms: forms,
            })
        },
    })

    const handleSubmit = () => {
        if (values.name === "") {
            setError("name", "Name is required!")
            return
        }
        mutate(values.forms)
    }
    const inputRef = useRef<HTMLInputElement>(null)

    return (
        <SubmitConfirmAlert
            isOpen={isOpen}
            onClose={onClose}
            title={mode === "add" ? "Add check item" : "Update check item"}
            confirmText={mode === "add" ? "+ Add" : "Update"}
            onConfirm={handleSubmit}
            isLoading={isLoading}
            leastDestructiveRef={inputRef}
            description={
                <Box>
                    <FormControl label="Check item name" error={errors.name}>
                        <Input ref={inputRef} value={values.name} onChange={e => setValue("name", e.target.value)} />
                    </FormControl>
                    {forms && (
                        <FormControl label="Forms">
                            <MultipleSelect
                                selection={forms}
                                // value={forms.filter(form => values.forms.includes(form.id))}
                                value={values.forms.map(
                                    formId =>
                                        forms.find(form => form.id === formId) as Pick<IForm, "id" | "name" | "fileId">
                                )}
                                displayField="name"
                                onSelect={newForms =>
                                    setValue(
                                        "forms",
                                        newForms.map(form => form.id)
                                    )
                                }
                            />
                        </FormControl>
                    )}
                </Box>
            }
        />
    )
}

export default AddCheckItemPopup

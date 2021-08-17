import { IForm, IField, IAttachmentInput } from "api"
import { useFormCore } from "hooks"
import { ChangeEvent, useState } from "react"
import { Id } from "types"
import { v4 as uuid } from "uuid"

const useFormData = (attachment: IAttachmentInput, onUpdateAttachment: (name: string, fields: IField[]) => void) => {
    const [addingTag, setAddingTag] = useState<string | null>(null)
    const {
        values: { name: formName, fields },
        setValue,
    } = useFormCore<Pick<IForm, "name" | "fields">>({
        name: attachment.name,
        fields: attachment.fields,
    })
    const addNewField = pos => {
        if (addingTag === "field") {
            let newField = {
                id: uuid().slice(0, 8),
                name: "",
                content: "",
                position: pos,
                size: { width: 2, height: 0.1 },
                required: true,
            }
            setValue("fields", [...fields, newField])
            setAddingTag(null)
        }
    }

    const deleteField = (fieldId: Id) => setValue("fields", [...fields.filter(field => field.id !== fieldId)])

    const updateField = (fieldId: Id, fieldProp: keyof IField, data: any) => {
        let idx = fields.map(field => field.id).indexOf(fieldId)
        let field = fields[idx] as IField
        ;(field[fieldProp] as any) = fieldProp === "required" ? !field[fieldProp] : data
        setValue("fields", [...fields.slice(0, idx), field, ...fields.slice(idx + 1, fields.length)])
    }

    const changeContent = (fieldId: Id, content: string) => updateField(fieldId, "content", content)

    const changeName = (fieldId: Id, name: string) => updateField(fieldId, "name", name)

    const moveField = (fieldId: Id, position: IField["position"]) => updateField(fieldId, "position", position)

    const resizeField = (fieldId: Id, size: IField["size"]) => {
        let newSize = { width: 5, height: 0.1 }
        newSize.width = size.width > newSize.width ? size.width : newSize.width
        newSize.height = size.height > newSize.height ? size.height : newSize.height
        updateField(fieldId, "size", newSize)
    }
    const toggleRequire = (fieldId: Id) => updateField(fieldId, "required", null)

    const changeFormName = (e: ChangeEvent<HTMLInputElement>) => {
        setValue("name", e.target.value)
    }

    const saveForm = () => {
        onUpdateAttachment(formName, fields)
    }

    return {
        fieldData: fields,
        formName,
        changeFormName,
        file: attachment.file,
        addingTag,
        setAddingTag,
        addNewField,
        changeContent,
        moveField,
        resizeField,
        changeName,
        deleteField,
        toggleRequire,
        saveForm,
    }
}

export default useFormData

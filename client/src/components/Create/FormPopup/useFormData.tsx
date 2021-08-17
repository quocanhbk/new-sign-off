/* eslint-disable no-unused-vars */
import { useState } from "react"
import { v4 as uuid } from "uuid"

const useFormData = (attachment, onUpdateAttachment) => {
    const [formName, setFormName] = useState(attachment.name)
    const [fieldData, setFieldData] = useState(attachment.fields)
    const [addingTag, setAddingTag] = useState(null)

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
            setFieldData([...fieldData, newField])
            setAddingTag(null)
        }
    }

    const deleteField = fieldId => {
        setFieldData([...fieldData.filter(field => field.id !== fieldId)])
    }

    const updateField = (fieldId, fieldProp, data) => {
        let idx
        let field = fieldData.find((field, index) => {
            idx = index
            return field.id === fieldId
        })
        field[fieldProp] = fieldProp === "required" ? !field[fieldProp] : data
        setFieldData([...fieldData.slice(0, idx), field, ...fieldData.slice(idx + 1, fieldData.length)])
    }

    const changeContent = (fieldId, content) => updateField(fieldId, "content", content)

    const changeName = (fieldId, name) => updateField(fieldId, "name", name)

    const moveField = (fieldId, position) => updateField(fieldId, "position", position)

    const resizeField = (fieldId, size) => {
        let newSize = { width: 5, height: 0.1 }
        newSize.width = size.width > newSize.width ? size.width : newSize.width
        newSize.height = size.height > newSize.height ? size.height : newSize.height
        updateField(fieldId, "size", newSize)
    }
    const toggleRequire = fieldId => updateField(fieldId, "required", null)

    const changeFormName = e => {
        e.preventDefault()
        setFormName(e.target.value)
    }

    const saveForm = () => {
        onUpdateAttachment(formName, fieldData)
    }

    return {
        // Field data
        fieldData,
        // Some basic state
        formName,
        changeFormName,
        file: attachment.file,
        addingTag,
        setAddingTag,
        //Helper function
        addNewField,
        changeContent,
        moveField,
        resizeField,
        changeName,
        deleteField,
        toggleRequire,

        saveForm,
        //
    }
}

export default useFormData

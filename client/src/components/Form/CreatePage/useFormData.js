import { useState } from "react"
import {v4 as uuid} from 'uuid'
const useFormData = () => {
    const [file, setFile] = useState()
    const [fieldData, setFieldData] = useState([])
    const [addingField, setAddingField] = useState(false)

    const addNewField = (pos) => {
        if (addingField) {
            let newField = {
                id: uuid().slice(0, 8), 
                name: "", 
                content: "", 
                position: pos, 
                size: {width: 2, height: 0.1},
                required: true
            }
            setFieldData([...fieldData, newField])
            setAddingField(false)
        }
    }

    const deleteField = (fieldId) => {
        setFieldData([...fieldData.filter(field => field.id !== fieldId)])
    }

    const updateField = (fieldId, fieldProp, data) => {
        let idx
        let field = fieldData.find((field, index) => {
            idx = index
            return field.id === fieldId
        })
        field[fieldProp] = (fieldProp === "required") ? !field[fieldProp] : data
        setFieldData([...fieldData.slice(0, idx), field, ...fieldData.slice(idx + 1, fieldData.length)])
    }

    const changeContent = (fieldId, content) => updateField(fieldId, "content", content)
    
    const changeName = (fieldId, name) => updateField(fieldId, "name", name)

    const moveField = (fieldId, position) => updateField(fieldId, "position", position)

    const resizeField = (fieldId, size) => updateField(fieldId, "size", size)

    const toggleRequire = (fieldId) => updateField(fieldId, "required", null)

    return {
        // Field data
        fieldData, 
        // Some basic state
        file, setFile, addingField, setAddingField,
        //Helper function
        addNewField, changeContent, moveField, resizeField, changeName, deleteField, toggleRequire
    }
}

export default  useFormData
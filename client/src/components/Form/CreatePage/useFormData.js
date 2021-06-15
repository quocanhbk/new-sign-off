/* eslint-disable no-unused-vars */
import { navigate } from "@reach/router"
import axios from "axios"
import {useState} from "react"
import {v4 as uuid} from 'uuid'
const useFormData = () => {
    const [formName, setFormName] = useState("")
    const [file, setFile] = useState()
    const [fieldData, setFieldData] = useState([])
    const [addingTag, setAddingTag] = useState(null)

    const addNewField = (pos) => {
        if (addingTag === "field") {
            let newField = {
                id: uuid().slice(0, 8), 
                name: "", 
                content: "", 
                position: pos, 
                size: {width: 2, height: 0.1},
                required: true
            }
            setFieldData([...fieldData, newField])
            setAddingTag(null)
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

    const resizeField = (fieldId, size) => {
        let newSize = {width: 5, height: 0.1}
        newSize.width = size.width > newSize.width ? size.width : newSize.width
        newSize.height = size.height > newSize.height ? size.height : newSize.height
        updateField(fieldId, "size", newSize)
    }
    const toggleRequire = (fieldId) => updateField(fieldId, "required", null)

    const initForm = (file) => {
        setFile(file)
        setFormName(file.name.slice(0, file.name.indexOf(".")))
    }
    const changeFormName = (e) => {
        e.preventDefault()
        setFormName(e.target.value)
    }

    const saveForm = async () => {
        //post file
        const data = new FormData()
        data.append('file', file, file.name)
        const {data: {file_id}} = await axios.post('/api/v1/files', data)
        console.log("Post file OK, file id", file_id)
        //post form name
        let {data: {form_id}} = await axios.post('/api/v1/forms', {name: formName, fileId: file_id}) 
        console.log("Post form name OK, form_id", form_id)
        //post default fields
        let res = (await axios.post(`/api/v1/forms/${form_id}/default-fields`, {
            defaultFields: fieldData.map(field => ({
                field: field.name,
                type: "Field",
                value: field.content,
                x: field.position.X,
                y: field.position.Y,
                width: field.size.width,
                height: field.size.height,
                required: field.required
            }))
        })).data
        console.log("Post fields OK", res)
        navigate('/form')
    }
    
    return {
        // Field data
        fieldData, 
        // Some basic state
        formName, changeFormName, file, addingTag, setAddingTag,
        //Helper function
        addNewField, changeContent, moveField, resizeField, changeName, deleteField, toggleRequire, initForm,

        saveForm
        //
    }
}

export default  useFormData
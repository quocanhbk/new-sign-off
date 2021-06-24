/* eslint-disable no-unused-vars */
import React from "react"
import { navigate } from "@reach/router"
import { useStoreActions } from "easy-peasy"
import {useEffect, useState} from "react"
import {v4 as uuid} from 'uuid'
import {getFormDetail, postForm, updateForm} from "api/form"
import useLoading from "hooks/useLoading"
import useCustomLoader from "hooks/useCustomLoader"
import Placeholder from "components/Placeholder"


const initData = {
    name: "",
    fields: [],
    file: null
}

const useFormData = (id = null) => {

    const getForms = useStoreActions(s => s.getForms)
    const [formName, setFormName] = useState(initData.name)
    const [file, setFile] = useState(initData.file)
    const [fieldData, setFieldData] = useState(initData.fields)
    const [addingTag, setAddingTag] = useState(null)
    //const {loading, percent, setPercent, setLoading, reset} = useLoading(!!id)
    const {render, reset, setNotFound, setPercent} = useCustomLoader(!!id, <Placeholder type="NOT_FOUND"/>, true)
    useEffect(() => {
        if (id) {
            const fetchDetail = async () => {
                const formDetail = await getFormDetail(id, (v) => setPercent(v)).catch(err => {setNotFound(true);return;})
                setPercent(100)
                if (formDetail) {
                    setFormName(formDetail.name)
                    setFile(formDetail.file)
                    setFieldData(formDetail.fields)
                }
            }
            fetchDetail()
        }
    }, [])

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
        reset()
        if (id) await updateForm(id, formName, fieldData, (v) => setPercent(v))
        else await postForm(formName, file, fieldData, (v) => setPercent(v))
        getForms()
        setTimeout(() => navigate('/form'), 250)
    }
    
    return {
        // Field data
        fieldData, 
        // Some basic state
        formName, changeFormName, file, addingTag, setAddingTag,
        //Helper function
        addNewField, changeContent, moveField, resizeField, changeName, deleteField, toggleRequire, initForm,

        saveForm, setPercent, render
        //
    }
}

export default  useFormData
import { navigate } from "@reach/router"
import { useState } from "react"
import { v4 as uuid } from "uuid"
import { getFormDetail, IField, postForm, updateForm } from "api/form"
import useCustomLoader from "hooks/useCustomLoader"
import Placeholder from "components/Placeholder"
import { useMutation, useQuery, useQueryClient } from "react-query"
import { Id } from "types"
import useFormCore from "hooks/useFormCore"

interface IFormInput {
    name: string
    fields: IField[]
    file: File | null | string
}

const initData: IFormInput = {
    name: "",
    fields: [],
    file: null,
}

const useFormData = (id: null | Id = null) => {
    // const [formName, setFormName] = useState(initData.name)
    // const [file, setFile] = useState(initData.file)
    // const [fieldData, setFieldData] = useState(initData.fields)
    const { values, setValue, initForm } = useFormCore<IFormInput>(initData)
    const [addingTag, setAddingTag] = useState(null)
    const { render, reset, setNotFound, setPercent } = useCustomLoader(!!id, <Placeholder type="NOT_FOUND" />, true)
    const queryClient = useQueryClient()
    useQuery(["form", id], () => getFormDetail(id!), {
        enabled: !!id,
        onSuccess: formDetail =>
            initForm({
                name: formDetail.name,
                fields: formDetail.fields,
                file: formDetail.file,
            }),
        onError: () => setNotFound(true),
    })

    const { mutateAsync: mutatePostForm, isLoading: isSubmittingForm } = useMutation<unknown, unknown, IFormInput>(
        input => postForm({ ...input, file: input.file! })
    )
    const { mutateAsync: mutateUpdateForm, isLoading: isUploadingForm } = useMutation<unknown, unknown, IFormInput>(
        input => updateForm(id!, { name: input.name, fields: input.fields })
    )

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
            setValue("fields", [...values.fields, newField])
            setAddingTag(null)
        }
    }

    const deleteField = (fieldId: Id) => {
        setValue("fields", [...values.fields.filter(field => field.id !== fieldId)])
    }

    const updateField = (fieldId, fieldProp: "content" | "name" | "position" | "size" | "required" | "", data: any) => {
        let idx
        let field = values.fields.find((field, index) => {
            idx = index
            return field.id === fieldId
        }) as IField
        // field[fieldProp] = data
        field[fieldProp] = data
        setValue("fields", [
            ...values.fields.slice(0, idx),
            field,
            ...values.fields.slice(idx + 1, values.fields.length),
        ])
    }

    const changeContent = (fieldId: Id, content: IField["content"]) => updateField(fieldId, "content", content)

    const changeName = (fieldId: Id, name: IField["name"]) => updateField(fieldId, "name", name)

    const moveField = (fieldId: Id, position: IField["position"]) => updateField(fieldId, "position", position)

    const resizeField = (fieldId: Id, size: IField["size"]) => {
        let newSize = { width: 5, height: 0.1 }
        newSize.width = size.width > newSize.width ? size.width : newSize.width
        newSize.height = size.height > newSize.height ? size.height : newSize.height
        updateField(fieldId, "size", newSize)
    }
    const toggleRequire = fieldId => updateField(fieldId, "required", null)

    const uploadFile = file => {
        initForm({ name: file.name.slice(0, file.name.indexOf(".")), file, fields: [] })
    }
    const changeFormName = (name: string) => {
        setValue("name", name)
    }

    const saveForm = async () => {
        //post file
        reset()
        if (id) await mutateUpdateForm(values)
        else await mutatePostForm(values)
        queryClient.invalidateQueries("forms")
        setTimeout(() => navigate("/form"), 250)
    }

    return {
        values,
        changeFormName,
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
        uploadFile,
        saveForm,
        setPercent,
        render,
        isSubmitting: isUploadingForm || isSubmittingForm,
        //
    }
}

export default useFormData

import axios from "axios"
import getConfig from "./getConfig"
import { CallbackFunction, Id } from "types"
import { getFile } from "./file"

export interface IField {
    id: Id
    name: string
    content: string
    position: { X: number; Y: number }
    size: { width: number; height: number }
    required: boolean
}

export interface IForm {
    id: Id
    name: string
    fields: IField[]
    file: string | File
    fileId: number
}

export interface IFormInput extends Pick<IForm, "name" | "fields" | "file"> {}

export const getForms = async (
    callback: CallbackFunction = () => {}
): Promise<Pick<IForm, "id" | "name" | "fileId">[]> => {
    const config = await getConfig()
    const { data } = await axios.get("/api/v1/forms", config)
    callback(100)
    return data.map(d => ({
        id: d.form_id,
        name: d.name,
        fileId: d.fk_file_id,
    }))
}

export const getFormDetail = async (id: Id, callback: CallbackFunction = () => {}): Promise<IForm> => {
    const config = await getConfig()
    const { data: form } = await axios.get("/api/v1/forms/" + id, config)
    callback(33)

    const file = await getFile(form.file.file_id)
    callback(66)
    const formDetail = {
        id: form.form_id,
        name: form.name,
        fields: form.fields.map(field => ({
            id: field.default_form_field_id,
            name: field.field,
            content: field.value,
            position: { X: field.x_position, Y: field.y_position },
            size: { width: field.width, height: field.height },
            required: field.required,
        })),
        file: file,
        fileId: form.file.file_id,
    }
    return formDetail
}

export const deleteForm = async (id: Id, callback: CallbackFunction = () => {}): Promise<string> => {
    // did i forget to delete file as well
    const config = await getConfig()
    let res = await axios.delete("/api/v1/forms/" + id, config)
    if (res.status === 404) {
        callback(100)
        return "delete-not-found"
    } else if (res.status === 204) {
        callback(100)
        return "delete-success"
    } else {
        callback(100)
        return "delete-wrong"
    }
}

export const postForm = async ({ name, file, fields }: IFormInput, callback: CallbackFunction = () => {}) => {
    const config = await getConfig()
    const data = new FormData()
    data.append("file", file, (file as File).name)
    const {
        data: { file_id },
    } = await axios.post("/api/v1/files", data, config)
    callback(33)

    //post form name
    let {
        data: { form_id },
    } = await axios.post("/api/v1/forms", { name: name, fileId: file_id }, config)
    callback(66)

    //post default fields
    await axios.post(
        `/api/v1/forms/${form_id}/default-fields`,
        {
            defaultFields: fields.map(field => ({
                field: field.name,
                type: "Field",
                value: field.content,
                x: field.position.X,
                y: field.position.Y,
                width: field.size.width,
                height: field.size.height,
                required: field.required,
            })),
        },
        config
    )
    callback(100)
}

export const updateForm = async (
    id: Id,
    { name, fields }: Pick<IForm, "name" | "fields">,
    callback: CallbackFunction = () => {}
) => {
    const config = await getConfig()
    await axios.patch("/api/v1/forms/" + id, { name }, config)
    callback(50)
    await axios.put(
        "/api/v1/forms/" + id + "/default-fields",
        {
            defaultFields: fields.map(field => ({
                field: field.name,
                type: "Field",
                value: field.content,
                x: field.position.X,
                y: field.position.Y,
                width: field.size.width,
                height: field.size.height,
                required: field.required,
            })),
        },
        config
    )
    callback(100)
}

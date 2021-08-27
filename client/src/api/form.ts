import { Id } from "types"
import { getFile, postFile } from "./file"
import Fetcher from "./fetcher"

const fetcher = new Fetcher("/api/v1/forms/")
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

export const getForms = async (): Promise<Pick<IForm, "id" | "name" | "fileId">[]> => {
    const { data } = await fetcher.GET()
    return data.map(d => ({
        id: d.form_id,
        name: d.name,
        fileId: d.fk_file_id,
    }))
}

export const getFormsByIds = async (ids: Id[]): Promise<IForm[]> => {
    const forms = await Promise.all(
        ids.map(async id => {
            const form = await getFormDetail(id)
            return form
        })
    )
    return forms
}

export const getFormDetail = async (id: Id): Promise<IForm> => {
    const { data: form } = await fetcher.GET(`${id}`)
    const file = await getFile(form.file.file_id)
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

export const deleteForm = async (id: Id) => {
    // did i forget to delete file as well
    await fetcher.DELETE(id)
}

export const postForm = async ({ name, file, fields }: IFormInput): Promise<number> => {
    const fileId = await postFile(file as File)
    //post form name
    const {
        data: { form_id },
    } = await fetcher.POST("", { name, fileId })

    //post default fields
    await fetcher.POST(`${form_id}/default-fields`, {
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
    })

    return form_id
}

export const updateForm = async (id: Id, { name, fields }: Pick<IForm, "name" | "fields">) => {
    await fetcher.PATCH(id, { name })
    await fetcher.PUT(`${id}/default-fields`, {
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
    })
}

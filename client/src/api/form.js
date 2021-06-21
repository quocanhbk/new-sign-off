/* eslint-disable no-unused-vars */
import axios from 'axios'

export const getForms = async (callback = (v) => {v}) => {
    const {data} = await axios.get('/api/v1/forms')
    callback(100)
    return data.map(d => ({
        id: d.form_id,
        name: d.name,
        fileId: d.fk_file_id
    })) 
}

export const getFormDetail = async (id, callback = (v) => {v}, getFile = true) => {
    const res = await axios.get('/api/v1/forms/' + id)
    callback(33)
    if (res.status !== 404) {
        const form = res.data
        const {data: {downloadUrl: file}} = await axios.get('/api/v1/files/' + form.file.file_id)
        if (!getFile) {
            callback(100)
            return {
                id: form.form_id,
                name: form.name,
                fields: form.fields.map(field => ({
                    id: field.default_form_field_id,
                    name: field.field,
                    content: field.value,
                    position: {X: field.x_position, Y: field.y_position},
                    size: {width: field.width, height: field.height},
                    required: field.required
                })),
            }
        }
        callback(66)
        const formDetail = {
            id: form.form_id,
            name: form.name,
            fields: form.fields.map(field => ({
                id: field.default_form_field_id,
                name: field.field,
                content: field.value,
                position: {X: field.x_position, Y: field.y_position},
                size: {width: field.width, height: field.height},
                required: field.required
            })),
            file: file
        }
        return formDetail
    } else throw Error("not-found")
}

export const deleteForm = async (id) => {
    let res = await axios.delete('/api/v1/forms/' + id)
    if (res.status === 404) {
        return "delete-not-found"
    }
    else if (res.status === 204) {
        
        return "delete-success"
    }
    else return "delete-wrong"
}

export const postForm = async (name, file, fields, callback = (v) => {v}) => {
    const data = new FormData()
    data.append('file', file, file.name)
    const {data: {file_id}} = await axios.post('/api/v1/files', data)
    callback(33)

    //post form name
    let {data: {form_id}} = await axios.post('/api/v1/forms', {name: name, fileId: file_id}) 
    callback(66)

    //post default fields
    await axios.post(`/api/v1/forms/${form_id}/default-fields`, {
        defaultFields: fields.map(field => ({
            field: field.name,
            type: "Field",
            value: field.content,
            x: field.position.X,
            y: field.position.Y,
            width: field.size.width,
            height: field.size.height,
            required: field.required
        }))
    })
    callback(100)
}

export const updateForm = async (id, name, fields, callback = (v) => {v}) => {
    await axios.patch('/api/v1/forms/' + id, {
        name
    })
    callback(50)
    console.log(fields.map(field => field.position))
    await axios.put('/api/v1/forms/' + id + '/default-fields', {
        defaultFields: fields.map(field => ({
            field: field.name,
            type: "Field",
            value: field.content,
            x: field.position.X,
            y: field.position.Y,
            width: field.size.width,
            height: field.size.height,
            required: field.required
        }))
    })
    callback(100)
}
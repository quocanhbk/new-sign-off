/* eslint-disable no-unused-vars */
import axios from 'axios'
import getConfig from './getConfig'

export const getForms = async (callback = (v) => {v}) => {
    const config = await getConfig()
    const {data} = await axios.get('/api/v1/forms', config)
    callback(100)
    return data.map(d => ({
        id: d.form_id,
        name: d.name,
        fileId: d.fk_file_id
    })) 
}

export const getFormDetail = async (id, callback = (v) => {v}, getFile = true) => {
    const config = await getConfig()
    const res = await axios.get('/api/v1/forms/' + id, config)
    callback(33)
    if (res.status !== 404) {
        const form = res.data
        const {data: {downloadUrl: file}} = await axios.get('/api/v1/files/' + form.file.file_id, config)
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
            file: file,
            fileId: form.file.file_id
        }
        return formDetail
    } else throw Error("not-found")
}

export const deleteForm = async (id) => {
    const config = await getConfig()
    let res = await axios.delete('/api/v1/forms/' + id, config)
    if (res.status === 404) {
        return "delete-not-found"
    }
    else if (res.status === 204) {
        
        return "delete-success"
    }
    else return "delete-wrong"
}

export const postForm = async (name, file, fields, callback = (v) => {v}) => {
    const config = await getConfig()
    const data = new FormData()
    data.append('file', file, file.name)
    const {data: {file_id}} = await axios.post('/api/v1/files', data, config)
    callback(33)

    //post form name
    let {data: {form_id}} = await axios.post('/api/v1/forms', {name: name, fileId: file_id}, config) 
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
    }, config)
    callback(100)
}

export const updateForm = async (id, name, fields, callback = (v) => {v}) => {
    const config = await getConfig()
    await axios.patch('/api/v1/forms/' + id, {name}, config)
    callback(50)
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
    }, config)
    callback(100)
}
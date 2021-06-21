/* eslint-disable no-unused-vars */
import axios from 'axios'
import { getFormDetail } from './form'

export const getProcedures = async (callback = (v) => {v}) => {
    let {data} = await axios.get('/api/v1/procedures')
    callback(100)
    return data.map(d => ({
        id: d.procedure_id,
        title: d.title,
        description: d.description,
        isActive: d.is_active,
        tags: d.tags,
        createdBy: d.created_by
    }))
}

export const getProcedureDetail = async (id, callback = (v) => {v}) => {
    const {data} = await axios.get('/api/v1/procedures/' + id)
    callback(30)
    let checklist = data.checklist.map(item => ({
        id: item.checklist_item_id,
        name: item.name,
        defaultForms: item.form.map(f => f.form_id)
    }))
    let returnData = {
        id: data.procedure_id,
        title: data.title,
        description: data.description,
        isActive: data.is_active,
        createdBy: data.created_by,
        advisors: data.approvers.filter(a => a.type === "advisor").map(a => a.fk_user_id),
        approvers: data.approvers.filter(a => a.type === "approver").map(a => a.fk_user_id),
        observators: data.observators.map(a => a.user_id),
        tags: data.tags,
        checklist: []
    }

    if (checklist.length === 0) {
        callback(100)
        return returnData
    }

    // 1 check item contains array of form, 1 form contains id, name, and array of field
    const checklistData = await Promise.all(checklist.map(async (i) => {
        let defaultFormsDetail = await Promise.all(i.defaultForms.map(async (form) => {
            let formDetail = await getFormDetail(form, (v) => {v}, false)
            return formDetail
        }))
        return {
            id: i.id,
            name: i.name,
            defaultForms: defaultFormsDetail
        }
    }));
    callback(100)
    returnData.checklist = checklistData
    return returnData
}

export const postProcedure = async (data, callback = (v) => {v}) => {
    let {title, description, advisors, approvers, observators, checklist} = data

    
    let body = {title, description, advisors, approvers, observators, isActive: true, tags: ["TAG"]}
    let {data: {procedure_id: id}} = await axios.post('/api/v1/procedures', body).catch(_ => {return})

    callback(50)
    await axios.put("/api/v1/procedures/" + id + "/checklist", {
        checklist: checklist.map(item => ({
            name: item.name,
            formIds: item.defaultForms.map(form => form.id)
        }))
    })
    callback(100)
    return
}

export const deleteProcedure = async (id, callback = (v) => {v}) => {
    let res = await axios.delete('/api/v1/procedures/' + id)
    callback(100)
    if (res.status === 403) {
        return "delete-forbidden"
    }
    else if (res.status === 204) {
        return "delete-success"
    }
    else return "delete-wrong"
}
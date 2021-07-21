/* eslint-disable no-unused-vars */
import axios from "axios"
import { getFormDetail } from "./form"
import getConfig from "./getConfig"

export const getProcedures = async (
    callback = (v) => {
        v
    }
) => {
    const config = await getConfig()
    let { data } = await axios.get("/api/v1/procedures", config)
    callback(100)
    return data.map((d) => ({
        id: d.procedure_id,
        title: d.title,
        description: d.description,
        isActive: d.is_active,
        tags: d.tags,
        createdBy: d.created_by,
    }))
}
export const getProcedureChecklist = async (
    id,
    callback = (v) => {
        v
    }
) => {
    const config = await getConfig()
    const { data } = await axios.get("/api/v1/procedures/" + id, config)
    callback(100)
    let checklist = data.checklist.map((item) => ({
        id: item.checklist_item_id,
        name: item.name,
    }))
    return checklist
}
export const getProcedureDetail = async (
    id,
    getFile = false,
    callback = (v) => {
        v
    }
) => {
    const config = await getConfig()
    const { data } = await axios.get("/api/v1/procedures/" + id, config)
    callback(30)
    let checklist = data.checklist.map((item) => ({
        id: item.checklist_item_id,
        name: item.name,
        defaultForms: item.form.map((f) => f.form_id),
    }))
    let returnData = {
        id: data.procedure_id,
        title: data.title,
        description: data.description,
        isActive: data.is_active,
        createdBy: data.author.user_id,
        advisors: data.approver_position
            .filter((a) => a.type === "advisor")
            .map((advisor) => ({
                id: advisor.job_position_id,
                title: advisor.title,
                userId: advisor.user.user_id,
            })),
        approvers: data.approver_position
            .filter((a) => a.type === "approver")
            .map((approver) => ({
                id: approver.job_position_id,
                title: approver.title,
                userId: approver.user.user_id,
            })),
        observators: data.approver_position
            .filter((a) => a.type === "observator")
            .map((observator) => ({
                id: observator.job_position_id,
                title: observator.title,
                userId: observator.user.user_id,
            })),
        tags: data.tags,
        checklist: [],
    }
    if (checklist.length === 0) {
        callback(100)
        return returnData
    }

    // 1 check item contains array of form, 1 form contains id, name, and array of field
    const checklistData = await Promise.all(
        checklist.map(async (i) => {
            let defaultFormsDetail = await Promise.all(
                i.defaultForms.map(async (form) => {
                    let formDetail = await getFormDetail(
                        form,
                        (v) => {
                            v
                        },
                        getFile
                    )
                    return formDetail
                })
            )
            return {
                id: i.id,
                name: i.name,
                defaultForms: defaultFormsDetail,
            }
        })
    )
    callback(100)
    returnData.checklist = checklistData
    return returnData
}
export const postProcedure = async (
    data,
    callback = (v) => {
        v
    }
) => {
    const config = await getConfig()
    let {
        title,
        description,
        advisors,
        approvers,
        observators,
        checklist,
        isActive,
        tags,
    } = data
    let body = {
        title,
        description,
        advisors,
        approvers,
        observators,
        isActive,
        tags,
    }
    let {
        data: { id },
    } = await axios.post("/api/v2/procedures", body, config).catch((_) => {
        return
    })
    callback(50)
    await axios.put(
        "/api/v1/procedures/" + id + "/checklist",
        {
            checklist: checklist.map((item) => ({
                name: item.name,
                formIds: item.defaultForms.map((form) => form.id),
            })),
        },
        config
    )
    callback(100)
    return id
}
export const updateProcedure = async (
    id,
    data,
    callback = (v) => {
        v
    }
) => {
    const config = await getConfig()
    let {
        title,
        description,
        isActive,
        advisors,
        approvers,
        observators,
        checklist,
        tags,
    } = data
    let body = {
        title,
        description,
        isActive,
        advisors,
        approvers,
        observators,
        tags,
    }
    let {
        data: { id: newId },
    } = await axios.put("/api/v2/procedures/" + id, body, config)
    callback(50)

    await axios.put(
        "/api/v1/procedures/" + newId + "/checklist",
        {
            checklist: checklist.map((item) => ({
                name: item.name,
                formIds: item.defaultForms.map((form) => form.id),
            })),
        },
        config
    )
    callback(100)
    return newId
}
export const deleteProcedure = async (
    id,
    callback = (v) => {
        v
    }
) => {
    const config = await getConfig()
    let res = await axios.delete("/api/v1/procedures/" + id, config)
    callback(100)
    if (res.status === 403) {
        return "delete-forbidden"
    } else if (res.status === 204) {
        return "delete-success"
    } else return "delete-wrong"
}
export const toggleActive = async (
    id,
    isActive,
    callback = (v) => {
        v
    }
) => {
    const config = await getConfig()
    await axios.post(
        "/api/v1/procedures/" + id + "/status",
        { isActive },
        config
    )
    callback(100)
}

export const getCheckList = async (id) => {
    const config = await getConfig()
    const checklist = axios.get(`/api/v1/procedures/checklist/${id}`, config)
    return checklist
}

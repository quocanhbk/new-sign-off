import axios from "axios"
import { Id } from "types"
import Fetcher from "./fetcher"
import { getFormDetail, IForm } from "./form"
import getConfig from "./getConfig"
import { IPosition } from "./position"

const fetcher = new Fetcher("/api/v1/procedures/")
export interface ICheckItem {
    id: Id
    name: string
    defaultForms: IForm[]
}
export interface IProcedure {
    id: number
    title: string
    description: string
    isActive: boolean
    tags: string[]
    createdBy: string
    advisors: Pick<IPosition, "id" | "title" | "userId">[]
    approvers: Pick<IPosition, "id" | "title" | "userId">[]
    observators: Pick<IPosition, "id" | "title" | "userId">[]
    checklist: ICheckItem[]
}
export interface IProcedureInput extends Pick<IProcedure, "title" | "description" | "checklist"> {
    advisors: Id[]
    approvers: Id[]
    observators: Id[]
}

export type IProcedureList = Pick<IProcedure, "id" | "title" | "description" | "isActive" | "tags" | "createdBy">[]
export const getProcedures = async (): Promise<IProcedureList> => {
    const { data } = await fetcher.GET()
    return data.map(d => ({
        id: d.procedure_id,
        title: d.title,
        description: d.description,
        isActive: d.is_active,
        tags: d.tags,
        createdBy: d.created_by,
    }))
}

export const getActiveProcedures = async (): Promise<
    Pick<IProcedure, "id" | "title" | "description" | "tags" | "createdBy" | "isActive">[]
> => {
    let procedures = await getProcedures()
    return procedures.filter(procedure => procedure.isActive)
}

export const getProcedureChecklist = async (id: Id): Promise<Omit<IProcedure["checklist"], "defaultForms">> => {
    const { data } = await fetcher.GET(id)

    return data.checklist.map(item => ({
        id: item.checklist_item_id,
        name: item.name,
    }))
}

export const getProcedureDetail = async (id: Id): Promise<IProcedure> => {
    const { data } = await fetcher.GET(id)

    let checklist = data.checklist.map(checkItem => ({
        id: checkItem.checklist_item_id,
        name: checkItem.name,
        defaultForms: checkItem.form.map(form => form.form_id),
    }))
    let returnData: IProcedure = {
        id: data.procedure_id,
        title: data.title,
        description: data.description,
        isActive: data.is_active,
        createdBy: data.author.user_id,
        advisors: data.approver_position
            .filter(a => a.type === "advisor")
            .map(advisor => ({
                id: advisor.job_position_id,
                title: advisor.title,
                userId: advisor.user.user_id,
            })),
        approvers: data.approver_position
            .filter(a => a.type === "approver")
            .map(approver => ({
                id: approver.job_position_id,
                title: approver.title,
                userId: approver.user.user_id,
            })),
        observators: data.approver_position
            .filter(a => a.type === "observator")
            .map(observator => ({
                id: observator.job_position_id,
                title: observator.title,
                userId: observator.user.user_id,
            })),
        tags: data.tags,
        checklist: [],
    }
    if (checklist.length === 0) {
        return returnData
    }

    // 1 check item contains array of form, 1 form contains id, name, and array of field
    const checklistData: IProcedure["checklist"] = await Promise.all(
        checklist.map(async checkItem => {
            let defaultFormsDetail = await Promise.all(
                checkItem.defaultForms.map(async form => await getFormDetail(form))
            )
            return {
                id: checkItem.id,
                name: checkItem.name,
                defaultForms: defaultFormsDetail,
            }
        })
    )
    returnData.checklist = checklistData
    return returnData
}

export const postProcedure = async (input: IProcedureInput): Promise<number> => {
    const config = await getConfig()
    let { title, description, advisors, approvers, observators, checklist } = input
    let body = {
        title,
        description,
        advisors,
        approvers,
        observators,
        isActive: true,
        tags: [],
    }
    let {
        data: { id },
    } = await axios.post("/api/v2/procedures", body, config)

    await axios.put(
        "/api/v1/procedures/" + id + "/checklist",
        {
            checklist: checklist.map(item => ({
                name: item.name,
                formIds: item.defaultForms.map(form => form.id),
            })),
        },
        config
    )
    return id
}

export const updateProcedure = async (id: Id, input: IProcedureInput): Promise<number> => {
    const config = await getConfig()
    let { title, description, advisors, approvers, observators, checklist } = input
    let body = {
        title,
        description,
        isActive: true,
        advisors,
        approvers,
        observators,
        tags: [],
    }
    let {
        data: { id: newId },
    } = await axios.put("/api/v2/procedures/" + id, body, config)

    await axios.put(
        "/api/v1/procedures/" + newId + "/checklist",
        {
            checklist: checklist.map(item => ({
                name: item.name,
                formIds: item.defaultForms.map(form => form.id),
            })),
        },
        config
    )
    return newId
}

export const deleteProcedure = async (id: Id): Promise<void> => {
    await fetcher.DELETE(id)
}

export const toggleActive = async (id: Id, isActive: boolean): Promise<void> => {
    await fetcher.POST(`${id}/status`, { isActive })
}

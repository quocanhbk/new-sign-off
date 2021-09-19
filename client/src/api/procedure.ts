import { Id } from "types"
import Fetcher from "./fetcher"
import { getFormDetail, IForm } from "./form"
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
    type: string
    departments: string[]
    createdBy: string
    advisors: Pick<IPosition, "id" | "title" | "userId">[]
    approvers: Pick<IPosition, "id" | "title" | "userId">[]
    observators: Pick<IPosition, "id" | "title" | "userId">[]
    checklist: ICheckItem[]
}
export interface IProcedureInput
    extends Pick<IProcedure, "title" | "description" | "checklist" | "type" | "departments"> {
    advisors: Id[]
    approvers: Id[]
    observators: Id[]
}

export type IProcedureList = Pick<IProcedure, "id" | "title" | "description" | "isActive" | "tags" | "createdBy">[]
export const getProcedures = async (): Promise<IProcedureList> => {
    const { data } = await fetcher.GET()
    console.log(data)
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
        departments: data.apply_to_departments,
        type: data.type,
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
    let { title, description, advisors, approvers, observators, checklist, type, departments } = input
    let body = {
        title,
        description,
        advisors,
        approvers,
        observators,
        isActive: false,
        type,
        departments,
        tags: [],
    }
    const {
        data: { id },
    } = await fetcher.POST("", body)
    await fetcher.PUT(`${id}/checklist`, {
        checklist: checklist.map(item => ({
            name: item.name,
            formIds: item.defaultForms.map(form => form.id),
        })),
    })

    return id
}

export const updateProcedure = async (id: Id, input: IProcedureInput): Promise<number> => {
    let { title, description, advisors, approvers, observators, checklist, departments, type } = input
    let body = {
        title,
        description,
        isActive: true,
        advisors,
        approvers,
        observators,
        tags: [],
        departments,
        type,
    }

    const {
        data: { id: newId },
    } = await fetcher.PUT(id, body)
    await fetcher.PUT(`${newId}/checklist`, {
        checklist: checklist.map(item => ({
            name: item.name,
            formIds: item.defaultForms.map(form => form.id),
        })),
    })
    return newId
}

export const deleteProcedure = async (id: Id): Promise<void> => {
    await fetcher.DELETE(id)
}

export const activateProcedure = async (id: Id) => {
    await fetcher.POST(`${id}/activation`, "")
}

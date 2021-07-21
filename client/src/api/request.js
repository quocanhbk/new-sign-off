import axios from "axios"
import { v4 } from "uuid"
import getConfig from "./getConfig"
import { getProcedureChecklist } from "./procedure"
import { msalInstance } from "index"
import { removeUndefinedProps } from "utils/utils"
import { getFile } from "./file"
import faker from "faker"

export const getRequests = async (
    queryString,
    callback = (v) => {
        v
    }
) => {
    const config = await getConfig()
    let { data } = await axios.get(`/api/v1/requests?${queryString}`, config)
    callback(100)
    return data.map((request) => ({
        id: request.approval_request_id,
        type: request.type,
        title: request.title,
        status: request.status,
        priority: request.priority,
        deadline: request.deadline,
        author: {
            id: request.author.user_id,
            email: request.author.email,
            name: request.author.fullname,
        },
    }))
}

export const getLastSignRequest = async () => {
    const config = await getConfig()
    try {
        let { data } = await axios.get(
            "/api/v1/requests?sign=true&start=0&end=1",
            config
        )
        return data[0] ? data[0].approval_request_id : null
    } catch (error) {
        return null
    }
}

export const getRequestDetail = async (
    id,
    sign = false,
    callback = (v) => {
        v
    }
) => {
    const config = await getConfig()
    let { data } = await axios.get(
        `/api/v1/requests/${id}?${sign ? "sign=true" : ""}`,
        config
    )
    callback(25)
    let checklist = []
    if (data.type === "Procedure") {
        checklist = await getProcedureChecklist(data.fk_procedure_id)
        callback(50)
    }
    console.log(data)
    let returnData = {
        id: data.approval_request_id,
        title: data.title,
        createdAt: new Date(data.created_at),
        deadline: new Date(data.deadline),
        description: data.description,
        priority: data.priority,
        relatedProjects: data.related_projects,
        status: data.status,
        type: data.type,
        submitter: [
            {
                id: 0,
                order: 0,
                decision: "Approved",
                userId: data.author.user_id,
                email: data.author.email,
                fullname: data.author.fullname,
            },
        ],
        advisors: data.approvers
            .filter((a) => a.type === "advisor")
            .map((a) => ({
                id: a.approver_id,
                order: a.order,
                decision: a.decision,
                userId: a.user.user_id,
                email: a.user.email,
                fullname: a.user.fullname,
            })),
        approvers: data.approvers
            .filter((a) => a.type === "approver")
            .map((a) => ({
                id: a.approver_id,
                order: a.order,
                decision: a.decision,
                userId: a.user.user_id,
                email: a.user.email,
                fullname: a.user.fullname,
            })),
        observators: data.observators.map((o) => ({
            userId: o.user_id,
            fullname: o.fullname,
            email: o.email,
        })),
        logs: data.logs.map((log) => ({
            id: log.log_id,
            type: log.type,
            description: log.description,
            createdAt: log.created_at,
            author: {
                id: log.author.user_id,
                email: log.author.email,
                name: log.author.fullname,
            },
        })),
        currentApprover: data.current_approver,
        procedureId: data.fk_procedure_id,
        checklist: checklist,
        opinions: data.opinions.map((o) => ({
            id: o.request_opinion_id,
            comment: o.opinion,
            isFinal: o.is_final,
            createdBy: o.made_by,
            inAgreement: o.in_agreement,
        })),
        updatedAt: new Date(data.updated_at),
        approvalAttachments: data.attachments
            .filter((a) => !a.reference)
            .map((a) => ({
                id: a.attachment_id,
                name: a.name,
                checklistItemId: a.fk_checklist_item_id,
                fileId: a.fk_file_id,
                fields: a.fields.map((field) => ({
                    id: field.field_id,
                    name: field.field,
                    content: field.value,
                    position: { X: field.x_position, Y: field.y_position },
                    size: { width: field.width, height: field.height },
                    required: field.required,
                })),
            })),
        referenceAttachments: data.attachments
            .filter((a) => a.reference)
            .map((a) => ({
                id: a.attachment_id,
                name: a.name,
                checklistItemId: a.fk_checklist_item_id,
                fileId: a.fk_file_id,
                fields: a.fields.map((field) => ({
                    id: field.field_id,
                    name: field.field,
                    content: field.value,
                    position: { X: field.x_position, Y: field.y_position },
                    size: { width: field.width, height: field.height },
                    required: field.required,
                })),
            })),
    }
    await Promise.all(
        returnData.approvalAttachments.map(async (attachment) => {
            let file = await getFile(attachment.fileId)
            attachment.file = file
        })
    )
    callback(75)
    await Promise.all(
        returnData.referenceAttachments.map(async (attachment) => {
            let file = await getFile(attachment.fileId)
            attachment.file = file
        })
    )
    callback(100)

    return returnData
}

export const burstRequest = async () => {
    let arr = Array(50).fill("")
    let config = await getConfig()
    await Promise.all(
        arr.map(async () => {
            await axios.post(
                "/api/v1/requests",
                {
                    title: faker.vehicle.vehicle(),
                    type: "Flexible",
                    description: "",
                    priority: "Normal",
                    deadline: "08/01/2021",
                    status: "Pending",
                    relatedProjects: ["TTG"],
                    advisors: [],
                    approvers: ["296ff6ee-5c88-48a1-9f93-b83b8f41cb37"],
                    observators: [],
                    approvalAttachments: [],
                    referenceAttachments: [],
                },
                config
            )
        })
    )
}

export const postRequest = async (
    input,
    callback = (v) => {
        v
    }
) => {
    // REMEMBER to post all the file without the fileId first
    const config = await getConfig()
    const {
        title,
        description,
        priority,
        type,
        deadline,
        status,
        relatedProjects,
        advisors,
        approvers,
        observators,
        approvalAttachments,
        referenceAttachments,
        procedure: procedureId,
    } = input

    let sendData = {
        title,
        description,
        priority,
        type,
        deadline: new Date(deadline).toLocaleDateString("en-CA"),
        status,
        relatedProjects,
        advisors,
        approvers,
        observators,
        procedureId,
    }
    if (!sendData.procedureId) delete sendData.procedureId

    // 1. POST request data to get Request ID
    let {
        data: { approval_request_id: id },
    } = await axios.post("/api/v1/requests", sendData, config)
    // 2. POST attachments
    await Promise.all(
        approvalAttachments
            .concat(referenceAttachments)
            .map(async (attachment) => {
                if (!attachment.fileId) {
                    const data = new FormData()
                    data.append("file", attachment.file, attachment.file.name)
                    const {
                        data: { file_id },
                    } = await axios.post("/api/v1/files", data, config)
                    attachment.fileId = file_id
                }
                // POST attachment
                let attachmentBody = {
                    name: attachment.name,
                    checklistItemId: attachment.checklistItemId,
                    reference: attachment.reference,
                    fileId: attachment.fileId,
                }
                if (!attachmentBody.checklistItemId)
                    delete attachmentBody.checklistItemId
                let {
                    data: { attachment_id: attachmentId },
                } = await axios.post(
                    "/api/v1/requests/" + id + "/attachments",
                    attachmentBody,
                    config
                )

                // POST field
                let fields = attachment.fields.map((field) => ({
                    field: field.name,
                    type: "FIELD",
                    value: field.content,
                    x: field.position.X,
                    y: field.position.Y,
                    width: field.size.width,
                    height: field.size.height,
                    required: field.required,
                }))
                await axios.post(
                    "/api/v1/requests/attachments/" + attachmentId + "/fields",
                    { fields },
                    config
                )
            })
    )
    callback(100)
    return id
}

export const patchRequest = async (
    id,
    input,
    newAttachments,
    deletedAttachmentIds,
    callback = (v) => {
        v
    }
) => {
    const {
        title,
        description,
        type,
        deadline,
        status,
        relatedProjects,
        advisors,
        approvers,
        observators,
        procedure: procedureId,
    } = input
    const config = await getConfig()
    const data = removeUndefinedProps({
        title,
        description,
        type,
        deadline: new Date(deadline).toLocaleDateString("en-CA"),
        status,
        relatedProjects,
        advisors,
        approvers,
        observators,
        procedureId,
    })
    await axios.patch(`/api/v1/requests/${id}`, data, config)
    callback(33)

    // delete old attachment
    await Promise.all(
        deletedAttachmentIds.map(async (attachment) => {
            await deleteAttachment(id, attachment)
        })
    )
    callback(66)
    // post all the new attachments
    await Promise.all(
        newAttachments.map(async (attachment) => {
            if (!attachment.fileId) {
                const data = new FormData()
                data.append("file", attachment.file, attachment.file.name)
                const {
                    data: { file_id },
                } = await axios.post("/api/v1/files", data, config)
                attachment.fileId = file_id
            }
            // POST attachment
            let attachmentBody = {
                name: attachment.name,
                checklistItemId: attachment.checklistItemId,
                reference: attachment.reference,
                fileId: attachment.fileId,
            }
            if (!attachmentBody.checklistItemId)
                delete attachmentBody.checklistItemId
            let {
                data: { attachment_id: attachmentId },
            } = await axios.post(
                "/api/v1/requests/" + id + "/attachments",
                attachmentBody,
                config
            )

            // POST field
            let fields = attachment.fields.map((field) => ({
                field: field.name,
                type: "FIELD",
                value: field.content,
                x: field.position.X,
                y: field.position.Y,
                width: field.size.width,
                height: field.size.height,
                required: field.required,
            }))
            await axios.post(
                "/api/v1/requests/attachments/" + attachmentId + "/fields",
                { fields },
                config
            )
        })
    )
    callback(100)
}

export const postComment = async (id, comment) => {
    const account = msalInstance.getAllAccounts()[0]
    const name = account.name.split("-")[account.name.split("-").length - 1]
    const email = account.username
    const config = await getConfig()
    const data = {
        comment,
    }
    axios.post(`/api/v1/requests/${id}/comment/`, data, config)
    return {
        id: v4().slice(0, 8),
        type: "Comment",
        description: comment,
        createdAt: new Date(),
        author: {
            id: null,
            email: email,
            name: name,
        },
    }
}

export const approveRequest = async (
    id,
    { code, comment, opinionId },
    callback = (v) => {
        v
    }
) => {
    const config = await getConfig()
    let query = ""
    let decision = ""
    switch (code) {
        case "APPROVE":
            decision = "Approved"
            break
        case "APPROVE_WITH_OPINION":
            decision = "Approved"
            query = "approvalType=with-opinion"
            break
        case "APPROVE_WITH_EXISTING_OPINION":
            decision = "Approved"
            query = "approvalType=with-existing-opinion"
            break
        case "REJECT":
            decision = "Rejected"
            break
    }
    await axios.post(
        "/api/v1/requests/" + id + "/approval?" + query,
        {
            decision,
            opinion: comment,
            opinionId,
        },
        config
    )
    callback(100)
}

export const remindApprove = async (id, userId) => {
    let config = await getConfig()
    await axios.post(`/api/v1/requests/${id}/remind`, { userId }, config)
}

export const deleteAttachment = async (requestId, attachmentId) => {
    const config = await getConfig()
    await axios.delete(
        `/api/v1/requests/${requestId}/attachments/${attachmentId}`,
        config
    )
}

export const cancelRequest = async (id, reason) => {
    const config = await getConfig()
    await axios.post(`/api/v1/requests/${id}/cancellation`, { reason }, config)
}

export const deleteRequest = async (id) => {
    const config = await getConfig()
    await axios.delete(`/api/v1/requests/${id}`, config)
}

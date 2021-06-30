/* eslint-disable no-unused-vars */
import React, { useState } from 'react'
import {useEffect, useReducer } from 'react'
import { getProcedureDetail } from 'api/procedure'
import { v4 } from 'uuid'
import { deleteAttachment, getRequestDetail, patchRequest, postRequest } from 'api/request'
import { useStoreActions, useStoreState } from 'easy-peasy'
import useCustomLoader from 'hooks/useCustomLoader'
import Placeholder from 'components/Placeholder'
import { deleteFile, getFile } from 'api/file'

const initState = {
    title: "",
    description: "",
    type: "Flexible",
    priority: "Normal",
    deadline: null,
    relatedProjects: ["MAB"],
    advisors: [],
    approvers: [],
    observators: [],
    approvalAttachments: [],
    referenceAttachments: [],
    procedure: null,
    checklist: []
}
const reducer = (state, action) => {
    switch(action.type) {
        case 'SET':
            return {
                ...state,
                [action.payload.field]: action.payload.value
            }
        case 'RESET':
            return initState
        case 'INIT':
            return action.payload
        default:
            return state
    }
}

const initError = {
    title: "",
    deadline: "",
    relatedProjects: "",
    procedure: "",
    approvers: ""
}

const errorReducer = (state, action) => {
    switch(action.type) {
        case 'SET':
            return {
                ...state,
                [action.payload.field]: action.payload.value
            }
    }
}
const useDocument = (id, mode) => {
    const [{
        title, description, type, priority, 
        deadline, relatedProjects, 
        advisors, approvers, observators, 
        approvalAttachments, referenceAttachments, procedure, checklist
    }, dispatch] = useReducer(reducer, initState)
    const [originAttachmentIds, setOriginAttachmentIds] = useState([])
    const setPath = useStoreActions(action => action.setPath)
    const {render, reset, setPercent, setNotFound} = useCustomLoader(false, <Placeholder type="NOT_FOUND"/>)
    const forms = useStoreState(s => s.forms)
    // fetch procedure detail after user select procedure from combo box
    useEffect(() => {
        
        const fetchProcedure = async () => {
            reset()
            let data = await getProcedureDetail(procedure, true, (p) => setPercent(p))
            set("advisors", data.advisors)
            set("approvers", data.approvers)
            set("observators", data.observators)

            set("checklist", data.checklist.map(c => ({id: c.id, name: c.name})))
            let arr = data.checklist.reduce((pre, cur) => {
                let forms = cur.defaultForms.map(f => ({
                    id: v4().slice(0, 8),
                    name: f.name,
                    checklistItemId: cur.id,
                    reference: false,
                    fileId: f.fileId,
                    file: f.file,
                    fields: f.fields
                }))
                return pre.concat(forms)
            }, [])
            set("approvalAttachments", arr)
        }
        set("advisors", [])
        set("approvers", [])
        set("observators", [])
        if (procedure && !id)
            fetchProcedure()
    }, [procedure])

    useEffect(() => {
        if (type === "Flexible" && procedure)
            set("procedure", null)
    }, [type])

    useEffect(() => {
        const fetchData = async () => {
            reset()
            let data = await getRequestDetail(id, false, (p) => setPercent(p))
            //useTimeout to avoid setting state to unmounted component
            //still looking for a "cleaner" solution
            setTimeout(() => {
                if (
                    (mode === "draft" && data.status !== "Draft") || 
                    (mode === "revise" && data.status !== "Revising")
                ) setNotFound(true)
                else {
                    setOriginAttachmentIds(data.approvalAttachments.concat(data.referenceAttachments).map(a => a.id))
                    init(data)
                }
            }, 250)
        }
        if (id) fetchData()
        else dispatch({type: "RESET"})
    }, [id])

    const [error, dispatchError] = useReducer(errorReducer, initError)

    const init = async (data) => {
        let initData = {
            title: data.title,
            description: data.description,
            type: data.type,
            priority: data.priority,
            deadline: (new Date(data.deadline)).toDateString(),
            relatedProjects: data.relatedProjects,
            advisors: data.advisors.map(a => a.userId),
            approvers: data.approvers.map(a => a.userId),
            observators: data.observators.map(a => a.userId),
            approvalAttachments: data.approvalAttachments.map(attachment => ({
                id: attachment.id,
                name: attachment.name,
                checklistItemId: attachment.checklistItemId,
                reference: true,
                fileId: attachment.fileId,
                file: null,
                fields: attachment.fields
            })),
            referenceAttachments: data.referenceAttachments.map(attachment => ({
                id: attachment.id,
                name: attachment.name,
                checklistItemId: attachment.checklistItemId,
                reference: true,
                fileId: attachment.fileId,
                file: null,
                fields: attachment.fields
            })),
            procedure: data.procedureId,
            checklist: data.checklist
        }
        await (await Promise.all(data.approvalAttachments.map(_ => _.fileId))).map(async (fileId) => {
            let file = await getFile(fileId)
            initData.approvalAttachments.find(a => a.fileId === fileId).file = file
        })
        await (await Promise.all(data.referenceAttachments.map(_ => _.fileId))).map(async (fileId) => {
            let file = await getFile(fileId)
            initData.referenceAttachments.find(a => a.fileId === fileId).file = file
        })
        dispatch({type: "INIT", payload: initData})
    }

    const removeAttachment = (type = "approval", attachmentId) => {
        // when in draft mode, when user delete attachment, we should check to delete the file too
        if (type === "approval") {
            set("approvalAttachments", approvalAttachments.filter(attachment => attachment.id !== attachmentId))
        }
        else if (type === "reference") {
            set("referenceAttachments", referenceAttachments.filter(attachment => attachment.id !== attachmentId))
        }
    }
    const setError = (field, value) => dispatchError({type: "SET", payload: {field, value}})

    const set = (field, value) => {
        dispatch({type: "SET", payload: {field: field, value: value}})
        if (error[field] !== "") setError(field, "")
    }

    const changeFieldContent = (attachmentType, attachmentId, fieldId, content) => {
        let attachments = [...(attachmentType === "approvalAttachments" ? approvalAttachments : referenceAttachments)]
        let attachmentIndex = attachments.map(_ => _.id).indexOf(attachmentId)
        let attachmentObject = attachments[attachmentIndex]
        let fieldIndex = attachmentObject.fields.map(_ => _.id).indexOf(fieldId)
        let fieldObject = attachmentObject.fields[fieldIndex]
        fieldObject.content = content

        set(attachmentType, [
            ...attachments.slice(0, attachmentIndex),
            attachmentObject,
            ...attachments.slice(attachmentIndex + 1, attachments.length)
        ])
    }

    const isSubmittable = () => {
        let submittable = true
        // catch title error
        if (title === "") {
            setError("title", "Document title is required")
            submittable = false
        }
        // catch deadline error
        if (!deadline) {
            setError("deadline", "Deadline is required")
            submittable = false
        }
        else if ((new Date(deadline).getTime() < (new Date()).getTime())) {
            setError("deadline", "Deadline must be after today")
            submittable = false
        }
        // catch projects error
        if (relatedProjects.length === 0) {
            setError("relatedProjects", "At least 1 project must be selected")
            submittable = false
        }
        // catch procedure error
        if (type === "Procedure" && !procedure) {
            setError("procedure", "Procedure is required")
            submittable = false
        }
        // catch approver error
        if (approvers.length === 0) {
            setError("approvers", "At least 1 approver must be selected")
            submittable = false
        }
        if (
            advisors.some(v => approvers.concat(observators).includes(v)) ||
            approvers.some(v => advisors.concat(observators).includes(v)) ||
            observators.some(v => approvers.concat(advisors).includes(v))) {
                submittable = false
        }
        return submittable
    }

    const submitRequest = async (requestStatus) => {
        // No need to check for error anymore
        console.log("Reset")
        reset()
        const input = {
            title, 
            description, 
            priority, 
            type, 
            deadline,
            relatedProjects, 
            advisors, 
            approvers, 
            observators,
            approvalAttachments,
            referenceAttachments,
            procedure,
            status: requestStatus
        }
        let requestId = id
        if (mode === "create")
        requestId = await postRequest(input, (p) => setPercent(p))
        else {
            // delete attachment first
            let deletedAttachmentIds = originAttachmentIds.filter(a => !approvalAttachments.concat(referenceAttachments).map(_ => _.id).includes(a))
            console.log(deletedAttachmentIds)
            await Promise.all(deletedAttachmentIds.map(async (attachment) => {
                await deleteAttachment(requestId, attachment)
            }))
            await patchRequest(id, input, (p) => setPercent(p))
        }
        setTimeout(() => setPath("/search/" + requestId), 400)
    }

    const updateAttachment = (attachmentType, attachmentId, name, fields) => {
        if (attachmentType === "approval") {
            let newAttachments = [...approvalAttachments]
            let updatingAttachment = newAttachments.find(_ => _.id === attachmentId)
            updatingAttachment.name = name
            updatingAttachment.fields = fields
            set("approvalAttachments", newAttachments)
        } else {
            let newAttachments = [...referenceAttachments]
            let updatingAttachment = newAttachments.find(_ => _.id === attachmentId)
            updatingAttachment.name === name
            updatingAttachment.fields = fields
            set("referenceAttachments", newAttachments)
        }
    }

    return {
        title, description, type,
        priority, deadline, relatedProjects,
        advisors, approvers, observators,
        approvalAttachments, referenceAttachments,
        procedure, checklist,
        set,
        //Helper function
        removeAttachment, submitRequest, isSubmittable, changeFieldContent, 
        //Error
        error, setError, render, updateAttachment


    }
}

export default useDocument
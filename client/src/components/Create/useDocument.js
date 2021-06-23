/* eslint-disable no-unused-vars */
import {useEffect, useReducer } from 'react'
import { getProcedureDetail } from 'api/procedure'
import { v4 } from 'uuid'
import { postRequest } from 'api/request'
import { useStoreActions } from 'easy-peasy'

const initState = {
    title: "",
    description: "",
    type: "Flexible",
    priority: "Normal",
    deadline: null,
    relatedProjects: [],
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
        default:
            return state
    }
}

const initError = {
    title: "",
    deadline: "",
    relatedProjects: ""
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
const useDocument = () => {
    const [{
        title, description, type, priority, 
        deadline, relatedProjects, 
        advisors, approvers, observators, 
        approvalAttachments, referenceAttachments, procedure, checklist
    }, dispatch] = useReducer(reducer, initState)
    const setPath = useStoreActions(action => action.setPath)
    useEffect(() => {
        
        const fetchProcedure = async () => {
            let data = await getProcedureDetail(procedure, true)
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
        if (procedure)
            fetchProcedure()
    }, [procedure])

    const [error, dispatchError] = useReducer(errorReducer, initError)

    const removeAttachment = (type = "approval", id) => {
        if (type === "approval")
            set("approvalAttachments", approvalAttachments.filter(attachment => attachment.id !== id))
        else if (type === "reference")
            set("referenceAttachments", referenceAttachments.filter(attachment => attachment.id !== id))

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
        if (
            advisors.some(v => approvers.concat(observators).includes(v)) ||
            approvers.some(v => advisors.concat(observators).includes(v)) ||
            observators.some(v => approvers.concat(advisors).includes(v))) {
                submittable = false
        }
        return submittable
    }

    const submitRequest = async () => {
        // No need to check for error anymore
        console.log("Submitting...")
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
            procedure
        }
        //let id = await postRequest(input)
        //setPath("/search/" + id)
        setPath("/search/")
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
        error, setError


    }
}

export default useDocument
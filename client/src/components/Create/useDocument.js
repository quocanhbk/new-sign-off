/* eslint-disable no-unused-vars */
import {useReducer } from 'react'

const initState = {
    title: "",
    description: "",
    type: "Procedure",
    priority: "Normal",
    deadline: null,
    relatedProjects: [],
    advisors: [],
    approvers: [],
    observators: [],
    approvalAttachments: [],
    referenceAttachments: [],
    procedure: null
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
        approvalAttachments, referenceAttachments
    }, dispatch] = useReducer(reducer, initState)

    const [error, dispatchError] = useReducer(errorReducer, initError)

    const removeAttachment = (type = "approval", id) => {
        // if (type === "approval")
        //     setApprovalAttachment(approvalAttachment.filter(attachment => attachment.id !== id))
        // else if (type === "reference")
        //     setReferenceAttachment(referenceAttachment.filter(attachment => attachment.id !== id))
        console.log("What")
    }
    const setError = (field, value) => dispatchError({type: "SET", payload: {field, value}})

    const set = (field, value) => {
        dispatch({type: "SET", payload: {field: field, value: value}})
        if (error[field] !== "") setError(field, "")
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

    const submitRequest = () => {
        // catch title error
        if (title === "")
            setError("title", "Document title is required")
        // catch deadline error
        if (!deadline)
            setError("deadline", "Deadline is required")
        else if ((new Date(deadline).getTime() < (new Date()).getTime()))
            setError("deadline", "Deadline must be after today")
        // catch projects error
        if (relatedProjects.length === 0)
            setError("relatedProjects", "At least 1 project must be selected")
        else {
            //Perform submit here
        }
    }
    return {
        title, description, type,
        priority, deadline, relatedProjects,
        advisors, approvers, observators,
        approvalAttachments, referenceAttachments,
        set,
        //Helper function
        removeAttachment, submitRequest, isSubmittable,
        //Error
        error, setError


    }
}

export default useDocument
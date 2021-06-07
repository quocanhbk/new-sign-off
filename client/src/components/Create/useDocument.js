import { useState } from 'react'
const useDocument = () => {
    const [title, setTitle] = useState("")
    const [description, setDescription] = useState("")
    const [approvalType, setApprovalType] = useState("FLEXIBLE")
    const [priority, setPriority] = useState("NORMAL")
    const [deadline, setDeadline] = useState(null)
    const [relatedProject, setRelatedProject] = useState()
    const [advisors, setAdvisors] = useState([])
    const [approvers, setApprovers] = useState([])
    const [observators, setObservators] = useState([])
    const [approvalAttachment, setApprovalAttachment] = useState([])
    const [referenceAttachment, setReferenceAttachment] = useState([])
    const [process, setProcess] = useState()

    const removeAttachment = (type = "approval", id) => {
        if (type === "approval")
            setApprovalAttachment(approvalAttachment.filter(attachment => attachment.id !== id))
        else if (type === "reference")
            setReferenceAttachment(referenceAttachment.filter(attachment => attachment.id !== id))
    }

    return {
        title, setTitle, description, setDescription, approvalType, setApprovalType,
        priority, setPriority, deadline, setDeadline, relatedProject, setRelatedProject,
        advisors, setAdvisors, approvers, setApprovers, observators, setObservators,
        approvalAttachment, setApprovalAttachment, referenceAttachment, setReferenceAttachment,
        process, setProcess,

        //Helper function
        removeAttachment
    }
}

export default useDocument
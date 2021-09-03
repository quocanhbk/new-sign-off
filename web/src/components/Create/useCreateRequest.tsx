import { useState, useEffect } from "react"
import { getFile, IRequest, IRequestInput, IField, IForm } from "api"
import { v4 } from "uuid"
import { useStoreActions } from "store"
import {
    useFormCore,
    useLoader,
    useChakraToast,
    useGetRequest,
    usePostRequest,
    usePatchRequest,
    useGetProcedure,
} from "hooks"
import { Id } from "types"
import { useQueryClient } from "react-query"

const initState: Omit<IRequestInput, "status"> = {
    title: "",
    description: "",
    type: "Flexible",
    priority: "Normal",
    deadline: null,
    relatedProjects: ["TTG"],
    advisors: [],
    approvers: [],
    observators: [],
    approvalAttachments: [],
    referenceAttachments: [],
    procedure: null,
    checklist: [],
}
const useDocument = (id?: number, mode?: string) => {
    const toast = useChakraToast()
    const queryClient = useQueryClient()
    const { values, setValue, errors, setError, initForm } = useFormCore<Omit<IRequestInput, "status">>(initState)
    const {
        title,
        type,
        deadline,
        relatedProjects,
        procedure,
        advisors,
        approvers,
        observators,
        approvalAttachments,
        referenceAttachments,
    } = values
    const [originAttachmentIds, setOriginAttachmentIds] = useState<Id[]>([])
    const setPath = useStoreActions(action => action.setPath)
    const { render, setIsLoading, setNotFound } = useLoader()
    const [, , fetchProcedure] = useGetProcedure(procedure!, {
        enabled: false,
        onSettled: () => setIsLoading(false),
        onError: () => {
            toast({ status: "error", title: "Failed to get procedure!", description: "Please try again later" })
        },
        onSuccess: procedure => {
            if (mode !== "revise") {
                initForm({
                    ...values,
                    advisors: procedure.advisors.map(advisor => advisor.userId),
                    approvers: procedure.approvers.map(approver => approver.userId),
                    observators: procedure.observators.map(observator => observator.userId),
                })
            }
            setValue(
                "checklist",
                procedure.checklist.map(c => ({ id: c.id, name: c.name }))
            )
            let attachments = procedure.checklist.reduce<IRequestInput["approvalAttachments"]>(
                (pre, cur) =>
                    pre.concat(
                        cur.defaultForms.map(form => ({
                            id: v4().slice(0, 8),
                            name: form.name,
                            checklistItemId: cur.id,
                            reference: false,
                            fileId: form.fileId,
                            file: form.file,
                            fields: form.fields,
                        }))
                    ),
                []
            )
            setValue("approvalAttachments", attachments)
        },
    })

    useGetRequest(
        id!,
        { sign: false },
        {
            onSuccess: data => {
                if ((mode === "draft" && data.status !== "Draft") || (mode === "revise" && data.status !== "Revising"))
                    setNotFound(true)
                else {
                    setOriginAttachmentIds(data.approvalAttachments.concat(data.referenceAttachments).map(a => a.id))
                    init(data)
                }
            },
            onError: () => setNotFound(true),
            enabled: !!id,
        }
    )
    const [mutatePostRequest, isPostingRequest] = usePostRequest()
    const [mutatePatchRequest, isPatchingRequest] = usePatchRequest(id!)

    // if
    useEffect(() => {
        // if procedure change and mode !== "revise" => reset advisors, approvers, observators to []
        if (mode !== "revise") {
            setValue("advisors", [])
            setValue("approvers", [])
            setValue("observators", [])
            setValue("checklist", [])
            setValue("approvalAttachments", [])
        }
        if (procedure) {
            setIsLoading(true)
            fetchProcedure()
        }
    }, [procedure, initForm, mode, setValue, setIsLoading, fetchProcedure])

    // * remove procedure detail when switch type from 'procedure' from 'flexible'
    useEffect(() => {
        if (type === "Flexible" && procedure) setValue("procedure", null)
    }, [type, procedure, setValue])

    const init = async (data: IRequest) => {
        // get approval attachments file
        let approvalAtt: IRequestInput["approvalAttachments"] = await Promise.all(
            data.approvalAttachments.map(async attachment => {
                let file = await getFile(attachment.fileId)
                return {
                    id: attachment.id,
                    name: attachment.name,
                    checklistItemId: attachment.checklistItemId,
                    reference: true,
                    fileId: attachment.fileId,
                    file: file,
                    fields: attachment.fields,
                }
            })
        )

        // get reference attachments file
        let referenceAtt: IRequestInput["referenceAttachments"] = await Promise.all(
            data.referenceAttachments.map(async attachment => {
                let file = await getFile(attachment.fileId)
                return {
                    id: attachment.id,
                    name: attachment.name,
                    checklistItemId: attachment.checklistItemId,
                    reference: false,
                    fileId: attachment.fileId,
                    file: file,
                    fields: attachment.fields,
                }
            })
        )
        let initData: IRequestInput = {
            title: data.title,
            description: data.description,
            type: data.type,
            status: "Pending",
            priority: data.priority,
            deadline: data.deadline ? new Date(data.deadline).toDateString() : null,
            relatedProjects: data.relatedProjects,
            advisors: data.advisors.map(a => a.userId),
            approvers: data.approvers.map(a => a.userId),
            observators: data.observators.map(a => a.userId),
            approvalAttachments: approvalAtt,
            referenceAttachments: referenceAtt,
            procedure: data.procedureId,
            checklist: data.checklist,
        }
        initForm(initData)
    }

    const removeAttachment = (type: "approvalAttachments" | "referenceAttachments", attachmentId: Id) => {
        setValue(
            type,
            values[type].filter(attachment => attachment.id !== attachmentId)
        )
    }

    const changeFieldContent = (
        attachmentType: "approvalAttachments" | "referenceAttachments",
        attachmentId: Id,
        fieldId: Id,
        content: string
    ) => {
        let attachments = [...(attachmentType === "approvalAttachments" ? approvalAttachments : referenceAttachments)]
        let attachmentIndex = attachments.map(attachment => attachment.id).indexOf(attachmentId)
        let attachmentObject = attachments[attachmentIndex]
        let fieldIndex = attachmentObject.fields.map(_ => _.id).indexOf(fieldId)
        let fieldObject = attachmentObject.fields[fieldIndex]
        fieldObject.content = content

        setValue(attachmentType, [
            ...attachments.slice(0, attachmentIndex),
            attachmentObject,
            ...attachments.slice(attachmentIndex + 1, attachments.length),
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
        } else if (new Date(deadline).getTime() < new Date().getTime()) {
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
            observators.some(v => approvers.concat(advisors).includes(v))
        ) {
            submittable = false
        }
        return submittable
    }
    const isDraftSubmittable = () => {
        let submittable = true
        if (title === "") {
            setError("title", "Document title is required")
            submittable = false
        }
        return submittable
    }
    const submitRequest = async (requestStatus: "Pending" | "Draft") => {
        const input: IRequestInput = { ...values, status: requestStatus }

        if (mode === "create")
            mutatePostRequest(input, {
                onError: () => {
                    toast({ status: "error", title: "Unable to create request", description: "Try again later" })
                },
                onSuccess: requestId => {
                    toast({ status: "success", title: "Submitted request successfully!" })
                    queryClient.invalidateQueries("requests")
                    setPath("/search/" + requestId)
                },
            })
        else {
            // delete attachment first
            let deletedAttachmentIds = originAttachmentIds.filter(
                attachmentId =>
                    !approvalAttachments
                        .concat(referenceAttachments)
                        .map(_ => _.id)
                        .includes(attachmentId)
            )

            let newAttachments = approvalAttachments
                .concat(referenceAttachments)
                .filter(attachment => !originAttachmentIds.includes(attachment.id))
            mutatePatchRequest(
                { input, newAttachments, deletedAttachmentIds },
                {
                    onError: () => {
                        toast({ status: "error", title: "Unable to patch request", description: "Try again later" })
                    },
                    onSuccess: () => {
                        toast({ status: "success", title: "Request submitted successfully!" })
                        queryClient.invalidateQueries("requests")
                        setPath("/search/" + id)
                    },
                }
            )
        }
    }

    const updateAttachment = (
        attachmentType: "approvalAttachments" | "referenceAttachments",
        attachmentId: Id,
        name: string,
        fields: IField[]
    ) => {
        let newAttachments = [...values[attachmentType]]
        let updatingAttachment = newAttachments.find(attachment => attachment.id === attachmentId)
        updatingAttachment!.name = name
        updatingAttachment!.fields = fields
        setValue(attachmentType, newAttachments)
    }

    const addAttachmentFiles = ({
        type,
        files,
        checklistItemId,
    }: {
        type: "approvalAttachments" | "referenceAttachments"
        files: File[]
        checklistItemId?: Id
    }) => {
        let attachments: IRequestInput["approvalAttachments"] = files.map(file => ({
            id: v4().slice(0, 8),
            name: file.name,
            checklistItemId: checklistItemId || null,
            reference: type === "referenceAttachments",
            fileId: null, // will be updated after the file is submitted. REMEMBER !!
            file: file,
            fields: [],
        }))
        setValue(type, [...values[type], ...attachments])
    }

    const addAttachmentForm = ({
        type,
        form,
        checklistItemId,
    }: {
        type: "approvalAttachments" | "referenceAttachments"
        form: IForm
        checklistItemId?: Id
    }) => {
        let newAttachment = {
            ...form,
            id: v4().slice(0, 8),
            checklistItemId: checklistItemId || null,
            reference: type === "referenceAttachments",
        }
        setValue(type, [...values[type], newAttachment])
    }

    return {
        values,
        setValue,
        removeAttachment,
        submitRequest,
        isSubmittable,
        isDraftSubmittable,
        changeFieldContent,
        //Error
        errors,
        setError,
        render,
        updateAttachment,
        addAttachmentFiles,
        addAttachmentForm,
        isSubmitting: isPostingRequest || isPatchingRequest,
    }
}

export default useDocument

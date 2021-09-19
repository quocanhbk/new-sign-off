import { getProcedureDetail, ICheckItem, IProcedureInput, postProcedure, updateProcedure } from "api/procedure"
import { navigate } from "@reach/router"
import { Id } from "types"
import { useChakraToast, useFormCore, useLoader } from "hooks"
import { useMutation, useQuery } from "react-query"
import { useEffect, useState } from "react"

const initState: IProcedureInput = {
    title: "",
    description: "",
    type: "",
    departments: [],
    advisors: [],
    approvers: [],
    observators: [],
    checklist: [],
}

const useProcedure = (id: Id) => {
    const { values, setValue, errors, setError, initForm } = useFormCore<IProcedureInput>(initState)
    const { title, advisors, approvers, observators, checklist } = values
    const { render, setNotFound, setIsLoading } = useLoader()
    const toast = useChakraToast()
    const [addCheckItemPopup, setAddCheckItemPopup] = useState<{ mode: "add" | "update"; id?: Id } | null>(null)
    const [submitPopup, setSubmitPopup] = useState(false)
    // * QUERY: get procedure detail
    const { isFetching: isGettingProcedure } = useQuery(["procedure", id], () => getProcedureDetail(id!), {
        enabled: !!id,
        onSuccess: procedureDetail =>
            initForm({
                title: procedureDetail.title,
                description: procedureDetail.description,
                type: procedureDetail.type,
                departments: procedureDetail.departments,
                checklist: procedureDetail.checklist,
                advisors: procedureDetail.advisors.map(advisor => advisor.id),
                approvers: procedureDetail.approvers.map(approver => approver.id),
                observators: procedureDetail.observators.map(observator => observator.id),
            }),
        onError: () => {
            setNotFound(true)
        },
    })
    useEffect(() => {
        setIsLoading(isGettingProcedure)
    }, [isGettingProcedure, setIsLoading])

    const isSubmittable = () => {
        let submittable = true
        if (title === "") {
            setError("title", "Document title is required")
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

    // * MUTATION: post procedure
    const { mutate: mutatePostProcedure, isLoading: isPostingProcedure } = useMutation(() => postProcedure(values), {
        onSuccess: id => {
            toast({ status: "success", title: "Created procedure successfully!" })
            navigate(`/procedure/view/${id}`)
        },
        onError: () => {
            toast({ status: "error", title: "Failed to create procedure!", description: "Please try again later" })
        },
    })

    // * MUTATION: update procedure
    const { mutate: mutateUpdateProcedure, isLoading: isUpdatingProcedure } = useMutation(
        () => updateProcedure(id, values),
        {
            onSuccess: id => {
                toast({ status: "success", title: "Updated procedure successfully!" })
                navigate(`/procedure/view/${id}`)
            },
            onError: () => {
                toast({ status: "error", title: "Failed to update procedure!", description: "Please try again later" })
            },
        }
    )
    const openSubmitPopup = () => {
        if (isSubmittable()) {
            setSubmitPopup(true)
        } else {
            toast({ status: "error", title: "Please fix all errors!" })
        }
    }
    const submitProcedure = () => {
        if (id) mutateUpdateProcedure()
        else mutatePostProcedure()
    }

    const addCheckItem = (checkItem: ICheckItem) => {
        setValue("checklist", [...checklist, checkItem])
    }

    const updateCheckItem = (checkItemId: Id, checkItem: ICheckItem) => {
        const idx = checklist.map(checkItem => checkItem.id).indexOf(checkItemId)
        setValue("checklist", [
            ...checklist.slice(0, idx),
            { ...checkItem, id: checklist[idx].id },
            ...checklist.slice(idx + 1, checklist.length),
        ])
    }

    const removeCheckItem = (checkItemId: Id) =>
        setValue(
            "checklist",
            checklist.filter(item => item.id !== checkItemId)
        )

    return {
        values,
        errors,
        submitProcedure,
        addCheckItem,
        updateCheckItem,
        render,
        removeCheckItem,
        addCheckItemPopup,
        setAddCheckItemPopup,
        setValue,
        submitPopup,
        setSubmitPopup,
        isSubmitting: isPostingProcedure || isUpdatingProcedure,
        openSubmitPopup,
    }
}

export default useProcedure

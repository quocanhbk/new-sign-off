import { useEffect, useRef, useState } from "react"
import { useMutation, useQuery } from "react-query"
import { deleteForm, getFormDetail } from "api/form"
import { useChakraToast, useLoader } from "hooks"
import { Id } from "types"
import { navigate } from "@reach/router"
const useForm = (id: Id) => {
    const toast = useChakraToast()
    const { render, setNotFound, setIsLoading } = useLoader()
    const [deletePopup, setDeletePopup] = useState(false)

    // * QUERY: Query form by id
    const { data, refetch, status, isLoading } = useQuery(["form", id], () => getFormDetail(id), {
        onError: () => setNotFound(true),
        enabled: false,
    })

    useEffect(() => {
        setIsLoading(isLoading)
    }, [isLoading])

    // * MUTATION: Delete form
    const { mutate: mutateDeleteForm } = useMutation(() => deleteForm(id), {
        onSuccess: () => {
            toast({ status: "success", title: "Delete form successfully" })
            navigate("/form")
        },
        onError: () => {
            toast({ status: "error", title: "Unable to delete form", description: "Try again later" })
        },
    })

    // if a form with id is not cached, start fetching
    useEffect(() => {
        if (status === "idle") {
            refetch()
        }
    }, [id])
    let docRef = useRef<HTMLDivElement>(null)

    const [numPage, setNumPage] = useState(0)
    const [renderFields, setRenderFields] = useState(false)
    useEffect(() => {
        return () => setRenderFields(false)
    }, [id])
    return {
        render,
        form: data,
        docRef,
        numPage,
        setNumPage,
        renderFields,
        setRenderFields,
        mutateDeleteForm,
        deletePopup,
        setDeletePopup,
    }
}

export default useForm

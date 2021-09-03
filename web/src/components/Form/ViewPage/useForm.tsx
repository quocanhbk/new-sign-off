import { useEffect, useRef, useState } from "react"
import { useChakraToast, useDeleteForm, useGetForm, useLoader } from "hooks"
import { Id } from "types"
import { navigate } from "@reach/router"
const useForm = (id: Id) => {
    const toast = useChakraToast()
    const { render, setNotFound, setIsLoading } = useLoader()
    const [deletePopup, setDeletePopup] = useState(false)

    // * QUERY: Query form by id
    const [data, isFetching] = useGetForm(id, {
        onError: () => setNotFound(true),
        enabled: true,
        cacheTime: 0,
    })
    useEffect(() => {
        setIsLoading(isFetching)
    }, [isFetching, setIsLoading])

    // * MUTATION: Delete form
    const [mutateDeleteForm] = useDeleteForm({
        onSuccess: () => {
            toast({ status: "success", title: "Delete form successfully" })
            navigate("/form")
        },
        onError: () => {
            toast({ status: "error", title: "Unable to delete form", description: "Try again later" })
        },
    })
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

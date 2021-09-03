import { navigate } from "@reach/router"
import { IFormInput } from "api"
import { useChakraToast, useGetForm, useLoader, usePostForm, useUpdateForm } from "hooks"
import { useEffect, useState } from "react"
import { useQueryClient } from "react-query"
import { Id } from "types"

const useCreateForm = (id?: Id) => {
    const queryClient = useQueryClient()
    const toast = useChakraToast()
    const [attachment, setAttachment] = useState<IFormInput>({
        name: "",
        file: "",
        fields: [],
    })
    const { render, setNotFound, setIsLoading } = useLoader()

    const init = (file: File) => {
        setAttachment({
            name: file.name,
            file,
            fields: [],
        })
    }

    // * QUERY: get form detail
    const [, isFetching] = useGetForm(id!, {
        enabled: !!id,
        onSuccess: formDetail =>
            setAttachment({
                name: formDetail.name,
                fields: formDetail.fields,
                file: formDetail.file,
            }),
        onError: () => setNotFound(true),
    })
    useEffect(() => {
        setIsLoading(isFetching)
    }, [isFetching, setIsLoading])

    // * MUTATION: post form
    const [mutatePostForm, isSubmittingForm] = usePostForm({
        onSuccess: id => {
            toast({ status: "success", title: "Created form successfully!" })
            queryClient.invalidateQueries("forms")
            navigate(`/form/view/${id}`)
        },
        onError: () => {
            toast({ status: "error", title: "Failed to create form!", description: "Try again later" })
        },
    })

    // * MUTATION: update form
    const [mutateUpdateForm, isUpdatingForm] = useUpdateForm(id!, {
        onSuccess: () => {
            toast({ status: "success", title: "Updated form successfully!" })
            queryClient.invalidateQueries("forms")
            navigate(`/form/view/${id}`)
        },
        onError: () => {
            toast({ status: "error", title: "Failed to update form!", description: "Try again later" })
        },
    })

    const saveForm = async (value: IFormInput) => {
        if (id) mutateUpdateForm({ name: value.name, fields: value.fields })
        else mutatePostForm(value)
    }

    return { render, attachment, saveForm, isSubmitting: isUpdatingForm || isSubmittingForm, init }
}

export default useCreateForm

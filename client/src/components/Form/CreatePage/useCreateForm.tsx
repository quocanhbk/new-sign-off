import { navigate } from "@reach/router"
import { getFormDetail, IFormInput, postForm, updateForm } from "api"
import { useChakraToast, useLoader } from "hooks"
import { useEffect, useState } from "react"
import { useMutation, useQuery, useQueryClient } from "react-query"
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
    const { isFetching } = useQuery(["form", id], () => getFormDetail(id!), {
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
        console.log("ISLOADING", isFetching)
        setIsLoading(isFetching)
    }, [isFetching])

    // * MUTATION: post form
    const { mutate: mutatePostForm, isLoading: isSubmittingForm } = useMutation<number, unknown, IFormInput>(
        input => postForm({ ...input, file: input.file! }),
        {
            onSuccess: id => {
                toast({ status: "success", title: "Created form successfully!" })
                queryClient.invalidateQueries("forms")
                navigate(`/form/view/${id}`)
            },
            onError: () => {
                toast({ status: "error", title: "Failed to create form!", description: "Try again later" })
            },
        }
    )

    // * MUTATION: update form
    const { mutate: mutateUpdateForm, isLoading: isUploadingForm } = useMutation<unknown, unknown, IFormInput>(
        input => updateForm(id!, { name: input.name, fields: input.fields }),
        {
            onSuccess: () => {
                toast({ status: "success", title: "Updated form successfully!" })
                queryClient.invalidateQueries("forms")
                navigate(`/form/view/${id}`)
            },
            onError: () => {
                toast({ status: "error", title: "Failed to update form!", description: "Try again later" })
            },
        }
    )
    const saveForm = async (value: IFormInput) => {
        if (id) mutateUpdateForm(value)
        else mutatePostForm(value)
    }

    return { render, attachment, saveForm, isSubmitting: isUploadingForm || isSubmittingForm, init }
}

export default useCreateForm

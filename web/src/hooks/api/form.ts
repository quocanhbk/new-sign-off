import { getFormDetail, IForm, IFormInput, postForm, patchForm, deleteForm, getForms } from "api"
import {
    QueryObserverResult,
    RefetchOptions,
    UseMutateFunction,
    useMutation,
    UseMutationOptions,
    useQuery,
    UseQueryOptions,
} from "react-query"
import { Id } from "types"

export const useGetForms = (
    options?: UseQueryOptions<
        Pick<IForm, "id" | "name" | "fileId">[],
        unknown,
        Pick<IForm, "id" | "name" | "fileId">[],
        "forms"
    >
): [
    data: Pick<IForm, "id" | "name" | "fileId">[] | undefined,
    isLoading: boolean,
    refetch: (
        options?: RefetchOptions | undefined
    ) => Promise<QueryObserverResult<Pick<IForm, "id" | "name" | "fileId">[], unknown>>
] => {
    const { data, isLoading, refetch } = useQuery("forms", getForms, options)
    return [data, isLoading, refetch]
}

export const useGetForm = (
    formId: Id,
    option?: UseQueryOptions<IForm, unknown, IForm, Id[]>
): [
    data: IForm | undefined,
    isFetching: boolean,
    refetch: (options?: RefetchOptions | undefined) => Promise<QueryObserverResult<IForm, unknown>>
] => {
    const { data, isFetching, refetch } = useQuery(["form", formId], () => getFormDetail(formId), option)
    return [data, isFetching, refetch]
}

export const usePostForm = (
    options?: UseMutationOptions<number, unknown, IFormInput, unknown>
): [mutate: UseMutateFunction<number, unknown, IFormInput, unknown>, isLoading: boolean] => {
    const { mutate, isLoading } = useMutation(postForm, options)
    return [mutate, isLoading]
}

export const useUpdateForm = (
    formId: Id,
    options?: UseMutationOptions<void, unknown, Pick<IForm, "name" | "fields">, unknown>
): [mutate: UseMutateFunction<void, unknown, Pick<IForm, "name" | "fields">, unknown>, isLoading: boolean] => {
    const updateForm = (formData: Pick<IForm, "name" | "fields">) => patchForm(formId, formData)
    const { mutate, isLoading } = useMutation(updateForm, options)
    return [mutate, isLoading]
}

export const useDeleteForm = (
    options?: UseMutationOptions<void, unknown, Id, unknown>
): [mutate: UseMutateFunction<void, unknown, Id, unknown>, isLoading: boolean] => {
    const { mutate, isLoading } = useMutation(deleteForm, options)
    return [mutate, isLoading]
}

import { getRequestDetail, IPatchRequestInput, IRequest, IRequestInput, patchRequest, postRequest } from "api"
import { UseMutateFunction, useMutation, UseMutationOptions, useQuery, UseQueryOptions } from "react-query"
import { Id } from "types"

export const useGetRequest = (
    requestId: Id,
    { sign = false }: { sign: boolean },
    options?: UseQueryOptions<IRequest, unknown, IRequest, (boolean | Id)[]>
): [data: IRequest | undefined, isLoading: boolean] => {
    const { data, isLoading } = useQuery(
        ["request", requestId, sign],
        () => getRequestDetail(requestId, { sign }),
        options
    )
    return [data, isLoading]
}

export const usePostRequest = (
    options?: UseMutationOptions<number, unknown, IRequestInput, unknown>
): [mutateFunc: UseMutateFunction<number, unknown, IRequestInput, unknown>, isLoading: boolean] => {
    const { mutate, isLoading } = useMutation(postRequest, options)
    return [mutate, isLoading]
}

export const usePatchRequest = (
    id: Id
): [mutate: UseMutateFunction<void, unknown, IPatchRequestInput, unknown>, isLoading: boolean] => {
    const { mutate, isLoading } = useMutation<void, unknown, IPatchRequestInput>(input => patchRequest(id, input))
    return [mutate, isLoading]
}

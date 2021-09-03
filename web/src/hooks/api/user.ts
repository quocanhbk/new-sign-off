import { getUsers, IUser } from "api"
import { QueryObserverResult, RefetchOptions, useQuery, UseQueryOptions } from "react-query"

export const useGetUsers = (
    options?: UseQueryOptions<IUser[], unknown, IUser[], "useres">
): [
    data: IUser[] | undefined,
    isLoading: boolean,
    refetch: (options?: RefetchOptions | undefined) => Promise<QueryObserverResult<IUser[], unknown>>
] => {
    const { data, isLoading, refetch } = useQuery("useres", getUsers, options)
    return [data, isLoading, refetch]
}

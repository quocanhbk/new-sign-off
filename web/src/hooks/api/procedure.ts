import { getProcedureDetail, IProcedure } from "api"
import { QueryObserverResult, RefetchOptions, useQuery, UseQueryOptions } from "react-query"
import { Id } from "types"

export const useGetProcedure = (
    procedureId: Id,
    options: UseQueryOptions<IProcedure, unknown, IProcedure, Id[]>
): [
    data: IProcedure | undefined,
    isLoading: boolean,
    refetch: (options?: RefetchOptions | undefined) => Promise<QueryObserverResult<IProcedure, unknown>>
] => {
    const { data, isLoading, refetch } = useQuery(
        ["procedure", procedureId],
        () => getProcedureDetail(procedureId),
        options
    )
    return [data, isLoading, refetch]
}

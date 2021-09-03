import { getPositions, IPosition } from "api"
import { useQuery, UseQueryOptions } from "react-query"

export const useGetPositions = (
    options?: UseQueryOptions<
        Pick<IPosition, "id" | "title" | "userId">[],
        unknown,
        Pick<IPosition, "id" | "title" | "userId">[],
        "positions"
    >
) => {
    const { data, isLoading, refetch } = useQuery("positions", getPositions, options)
    return [data, isLoading, refetch]
}

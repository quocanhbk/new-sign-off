import { useInfiniteQuery } from "react-query"
import useRequestQuery from "./List/useRequestQuery"
import { getRequests } from "api/request"
import { useEffect } from "react"
import { useChakraToast, useLoader } from "hooks"
// react-query DOES support scroll restoration, but not in our case, where we scroll inside a div element

const useRequests = ({ mode }: { mode: "search" | "sign" }) => {
    const RANGE = 10
    const { query, queryString, queryTags, onChangeTitleSearch, setQueryParam } = useRequestQuery()
    const { render, setIsLoading } = useLoader()
    const toast = useChakraToast()
    const getRequestsWithRange = async ({ pageParam = 0 }) => {
        let requests = await getRequests(
            queryString + `&start=${pageParam}&end=${pageParam + RANGE}&sign=${mode === "sign"}`
        )
        return requests
    }

    const { data, hasNextPage, fetchNextPage, refetch, isLoading } = useInfiniteQuery(
        "requests",
        getRequestsWithRange,
        {
            // lastPage is the data that last fetched, if it < RANGE, means that we fetched all
            // return undefined on fetched all
            getNextPageParam: (lastPage, pages) =>
                lastPage.length < RANGE ? undefined : lastPage.length * pages.length,
            onError: () => {
                toast({ status: "error", title: "Failed to get data!", description: "Please try again later" })
            },
            refetchOnWindowFocus: true,
            refetchInterval: 30000,
        }
    )
    useEffect(() => {
        setIsLoading(isLoading)
    }, [isLoading])
    useEffect(() => {
        refetch()
    }, [queryString, mode])

    return {
        query,
        queryTags,
        onChangeTitleSearch,
        setQueryParam,
        data,
        hasNextPage,
        fetchNextPage,
        render,
        isLoading,
    }
}

export default useRequests

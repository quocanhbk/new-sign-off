
import {useInfiniteQuery} from 'react-query'
import useRequestQuery from './useRequestQuery'
import {getRequests} from "api/request"
import { useEffect } from 'react'
import useNormalLoading from 'hooks/useNormalLoading'
// react-query DOES support scroll restoration, but not in our case, where we scroll inside a div element

const useRequests = (mode) => {
    const RANGE = 10
    const {query, queryString, queryTags, onChangeTitleSearch, setQuery} = useRequestQuery()
    // const {render, setNotFound, setPercent} = useCustomLoader(true, <Placeholder type="NOT_FOUND"/>)
    const getRequestsWithRange = async ({ pageParam = 0 }) => {
        let requests = await getRequests(queryString + `&start=${pageParam}&end=${pageParam + RANGE}&sign=${mode === "sign"}`)
        return requests
    }

    const {data, hasNextPage, fetchNextPage, refetch, isError} = useInfiniteQuery('getRequests', getRequestsWithRange, {
        // lastPage is the data that last fetched, if it < RANGE, means that we fetched all
        // return undefined on fetched all
        getNextPageParam: (lastPage, pages) => lastPage.length < RANGE ? undefined : lastPage.length * pages.length,
        refetchOnWindowFocus: false,

        // onError: () => setNotFound(true)
    })

    let render = useNormalLoading(false, isError)

    useEffect(() => {
        refetch()
    }, [queryString, mode])
    
    return {
        // render, 
        query, queryTags, onChangeTitleSearch, setQuery, 
        data,
        hasNextPage, fetchNextPage, render
    }
}

export default useRequests
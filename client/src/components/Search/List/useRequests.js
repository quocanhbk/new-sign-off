/* eslint-disable no-unused-vars */

import React from 'react'
import {useInfiniteQuery} from 'react-query'
import useRequestQuery from './useRequestQuery'
import {getRequests} from "api/request"
import { useEffect } from 'react'
import useCustomLoader from 'hooks/useCustomLoader'
import Placeholder from 'components/Placeholder'
// react-query DOES support scroll restoration, but not in our case, where we scroll inside a div element

const useRequests = (mode) => {
    const RANGE = 10
    const {query, queryString, queryTags, onChangeTitleSearch, setQuery} = useRequestQuery()

    const {render, reset, setNotFound, setPercent} = useCustomLoader(true, <Placeholder type="NOT_FOUND"/>)
    
    const getRequestsWithRange = async ({ pageParam = 0 }) => {
        let requests = await getRequests(queryString + `&start=${pageParam}&end=${pageParam + RANGE}&sign=${mode === "sign"}`, setPercent)
        return requests
    }

    const {data, hasNextPage, fetchNextPage, refetch, isLoading} = useInfiniteQuery('requests', getRequestsWithRange, {
        // lastPage is the data that last fetched, if it < RANGE, means that we fetched all
        // return undefined on fetched all
        getNextPageParam: (lastPage, pages) => lastPage.length < RANGE ? undefined : lastPage.length * pages.length,
        refetchOnWindowFocus: false,
        onError: () => setNotFound(true)
        // onError: () => setNotFound(true)
    })

    useEffect(() => {
        refetch()
    }, [queryString, mode])
    
    useEffect(() => {
        // if (isLoading) reset()
    }, [isLoading])

    return {
        // render, 
        query, queryTags, onChangeTitleSearch, setQuery, 
        data,
        hasNextPage, fetchNextPage, render
    }
}

export default useRequests
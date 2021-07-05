import React, { useEffect } from 'react'
import { useQuery } from "react-query"  
import {getRequestDetail} from "api/request"
import useCustomLoader from "hooks/useCustomLoader"
import Placeholder from "components/Placeholder"
const useRequest = (id, mode) => {

    const {render, setNotFound, setPercent, reset} = useCustomLoader(true, <Placeholder type="NOT_FOUND"/>, true)
    const {data, isLoading} = useQuery(["request", id], () => getRequestDetail(id, mode === "sign", setPercent), {
        onError: () => setNotFound(true),
        
    })
    useEffect(() => {
        if (isLoading) reset()
    }, [isLoading])
    return {data, render}
}

export default useRequest
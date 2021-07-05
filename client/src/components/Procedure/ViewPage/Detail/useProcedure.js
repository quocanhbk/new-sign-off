/* eslint-disable no-unused-vars */
import React, { useEffect } from 'react'
import { useMutation, useQuery, useQueryClient } from "react-query"  
import {getProcedureDetail, toggleActive} from "api/procedure"
import useCustomLoader from "hooks/useCustomLoader"
import Placeholder from "components/Placeholder"

const useProcedure = (id) => {  
    const queryClient = useQueryClient()
    const {render, setNotFound, setPercent, reset} = useCustomLoader(true, <Placeholder type="NOT_FOUND"/>, true)
    const {data, isLoading} = useQuery(["request", id], () => getProcedureDetail(id, false, setPercent), {
        onError: () => setNotFound(true),
    })
    const {mutate, } = useMutation((v) => toggleActive(id, v, setPercent),{
        onSettled: () => {
            queryClient.fetchQuery('procedures')
            queryClient.fetchQuery(["request", id])
        }
    })

    useEffect(() => {
        if (isLoading) reset()
    }, [isLoading])

    const onToggleActive = (v) => {
		// reset()
		// setProcedures({...procedure, isActive: v})
		// await toggleActive(id, {...procedure, isActive: v}, (p) => setPercent(p))
        // TO DO
        mutate(v)
    }

    return {data, render, onToggleActive}


}

export default useProcedure
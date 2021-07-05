import React, { useEffect } from 'react'
import { useQuery } from "react-query"
import {getProcedures} from "api/procedure"
import useCustomLoader from 'hooks/useCustomLoader'
import Placeholder from "components/Placeholder"

const useProcedures = () => {

    let {render, setNotFound, setPercent, reset} = useCustomLoader(true, <Placeholder type="NOT_FOUND"/>)
    let {data, isLoading} = useQuery('procedures', () => getProcedures(setPercent), {
        onError: () => setNotFound(true)
    })
    useEffect(() => {
        if (isLoading)
            reset()
    }, [isLoading])

    return {data, render}
}

export default useProcedures
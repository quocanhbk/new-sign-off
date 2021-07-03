import React from "react"
import { useQuery } from "react-query"
import {getForms} from "api/form"
import useCustomLoader from "hooks/useCustomLoader"
import Placeholder from "components/Placeholder"

const useForms = () => {
    const {render, setNotFound, setPercent} = useCustomLoader(true, <Placeholder type="NOT_FOUND"/>)
    let {data, isLoading} = useQuery('forms', () => getForms(p => setPercent(p)), {
        onError: () => setNotFound(true)
    })
    return {data, render, isLoading}
}

export default useForms
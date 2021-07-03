import React, { useEffect } from "react"
import useCustomLoader from "hooks/useCustomLoader"
import Placeholder from "components/Placeholder"
import {useQuery} from 'react-query'
import {getFormDetail} from 'api/form'
const useForm = (id) => {
    console.log(id)
    const {render, setNotFound, setPercent, reset} = useCustomLoader(true, <Placeholder type="NOT_FOUND"/>, true)
    const {data, isLoading, refetch, status} = useQuery('form_' + id, () => getFormDetail(id, p => setPercent(p)), {
        onError: () => setNotFound(true),
        refetchOnWindowFocus: false,
        enabled: false
    })
    // if a form with id is not cached, start fetching
    useEffect(() => {
        if (status === "idle") {
            reset()
            refetch()
        }
    }, [id])
    return {render, form: data, isLoading, setPercent}
}

export default useForm
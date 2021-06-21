/* eslint-disable react/prop-types */
import React, { useEffect, useState } from "react"
import Loader from "components/Loader"

const useLoading = (load = true, value = null, placeholder = null) => {
    const [loading, setLoading] = useState(load)
    const [percent, setPercent] = useState(load ? 0 : 100)
    const [notFound, setNotFound] = useState(false)

    useEffect(() => {
        if (notFound) setLoading(false)
    }, [notFound])

    useEffect(() => {
        if (percent === 100 && load) setTimeout(() => setLoading(false), 400)
    }, [percent])

    const reset = () => {
        setLoading(true)
        setPercent(0)
    }

    // const LoadingComponent = ({percent}) => {
    //     return loading ? <Loader percent={percent}/> : null
    // }

    return {
        reset, 
        setPercent, setNotFound,
        LoadingComponent: (loading) ? <Loader percent={percent}/> : (notFound ? placeholder : value)
    }
}

export default useLoading
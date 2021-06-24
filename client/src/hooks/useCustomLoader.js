/* eslint-disable react/prop-types */
import React, { useEffect, useState } from "react"
import Loader from "components/Loader"

const useCustomLoader = (load = true, placeholder = null, mask = false) => {
    const [loading, setLoading] = useState(load)
    const [percent, setPercent] = useState(load ? 0 : 100)
    const [notFound, setNotFound] = useState(false)

    useEffect(() => {
        if (notFound) setLoading(false)
    }, [notFound])

    useEffect(() => {
        if (percent === 100 && loading) setTimeout(() => setLoading(false), 400)
    }, [percent])

    const reset = () => {
        setLoading(true)
        setPercent(0)
    }
    const render = (body) => {
        return (
            !mask ? 
            (loading) ? <Loader percent={percent}/> : (notFound ? placeholder : body) : 
            <>{(loading) && <Loader percent={percent}/>}{(notFound ? placeholder : body)}</>
        )
    }
    return {
        reset, 
        setPercent, setNotFound,
        render
    }
}

export default useCustomLoader
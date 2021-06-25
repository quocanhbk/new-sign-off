/* eslint-disable react/prop-types */
import React, { useEffect, useReducer } from "react"
import Loader from "components/Loader"

const genInitState = (load) => ({
    loading: load,
    percent: load ? 0 : 100,
    notFound: false
})

const reducer = (state, action) => {
    switch(action.type) {
        case "SET":
            return {
                ...state,
                [action.field]: action.payload
            }
        case "RESET":
            return {
                loading: true,
                percent: 0,
                notFound: false
            }
        default:
            return state
    }
}

const useCustomLoader = (load = true, placeholder = null, mask = false) => {
    const [{loading, percent, notFound}, dispatch] = useReducer(reducer, genInitState(load))
    const set = (field, payload) => dispatch({type: "SET", field, payload})
    const reset = () => dispatch({type: "RESET"})
    
    useEffect(() => {
        if (notFound) set("loading", false)
    }, [notFound])

    useEffect(() => {
        if (percent === 100 && loading) setTimeout(() => set("loading", false), 400)
    }, [percent])

    const render = (body) => {
        return (
            !mask ? 
            (loading) ? <Loader percent={percent}/> : (notFound ? placeholder : body) : 
            <>{(loading) && <Loader percent={percent}/>}{(notFound ? placeholder : body)}</>
        )
    }
    return {
        reset, 
        setPercent: (p) => set("percent", p), 
        setNotFound: (p) => set("notFound", p),
        render
    }
}

export default useCustomLoader
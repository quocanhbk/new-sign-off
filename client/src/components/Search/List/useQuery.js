/* eslint-disable no-unused-vars */
import {useReducer, useCallback} from 'react'

const initState = {
    title: {value: "", text: "", hidden: true},
    priority: {value: null, text: ""},
    status: {value: null, text: ""},
    createdBy: {value: null, text: ""},
    project: {value: null, text: ""},
    type: {value: null, text: ""},
    sortBy: {value: "updated_at", text: "updated_at", hidden: true},
    sortOrder: {value: "desc", text: "desc", hidden: true},
}
const reducer = (state, action) => {
    switch (action.type) {
        case "SET":
            return {
                ...state,
                // ...state[action.field] to keep the "hidden" field stays the same
                [action.field]: {...state[action.field], value: action.value, text: action.text}
            }
        case "RESET":
            return initState
        default:
            return state
    }
}
const useQuery = () => {

    const [query, dispatch] = useReducer(reducer, initState)

    // useCallback helps this function to re-initilize only when dispatch is changed (which not).
    // so this function will only initilized once, which helps reduce unnecessary renders
    const set = useCallback((field, value, text = "") => {
        dispatch({type: "SET", field, value, text: text === "" ? value : text})
    }, [dispatch])
    const reset = () => dispatch({type: "RESET"})

    const onChangeTitleSearch = (v) => {
        set("title", v, v)
    }

    return {
        query,
        queryString: Object.entries(query).filter(([, s]) => s.value !== null).map(([key, s]) => `${key}=${s.value}`).join("&"), 
        set, 
        reset,
        onChangeTitleSearch,
        queryTags: Object.entries(query).filter(([, s]) => !s.hidden && s.value !== null).map(([key, s]) => ({
            key: key,
            text: `${s.text}`,
            onClick: () => set(key, null, "")
        }))
    }
}

export default useQuery
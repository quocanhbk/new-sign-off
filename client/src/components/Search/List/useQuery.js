import {useReducer} from 'react'

const initState = {
    title: {value: ""},
    priority: {value: null, text: ""},
    status: {value: null, text: ""},
    createdBy: {value: null, text: ""},
    project: {value: null, text: ""}
}
const reducer = (state, action) => {
    switch (action.type) {
        case "SET":
            return {
                ...state,
                [action.field]: {value: action.value, text: action.text}
            }
        case "RESET":
            return initState
        default:
            return state
    }
}
const useQuery = () => {

    const [query, dispatch] = useReducer(reducer, initState)

    const set = (field, value, text = "") => {
        dispatch({type: "SET", field, value, text: text === "" ? value : text})
    }

    const reset = () => dispatch({type: "RESET"})

    const onChangeTitleSearch = (v) => {
        set("title", v, v)
    }

    return {
        queryString: Object.entries(query).filter(([, s]) => s.value !== null).map(([key, s]) => `${key}=${s.value}`).join("&"), 
        set, 
        reset,
        onChangeTitleSearch,
        queryTags: Object.entries(query).filter(([key, s]) => key !== "title" && s.value !== null).map(([key, s]) => ({
            key: key,
            text: `${s.text}`,
            onClick: () => set(key, null, "")
        }))
    }
}

export default useQuery
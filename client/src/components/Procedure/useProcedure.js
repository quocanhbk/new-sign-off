import { useEffect, useReducer } from 'react'
import {v4} from 'uuid'
import { getProcedureDetail, postProcedure, updateProcedure } from 'api/procedure'
import {getFormDetail} from 'api/form'
import {navigate} from '@reach/router'
import useLoading from 'hooks/useLoading'

const initState = {
    title: "",
    description:"",
    advisors: [],
    approvers: [],
    observators: [],
    checklist: [],
    tags: [],
    isActive: true
}

const reducer = (state, action) => {
    switch (action.type) {
        case 'SET':
            return {
                ...state,
                [action.payload.field]: action.payload.value
            }
        case 'INIT':
            return action.payload
        default:
            return state
    }
}
const initError = {
    title: ""
}
const errorReducer = (state, action) => {
    switch(action.type) {
        case 'SET':
            return {
                ...state,
                [action.payload.field]: action.payload.value
            }
    }
}
const useProcedure = (id) => {
    const [{title, description, advisors, approvers, observators, tags, isActive, checklist}, dispatch] = useReducer(reducer, initState)
    const [error, dispatchError] = useReducer(errorReducer, initError)
    const {loading, percent, setPercent, setLoading, reset} = useLoading(!!id)

    useEffect(() => {
        if (id) {
            const fetchDetail = async () => {
                const procedure = await getProcedureDetail(id, (v) => setPercent(v)).catch(() => {setLoading(false);return;})
                setPercent(100)
                if (procedure) {
                    dispatch({type: "INIT", payload: procedure})
                }
            }
            fetchDetail()
        }
    }, [id])


    const setError = (field, value) => dispatchError({type: "SET", payload: {field, value}})
    const set = (field, value) => {
        dispatch({type: "SET", payload: {field, value}})
        if (error[field] !== "") setError(field, "")
    }

    const isSubmittable = () => {
        let submittable = true
        if (title === "") {
            setError("title", "Document title is required")
            submittable = false
        }
        if (
            advisors.some(v => approvers.concat(observators).includes(v)) ||
            approvers.some(v => advisors.concat(observators).includes(v)) ||
            observators.some(v => approvers.concat(advisors).includes(v))) {
                submittable = false
        }
        return submittable
    }

    const submitProcedure = async () => {
        reset()
        if (id) await postProcedure({title, description, advisors, approvers, observators, tags, isActive, checklist}, (p) => setPercent(p))
        else await updateProcedure(id, {title, description, advisors, approvers, observators, tags, isActive, checklist}, (p) => setPercent(p))
        navigate('/procedure')        
    }

    const addCheckItem = () => {
        set("checklist", [...checklist, {
            id: v4().slice(0, 8),
            name: "",
            defaultForms: [],
            adding: false
        }])
    }
    const removeCheckItem = (checkItemId) => {
        set("checklist", checklist.filter(item => item.id !== checkItemId))
    }
    const setCheckItemName = (checkItemId, name) => {
        let checkitemIndex = checklist.map(_ => _.id).indexOf(checkItemId)
		set("checklist", [
			...checklist.slice(0, checkitemIndex),
			{...checklist[checkitemIndex], name},
			...checklist.slice(checkitemIndex + 1, checklist.length)
		])
    }
    const toggleAdding = (checkItemId) => {
		let checkitemIndex = checklist.map(_ => _.id).indexOf(checkItemId)
		set("checklist", [
			...checklist.slice(0, checkitemIndex),
			{...checklist[checkitemIndex], adding: !checklist[checkitemIndex].adding},
			...checklist.slice(checkitemIndex + 1, checklist.length)
		])
	}

    const addForm = async (checkItemId, formId) => {
        let checkItemIndex = checklist.map(_ => _.id).indexOf(checkItemId)
		let checkItemObj = checklist[checkItemIndex]
        let formDetail = await getFormDetail(formId, () => {}, false)

		set("checklist", [
			...checklist.slice(0, checkItemIndex),
			{...checkItemObj, defaultForms: [...checkItemObj.defaultForms, formDetail], adding: false},
			...checklist.slice(checkItemIndex + 1, checklist.length)
		])
    }

    const removeForm = (checkItemId, formId) => {
        let checkItemIndex = checklist.map(_ => _.id).indexOf(checkItemId)
        let checkItemObj = checklist[checkItemIndex]
        set("checklist", [
            ...checklist.slice(0, checkItemIndex),
            {...checkItemObj, defaultForms: checkItemObj.defaultForms.filter(form => form.id !== formId)},
            ...checklist.slice(checkItemIndex + 1, checklist.length)
        ])
    }

    const checklistUtil = {
        addCheckItem, removeCheckItem, setCheckItemName,
        toggleAdding, addForm, removeForm
    }

    return {
        title, description, advisors, approvers, observators, checklist, checklistUtil, set,
        error, isSubmittable, submitProcedure, percent, loading
    }
}

export default useProcedure
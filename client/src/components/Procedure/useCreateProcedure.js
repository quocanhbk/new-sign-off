import React from 'react'
import { useEffect, useReducer } from 'react'
import {v4} from 'uuid'
import { getProcedureDetail, postProcedure, updateProcedure } from 'api/procedure'
import {getFormDetail} from 'api/form'
import {navigate} from '@reach/router'
import useCustomLoader from 'hooks/useCustomLoader'
import Placeholder from 'components/Placeholder'

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
    const {reset, render, setNotFound, setPercent} = useCustomLoader(!!id, <Placeholder type="NOT_FOUND"/>)

    useEffect(() => {
        if (id) {
            const fetchDetail = async () => {
                getProcedureDetail(id, false, (v) => setPercent(v))
                .then(procedure => {
                    setPercent(100)
                    dispatch({type: "INIT", payload: procedure})
                })
                .catch(() => setNotFound(false))
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
        if (id) {
            let newId = await updateProcedure(id, {title, description, advisors, approvers, observators, tags, isActive, checklist}, (p) => setPercent(p))
            setTimeout(() => navigate('/procedure/view/' + newId), 250)
        }
        else {
            let procedureId = await postProcedure({title, description, advisors, approvers, observators, tags, isActive, checklist}, (p) => setPercent(p))
            setTimeout(() => navigate('/procedure/view/' + procedureId), 250)      
        }  
    }

    const addCheckItem = () => {
        set("checklist", [...checklist, {
            id: v4().slice(0, 8),
            name: "",
            defaultForms: [],
            adding: false,
            loading: false
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
    const toggleLoading = (checkItemId) => {
        let checkitemIndex = checklist.map(_ => _.id).indexOf(checkItemId)
		set("checklist", [
			...checklist.slice(0, checkitemIndex),
			{...checklist[checkitemIndex], loading: !checklist[checkitemIndex].loading},
			...checklist.slice(checkitemIndex + 1, checklist.length)
		])
    }
    const addForm = async (checkItemId, formId, callback = (v) => {v}) => {
        toggleLoading(checkItemId)
        let checkItemIndex = checklist.map(_ => _.id).indexOf(checkItemId)
		let checkItemObj = checklist[checkItemIndex]
        let formDetail = await getFormDetail(formId, () => {}, false)
        
        callback(100)
        setTimeout(() => 
            set("checklist", [
                ...checklist.slice(0, checkItemIndex),
                {...checkItemObj, defaultForms: [formDetail, ...checkItemObj.defaultForms], adding: false, loading: false},
                ...checklist.slice(checkItemIndex + 1, checklist.length)
            ]), 250)
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
        toggleAdding, addForm, removeForm, toggleLoading
    }

    return {
        title, description, advisors, approvers, observators, checklist, checklistUtil, set,
        error, isSubmittable, submitProcedure, render
    }
}

export default useProcedure
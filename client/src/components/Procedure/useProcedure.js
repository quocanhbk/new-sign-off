/* eslint-disable no-unused-vars */
import { useReducer } from 'react'
import {v4} from 'uuid'
import { postProcedure } from '../../api/procedure'
import {getFormDetail} from '../../api/form'
const initState = {
    title: "",
    description:"",
    advisors: [],
    approvers: [],
    observators: [],
    checkList: []
}

const reducer = (state, action) => {
    switch (action.type) {
        case 'SET':
            return {
                ...state,
                [action.payload.field]: action.payload.value
            }
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
const useProcedure = () => {
    const [{title, description, advisors, approvers, observators, checkList}, dispatch] = useReducer(reducer, initState)
    const [error, dispatchError] = useReducer(errorReducer, initError)
    
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

    const submitProcedure = () => {
        // postProcedure(title, description, advisors, approvers, observators)
        console.log(checkList)
    }

    const addCheckItem = () => {
        set("checkList", [...checkList, {
            id: v4().slice(0, 8),
            name: "",
            defaultForms: [],
            adding: false
        }])
    }
    const removeCheckItem = (checkItemId) => {
        set("checkList", checkList.filter(item => item.id !== checkItemId))
    }
    const setCheckItemName = (checkItemId, name) => {
        let checkitemIndex = checkList.map(_ => _.id).indexOf(checkItemId)
		set("checkList", [
			...checkList.slice(0, checkitemIndex),
			{...checkList[checkitemIndex], name},
			...checkList.slice(checkitemIndex + 1, checkList.length)
		])
    }
    const toggleAdding = (checkItemId) => {
		let checkitemIndex = checkList.map(_ => _.id).indexOf(checkItemId)
		set("checkList", [
			...checkList.slice(0, checkitemIndex),
			{...checkList[checkitemIndex], adding: !checkList[checkitemIndex].adding},
			...checkList.slice(checkitemIndex + 1, checkList.length)
		])
	}

    const addForm = async (checkItemId, formId) => {
        let checkItemIndex = checkList.map(_ => _.id).indexOf(checkItemId)
		let checkItemObj = checkList[checkItemIndex]
        let formDetail = await getFormDetail(formId)

		set("checkList", [
			...checkList.slice(0, checkItemIndex),
			{...checkItemObj, defaultForms: [...checkItemObj.defaultForms, formDetail], adding: false},
			...checkList.slice(checkItemIndex + 1, checkList.length)
		])
    }

    const removeForm = (checkItemId, formId) => {
        let checkItemIndex = checkList.map(_ => _.id).indexOf(checkItemId)
        let checkItemObj = checkList[checkItemIndex]
        set("checkList", [
            ...checkList.slice(0, checkItemIndex),
            {...checkItemObj, defaultForms: checkItemObj.defaultForms.filter(form => form.id !== formId)},
            ...checkList.slice(checkItemIndex + 1, checkList.length)
        ])
    }

    const checkListUtil = {
        addCheckItem, removeCheckItem, setCheckItemName,
        toggleAdding, addForm, removeForm
    }

    return {
        title, description, advisors, approvers, observators, checkList, checkListUtil, set,
        error, isSubmittable, submitProcedure
    }
}

export default useProcedure
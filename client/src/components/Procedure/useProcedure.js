import { useState } from 'react'
import {v4} from 'uuid'
const useProcedure = () => {
    const [title, setTitle] = useState("")
    const [description, setDescription] = useState("")
    const [advisors, setAdvisors] = useState([])
    const [approvers, setApprovers] = useState([])
    const [observators, setObservators] = useState([])

    // Check List
    const [checkList, setCheckList] = useState([])

    const addCheckItem = () => {
        setCheckList([...checkList, {
            id: v4().slice(0, 8),
            name: "",
            defaultForms: [],
            adding: false
        }])
    }
    const removeCheckItem = (checkItemId) => {
        setCheckList(checkList.filter(item => item.id !== checkItemId))
    }
    const setCheckItemName = (checkItemId, name) => {
        let checkitemIndex = checkList.map(_ => _.id).indexOf(checkItemId)
		setCheckList([
			...checkList.slice(0, checkitemIndex),
			{...checkList[checkitemIndex], name},
			...checkList.slice(checkitemIndex + 1, checkList.length)
		])
    }
    const toggleAdding = (checkItemId) => {
		let checkitemIndex = checkList.map(_ => _.id).indexOf(checkItemId)
		setCheckList([
			...checkList.slice(0, checkitemIndex),
			{...checkList[checkitemIndex], adding: !checkList[checkitemIndex].adding},
			...checkList.slice(checkitemIndex + 1, checkList.length)
		])
	}

    const addForm = (checkItemId, form) => {
        let checkItemIndex = checkList.map(_ => _.id).indexOf(checkItemId)
		let checkItemObj = checkList[checkItemIndex]
		setCheckList([
			...checkList.slice(0, checkItemIndex),
			{...checkItemObj, defaultForms: [...checkItemObj.defaultForms, form], adding: false},
			...checkList.slice(checkItemIndex + 1, checkList.length)
		])
    }

    const removeForm = (checkItemId, formId) => {

        let checkItemIndex = checkList.map(_ => _.id).indexOf(checkItemId)
        let checkItemObj = checkList[checkItemIndex]
        setCheckList([
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
        title, setTitle, description, setDescription,
        advisors, setAdvisors, approvers, setApprovers, observators, setObservators,
        //check list
        checkList, checkListUtil
    }
}

export default useProcedure
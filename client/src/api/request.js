/* eslint-disable no-unused-vars */
import axios from 'axios'
import baseURL from "./baseURL";
import getToken from './getToken';

export const getRequests = async () => {
	const token = await getToken();
	const config = {
		baseURL,
		headers: {
			Authorization: `Bearer ${token.accessToken}`
		}
	}
	let res = await axios.get('/api/v1/requests', token)
	console.log(res)
}
export const getRequestDetail = async (id) => {
	let {data} = await axios.get('/api/v1/requests/' + id, {baseURL})
	return data.map(d => ({
		id: d.approval_request_id,
		title: d.title,
		author: d.author,
		createdAt: d.createdAt,
		deadline: d.deadline,
		description: d.description,
		priority: d.priority,
		relatedProjects: d.related_projects,
		status: d.status,
		type: d.type
	}))
}
export const postRequest = async (input, callback = (v) => {v}) => {
	const {
		title, 
		description, 
		priority, 
		type, 
		deadline,
		relatedProjects, 
		advisors, 
		approvers, 
		observators
	} = input

	let sendData = {
		title, 
		description, 
		priority,
		type,
		deadline: (new Date(deadline)).toLocaleDateString('en-CA'),
		relatedProjects,
		advisors,
		approvers,
		observators
	}

	let {data: {approval_request_id: id}} = await axios.post('/api/v1/requests', sendData, {baseURL})
	callback(100)
	console.log(id)
	return id
}
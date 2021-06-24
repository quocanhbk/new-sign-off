/* eslint-disable no-unused-vars */
import { navigate } from '@reach/router'
import {createStore, action, thunk} from 'easy-peasy'
import {getUsersApi} from 'api/user'
import { getForms } from './api/form'

const store = createStore({
    theme: localStorage.getItem('ttgTheme') ? localStorage.getItem('ttgTheme') === "true" : true,
    setTheme: action((state) => {
        state.theme = !state.theme
        localStorage.setItem('ttgTheme', state.theme)
    }),

    path: "/" + location.pathname.split("/")[1],
    setPath: action((state, payload) => {
        state.path = "/" + payload.split("/")[1]
        console.log("/" + payload.split("/")[1])
        navigate(payload)
    }),

    users: [],
    setUsers: action((state, payload) => {
        state.users = payload
    }),
    getUsers: thunk(async (actions, payload) => {
        const data = await getUsersApi()
        actions.setUsers(data.map(d => ({
            id: d.user_id,
            name: d.last_name + " " + d.middle_name + " " + d.first_name,
            email: d.email
        })))
    }),

    forms:[],
    setForms: action((state, payload) => {
        state.forms = payload
    }),
    getForms: thunk(async (actions, payload) => {
        const data = await getForms()
        actions.setForms(data)
    })
})  

export default store
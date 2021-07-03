import axios from 'axios'
import baseURL from './baseURL'
import getConfig from './getConfig'

export const getUsersApi = async () => {
    const config = await getConfig()
    const {data} = await axios.get('/api/v1/users', config)
    return data
}
export const getAvatar = (email, resolution = "64x64") => {
    return `${baseURL}/api/v1/avatar/${email}/${resolution}`
}
export const getAsyncAvatar = async (email, resolution = "64x64") => {
    try {
        let res = await axios.get(`/api/v1/avatar/${email}/${resolution}`, {baseURL})
        if (res.status === 200)
            return `${baseURL}/api/v1/avatar/${email}/${resolution}`
        else return "/avatar.png"
    } catch (err) {
        return "/avatar.png"
    }
}

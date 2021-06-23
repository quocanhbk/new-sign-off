import axios from 'axios'
import getConfig from './getConfig'
export const getUsersApi = async () => {
    const config = await getConfig()
    const {data} = await axios.get('/api/v1/users', config)
    console.log("User", data)
    return data
}
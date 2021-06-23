import axios from 'axios'
import baseURL from './baseURL'
const getAvatar = async (email) => {
    let avt = await axios('/api/v1/avatar/' + email + "/96x96", {baseURL})
    console.log(avt)
    return avt.data
}

export default getAvatar
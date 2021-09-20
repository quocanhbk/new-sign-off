import axios from "axios"
import getConfig from "./getConfig"

type IPath = string | number
class Fetcher {
    private apiBaseUrl: string

    constructor(apiBaseUrl: string) {
        this.apiBaseUrl = apiBaseUrl
    }

    async GET(path: IPath = "") {
        const config = await getConfig()
        return await axios.get(`${this.apiBaseUrl}${path}`, config)
    }
    async POST(path: IPath = "", data: any) {
        const config = await getConfig()
        return await axios.post(`${this.apiBaseUrl}${path}`, data, config)
    }
    async PATCH(path: IPath = "", data: any) {
        const config = await getConfig()
        return await axios.patch(`${this.apiBaseUrl}${path}`, data, config)
    }
    async PUT(path: IPath = "", data: any) {
        const config = await getConfig()
        return await axios.put(`${this.apiBaseUrl}${path}`, data, config)
    }
    async DELETE(path: IPath = "") {
        const config = await getConfig()
        return await axios.delete(`${this.apiBaseUrl}${path}`, config)
    }
}
export default Fetcher

import axios from "axios"
import baseURL from "./baseURL"
import getConfig from "./getConfig"
import toProper from "utils/toProper"
import { CallbackFunction, Id } from "types"

export interface IUser {
    id: Id
    name: string
    email: string
}

export const getUsers = async (callback: CallbackFunction = () => {}): Promise<IUser[]> => {
    const config = await getConfig()
    const { data } = await axios.get("/api/v1/users", config)
    callback(100)
    return data.map(user => ({
        id: user.user_id,
        name: toProper(user.fullname),
        email: user.email,
    }))
}
export const getAvatar = (email: string, { resolution }: { resolution: string } = { resolution: "64x64" }): string => {
    return `${baseURL}/api/v1/avatar/${email}/${resolution}`
}
export const getAsyncAvatar = async (
    email: string,
    { resolution }: { resolution: string } = { resolution: "64x64" },
    callback: CallbackFunction = () => {}
): Promise<string> => {
    try {
        let res = await axios.get(`/api/v1/avatar/${email}/${resolution}`, {
            baseURL,
        })
        callback(100)
        if (res.status === 200) return `${baseURL}/api/v1/avatar/${email}/${resolution}`
        else return "/avatar.png"
    } catch (err) {
        callback(100)
        return "/avatar.png"
    }
}

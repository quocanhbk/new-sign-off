import baseURL from "./baseURL"
import toProper from "utils/toProper"
import { Id } from "types"
import Fetcher from "./fetcher"

const fetcher = new Fetcher("/api/v1/users/")
export interface IUser {
    id: Id
    name: string
    email: string
}

export const getUsers = async (): Promise<IUser[]> => {
    const { data } = await fetcher.GET()
    return data.map(user => ({
        id: user.user_id,
        name: toProper(user.fullname),
        email: user.email,
    }))
}
export const getAvatar = (email: string, { resolution }: { resolution: string } = { resolution: "64x64" }): string => {
    return `${baseURL}/api/v1/avatar/${email}/${resolution}`
}
// export const getAsyncAvatar = async (
//     email: string,
//     { resolution }: { resolution: string } = { resolution: "64x64" }
// ): Promise<string> => {
//     try {
//         let res = await axios.get(`/api/v1/avatar/${email}/${resolution}`, {
//             baseURL,
//         })
//         if (res.status === 200) return `${baseURL}/api/v1/avatar/${email}/${resolution}`
//         else return "/avatar.png"
//     } catch (err) {
//         return "/avatar.png"
//     }
// }

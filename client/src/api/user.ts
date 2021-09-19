import baseURL from "./baseURL"
import toProper from "utils/toProper"
import { Id } from "types"
import Fetcher from "./fetcher"

const fetcher = new Fetcher("/api/v1/users/")

export type IRole =
    | "canActivateProcedure"
    | "canCancelRequest"
    | "canCreateProcedure"
    | "canDeleteProcedure"
    | "canViewAllProcedure"
    | "canViewAllRequest"
export interface IUser {
    id: Id
    name: string
    email: string
    status: string
    roles: Record<IRole, boolean> & {
        name: string
    }
}

export const getUsers = async (): Promise<Pick<IUser, "id" | "name" | "email">[]> => {
    const { data } = await fetcher.GET()
    return data.map(user => ({
        id: user.user_id,
        name: toProper(user.fullname),
        email: user.email,
    }))
}

export const getUser = async (userId: Id): Promise<IUser> => {
    const { data: user } = await fetcher.GET(userId)
    console.log("USER", user)
    return {
        id: user.user_id,
        name: user.fullname,
        email: user.email,
        status: user.status,
        roles: {
            name: user.roles[0].name,
            canActivateProcedure: user.roles[0].can_activate_procedure,
            canCreateProcedure: user.roles[0].can_create_procedure,
            canDeleteProcedure: user.roles[0].can_delete_procedure,
            canViewAllProcedure: user.roles[0].can_view_all_procedure,
            canViewAllRequest: user.roles[0].can_view_all_request,
            canCancelRequest: user.roles[0].can_cancel_request,
        },
    }
}

export const getAvatar = (email: string, { resolution }: { resolution: string } = { resolution: "64x64" }): string => {
    return `${baseURL}/api/v1/avatar/${email}/${resolution}`
}

import axios from "axios"
import getConfig from "./getConfig"

export interface IPosition {
    id: number
    title: string
    userId: string
    user: {
        id: string
        email: string
        name: string
    }
}

export const getPositions = async (): Promise<Pick<IPosition, "id" | "title" | "userId">[]> => {
    const config = await getConfig()
    let { data } = await axios.get("/api/v1/job-positions/", config)
    return data.map(d => ({
        id: d.job_position_id,
        title: d.title,
        userId: d.user_id,
    }))
}

export const getPosition = async (id): Promise<IPosition> => {
    const config = await getConfig()
    let { data } = await axios.get(`/api/v1/job-positions/${id}`, config)
    return data.map(d => ({
        id: d.job_position_id,
        title: d.title,
        userId: d.user.user_id,
        user: {
            id: d.user.user_id,
            email: d.user.email,
            name: d.user.fullname,
        },
    }))
}

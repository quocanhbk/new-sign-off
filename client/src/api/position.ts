import Fetcher from "./fetcher"

const fetcher = new Fetcher("/api/v1/job-positions/")
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
    const { data } = await fetcher.GET()
    return data.map(d => ({
        id: d.job_position_id,
        title: d.title,
        userId: d.user_id,
    }))
}

export const getPosition = async (id): Promise<IPosition> => {
    const { data } = await fetcher.GET(id)
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

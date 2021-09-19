import { Id } from "types"
import Fetcher from "./fetcher"

const fetcher = new Fetcher("/api/v1/departments/")

export interface IDepartment {
    id: Id
    name: string
}

export const getDepartments = async (): Promise<IDepartment[]> => {
    const { data } = await fetcher.GET()
    return data.map(d => ({ id: d.department_id, name: d.name }))
}

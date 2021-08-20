import { createContext, useContext } from "react"
import { Id, ViewMode } from "types"
import useRequest from "./useRequest"
export const RequestContext = createContext<ReturnType<typeof useRequest> | null>(null)

interface RequestProvider {
    id: Id
    mode: ViewMode
    children: JSX.Element | JSX.Element[]
}

const RequestProvider = ({ children, id, mode }) => {
    return <RequestContext.Provider value={useRequest(id, mode)}>{children}</RequestContext.Provider>
}

export const useRequestContext = () => {
    const ctx = useContext(RequestContext) as ReturnType<typeof useRequest>
    return ctx
}

export default RequestProvider

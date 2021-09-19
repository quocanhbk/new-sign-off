import { useMsal } from "@azure/msal-react"
import { getUser } from "api"
import { useState } from "react"
import { useQuery } from "react-query"

export const useUserRoles = () => {
    const [defaultRoles, setDefaultRoles] = useState({
        canActivateProcedure: false,
        canCreateProcedure: false,
        canDeleteProcedure: false,
        canViewAllProcedure: false,
        canViewAllRequest: false,
        canCancelRequest: false,
    })
    const { accounts } = useMsal()
    useQuery("user", () => getUser(accounts[0].username), {
        cacheTime: 1000 * 60 * 60, // 60 minutes
        onSuccess: data => {
            setDefaultRoles(data.roles)
        },
    })
    return defaultRoles
}

export default useUserRoles

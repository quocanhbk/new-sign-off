import { useEffect, useState } from "react"
import { useQuery } from "react-query"
import { getProcedures } from "api/procedure"
import { useLoader } from "hooks"
import { getUsers } from "api"
import { useLocation } from "@reach/router"

const useProcedures = () => {
    let { render, setNotFound, setIsLoading } = useLoader()
    let { data, isLoading } = useQuery("procedures", getProcedures, {
        onError: () => setNotFound(true),
    })
    useEffect(() => {
        setIsLoading(isLoading)
    }, [isLoading, setIsLoading])
    const { data: users } = useQuery("users", () => getUsers())

    const [searchText, setSearchText] = useState("")
    const location = useLocation().pathname.split("/")

    return { data, render, users, searchText, setSearchText, location }
}

export default useProcedures

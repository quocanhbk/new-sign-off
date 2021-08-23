import { useQuery } from "react-query"
import { getForms } from "api/form"
import { useEffect, useState } from "react"
import { useLoader } from "hooks"

const useForms = () => {
    const { render, setNotFound, setIsLoading } = useLoader()
    let { data, isLoading } = useQuery("forms", getForms, {
        onError: () => setNotFound(true),
    })
    useEffect(() => {
        setIsLoading(isLoading)
    }, [isLoading, setIsLoading])
    const [searchText, setSearchText] = useState("")
    // const location = useLocation().pathname.split("/")

    const calculateFormCount = () => {
        if (isLoading || !data) return "..."
        else return data.filter(form => form.name.toLowerCase().includes(searchText.toLowerCase())).length
    }

    return {
        data: data?.filter(form => form.name.toLowerCase().includes(searchText.toLowerCase())),
        count: calculateFormCount(),
        render,
        searchText,
        setSearchText,
    }
}

export default useForms

import { useState } from "react"
// https://github.com/jamiebuilds/unstated-next
import { createContainer } from "unstated-next"

const useTheme = () => {
    const [isDark, setIsDark] = useState(localStorage.getItem('ttgTheme') === "true")
    const toggleTheme = () => {
        setIsDark(!isDark)
        localStorage.setItem('ttgTheme', !isDark)
    }

    return {isDark, toggleTheme}
}
const useSearch = () => {
    const [search, setSearch] = useState("")
    return {search, setSearch}
}
const useFilter = () => {
    const [filter, setFilter] = useState({
        assignee: null,
        progress: null,
        dueDate: null,
        category: []
    })
    const addFilter = (key, value) => {
        if (key === "category") {
            if (!filter.category.includes(value)) {
                const newCategory = [...filter.category, value]
                setFilter({...filter, [key]: newCategory})
                return
            }
            return
        }
        setFilter({...filter, [key]: value})
    }
    const removeFilter = (key) => {
        if (key === "category") {
            setFilter({...filter, [key]: []})
            return
        }
        setFilter({...filter, [key]: null})
    }

    return {filter, addFilter, removeFilter}
}
const useContext = () => {
    let themeContext = useTheme()
    let searchContext = useSearch()
    let filterContext = useFilter()
    return {themeContext, searchContext, filterContext}
}

const Context = createContainer(useContext)

export default Context
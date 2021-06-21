import { useEffect, useState } from "react"

const useLoading = (load = true) => {
    const [loading, setLoading] = useState(load)
    const [percent, setPercent] = useState(load ? 0 : 100)

    useEffect(() => {
        if (percent === 100 && load) setTimeout(() => setLoading(false), 500)
    }, [percent])

    const reset = () => {
        setLoading(true)
        setPercent(0)
    }

    return {loading, percent, setPercent, reset, setLoading}
}

export default useLoading
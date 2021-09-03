import { useState } from "react"
import { Loader, Placeholder } from "components/Base"

export const useLoader = () => {
    const [isLoading, setIsLoading] = useState(false)
    const [notFound, setNotFound] = useState(false)
    const render = (body: JSX.Element | JSX.Element[] | null) => {
        return !notFound ? (
            <>
                <Loader isLoading={isLoading} />
                {body}
            </>
        ) : (
            <Placeholder type="NOT_FOUND" />
        )
    }

    return { render, setIsLoading, setNotFound }
}

export default useLoader

/* eslint-disable react/prop-types */
import { useEffect } from "react"
import Loader from "components/Loader"
import useFormCore from "./useFormCore"

interface InitStateProps {
    loading: boolean
    percent: number
    notFound: boolean
}
const genInitState = (load: boolean): InitStateProps => ({
    loading: load,
    percent: load ? 0 : 100,
    notFound: false,
})
const useCustomLoader = (load: boolean = true, placeholder: JSX.Element | null = null, mask: boolean = false) => {
    // const [{ loading, percent, notFound }, dispatch] = useReducer(reducer, genInitState(load))
    // const set = (field, payload) => dispatch({ type: "SET", field, payload })
    const {
        setValue,
        values: { loading, notFound, percent },
        initForm,
    } = useFormCore<InitStateProps>(genInitState(load))

    useEffect(() => {
        if (notFound) setValue("loading", false)
    }, [notFound])

    useEffect(() => {
        let timeout: NodeJS.Timeout | null = null
        if (percent === 100 && loading) {
            timeout = setTimeout(() => setValue("loading", false), 400)
        }
        return () => {
            if (timeout) clearTimeout(timeout)
        }
    }, [percent])

    const reset = () => initForm({ loading: true, percent: 0, notFound: false })
    const setPercent = (p: number) => setValue("percent", p)
    const setNotFound = (b: boolean) => setValue("notFound", b)
    const render = (body: JSX.Element | null | JSX.Element[] | undefined) => {
        return !mask ? (
            loading ? (
                <Loader percent={percent} />
            ) : notFound ? (
                placeholder
            ) : (
                body
            )
        ) : (
            <>
                {loading && <Loader percent={percent} />}
                {notFound ? placeholder : body}
            </>
        )
    }
    return { reset, setPercent, setNotFound, render }
}

export default useCustomLoader

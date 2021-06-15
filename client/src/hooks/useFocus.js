import { useEffect, useRef } from "react"

const useFocus = () => {
    let ref = useRef()
    
    useEffect(() => {
        ref.current.focus()
    }, [])

    return ref
}

export default useFocus
import { RefObject, useEffect } from "react"

const useFocus = <E extends RefObject<HTMLElement>>({ ref }: { ref: E }) => {
    useEffect(() => {
        if (ref.current) ref.current.focus()
    }, [])
}

export default useFocus

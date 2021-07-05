import { useRef } from "react";

const isBrowser = typeof window !== undefined

// we track scroll on Y
const getScrollPosition = (element) => {
    if (!isBrowser) return 0;

    const target = element.current
    const position = target.getBoundingClientRect()

    return position.top
}

const useScrollPosition = (element) => {
    const position = useRef(getScrollPosition(element))
    
}

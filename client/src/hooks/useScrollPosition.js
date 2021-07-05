import { useEffect, useState } from "react";


const useScrollPosition = (element) => {
    const [scroll, setScroll] = useState(0)
    useEffect(() => {
        const updateScroll = () => {
            setScroll(element.scrollTop)
        }
        element.addEventListener("scroll", updateScroll)

        return (() => {
            element.removeEventListener("scroll", updateScroll)
        })
    })
    return scroll
}

export default useScrollPosition

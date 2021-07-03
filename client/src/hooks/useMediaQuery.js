import { useState, useEffect } from "react"

const useMediaQuery = () => {
    
    const [width, setWidth] = useState(window.innerWidth)

    useEffect(() => {
        const updateWidth = () => {
            setWidth(window.innerWidth)
        }
        window.addEventListener('resize', updateWidth)
        return (() => {
            window.removeEventListener('resize', updateWidth)
        })
    })
    return width < 720 ? "PHONE" : "PC"

}
export default useMediaQuery
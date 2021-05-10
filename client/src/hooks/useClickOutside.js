import {useEffect, useRef} from 'react'

const useClickOutside = (func = () => console.log("Clicked outside")) => {
    let r = useRef()
    useEffect(() => {
        const clickedOutside = (e) => {
            if (r.current && !r.current.contains(e.target))
                func()
        }

        document.addEventListener("mousedown", clickedOutside)
      
        return (() => {
            document.removeEventListener("mousedown", clickedOutside)
        })
    })
    return r
}

export default useClickOutside
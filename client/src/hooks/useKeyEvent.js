  import {useEffect} from 'react'

const useKeyEvent = (key = "Escape", func = () => console.log("Key pressed...!")) => {
    useEffect(() => {
        let keydownEvent = document.addEventListener("keydown", (e) => {
            if (e.key === key) {
                func()
            }
        })

        return(() => {
            document.removeEventListener("keydown", keydownEvent)
        })
    }, [func, key])
}

export default useKeyEvent
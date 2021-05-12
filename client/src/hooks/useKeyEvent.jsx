  import {useEffect} from 'react'

const useKeyEvent = (key = "Escape", func = () => console.log("Key pressed...!")) => {
    useEffect(() => {
        document.addEventListener("keydown", (e) => {
            if (e.key === key) {
                func()
            }
        })

        return(() => {
            document.removeEventListener("keydown", (e) => {
                if (e.key === key) {
                    func()
                }
            })
        })
    }, [func, key])
}

export default useKeyEvent
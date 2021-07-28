import { useRef } from "react"
import { usePopper } from "react-popper"

const useTooltip = () => {
    const popperRef = useRef()
    const elementRef = useRef()
    const { styles, attributes } = usePopper(
        elementRef.current,
        popperRef.current,
        {
            modifiers: [
                {
                    name: "offset",
                    options: {
                        offset: [0, 10],
                    },
                },
            ],
            placement: "bottom",
        }
    )

    return { popperRef, elementRef, styles, attributes }
}

export default useTooltip

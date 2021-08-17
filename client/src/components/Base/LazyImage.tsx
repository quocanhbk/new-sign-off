import { Avatar, AvatarProps } from "@chakra-ui/react"
import { useState, useEffect, useRef } from "react"

interface LazyImageProps {
    src: string
    size?: AvatarProps["size"]
}

const LazyImage = ({ size = "2xs", src }: LazyImageProps) => {
    const [shouldLoad, setShouldLoad] = useState(false)
    const placeholderRef = useRef<HTMLDivElement>(null)
    useEffect(() => {
        if (!shouldLoad && placeholderRef.current) {
            const observer = new IntersectionObserver(([{ intersectionRatio }]) => {
                if (intersectionRatio > 0) {
                    setShouldLoad(true)
                }
            })
            observer.observe(placeholderRef.current)
            return () => observer.disconnect()
        }
    }, [shouldLoad, placeholderRef])

    return shouldLoad ? <Avatar src={src} size={size} /> : <div className="img-placeholder" ref={placeholderRef} />
}

export default LazyImage

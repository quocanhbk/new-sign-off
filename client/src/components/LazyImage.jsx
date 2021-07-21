/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */

import React, { useState, useEffect, useRef } from "react"

const LazyImage = (imageProps) => {
    const [shouldLoad, setShouldLoad] = useState(false)
    const placeholderRef = useRef(null)

    useEffect(() => {
        if (!shouldLoad && placeholderRef.current) {
            const observer = new IntersectionObserver(
                ([{ intersectionRatio }]) => {
                    if (intersectionRatio > 0) {
                        setShouldLoad(true)
                    }
                }
            )
            observer.observe(placeholderRef.current)
            return () => observer.disconnect()
        }
    }, [shouldLoad, placeholderRef])

    return shouldLoad ? (
        <img
            {...imageProps}
            onError={(e) => {
                e.target.onerror = null
                e.target.src = "/avatar.png"
            }}
        />
    ) : (
        <div className="img-placeholder" ref={placeholderRef} />
    )
}

export default LazyImage

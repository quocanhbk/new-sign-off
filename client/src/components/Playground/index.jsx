/* eslint-disable no-unused-vars */
import React, { useState } from 'react'

const Playground = () => {
    const [image, setImage] = useState()
    const [formImage, setFormImage] = useState()
    const onFormSubmit = (e) => {
        e.preventDefault()
        const formData = new FormData();

    }
    return (
        <div>
            <img src={'/architecture.pdf'} alt=""/>
        </div>
        
    )
}

export default Playground
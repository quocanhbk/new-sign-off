/* eslint-disable no-unused-vars */
import React, { useState } from 'react'
import axios from 'axios'
import styled from 'styled-components'
import ImageItem from './ImageItem'
const Container = styled.div`
    display: flex;
    height: 100%;
`
const ImgContainer = styled.div`
    flex: 1;
    overflow: auto;
    height: 100%;
    & img {
        width: 100%;
    }
`
const Playground = () => {
    const [image, setImage] = useState()
    const [imgArray, setImgArray] = useState([])
    const [isAdd, setIsAdd] = useState(false)
    const onFormSubmit = (e) => {
        e.preventDefault()
        const formData = new FormData();
        formData.append('myImage', image)
        const config = {
            headers: {
                'content-type': 'multipart/form-data'
            }
        }
        axios.post(process.env.PORT || 'http://localhost:5000/upload', formData, config).then((res) => setImgArray(res.data.path))
    }

    const handleChange = (e) => {
        setImage(e.target.files[0])
    }
    return (
        <Container>
            <div>
                <form onSubmit={onFormSubmit}>
                    <h1>File Upload</h1>
                    <input type="file" name="myImage" onChange={handleChange}/>
                    <button type="submit">Upload</button>
                </form>
                <button onClick={() => setIsAdd(true)}>CLick me</button>
            </div>
            
            <ImgContainer>
                {imgArray.map(path => 
                    <ImageItem key={path} src={path} isAdd={isAdd} setIsAdd={setIsAdd} />    
                )}
            </ImgContainer>
        </Container>
        
    )
}

export default Playground
/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from 'react'
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
    const [imgArray, setImgArray] = useState([])
    const [isAdd, setIsAdd] = useState(false)
    const [tagTitle, setTagTitle] = useState("")
    const [selectedTag, setSelectedTag] = useState()

    const handleChange = (e) => {
        e.preventDefault()
        if (!e.target.files[0]) return
        const formData = new FormData();
        formData.append('myImage', e.target.files[0])
        const config = {
            headers: {
                'content-type': 'multipart/form-data'
            }
        }
        axios.post('/upload', formData, config).then((res) => {
            let count = 1
            setImgArray(res.data.path.map(p => ({id: count++, path: p, tagList: []})))
        })
    }
    const addTextTag = (path, pos) => {
        if (isAdd) {
            let item = imgArray.find(item => item.path === path)
            item.tagList.push({name: tagTitle, position: pos, content: ""})
            setImgArray([...imgArray.filter(item => item.path !== path), item].sort((a, b) => a.id - b.id))
            setIsAdd(false)
            setTagTitle("")
        }
    }
    const selectTag = (path, name) => {
        setSelectedTag({path, name})
    }
    const changeTagContent = (e) => {
        let currentItem = imgArray.find(item => item.path === selectedTag.path)
        let currentTag = currentItem.tagList.find(tag => tag.name === selectedTag.name)
        currentTag.content = e.target.value

        setImgArray([...imgArray.filter(item => item.path !== selectedTag.path), currentItem].sort((a, b) => a.id - b.id))
    }
    const getContent = () => {
        if (!selectedTag)
            return ""
        return imgArray.find(item => item.path === selectedTag.path).tagList.find(tag => tag.name === selectedTag.name).content
    }
    return (
        <Container>
            <div>
                <form>
                    <h1>File Upload</h1>
                    <input type="file" name="myImage" onChange={handleChange} accept=".pdf"/>
                </form>
                <form>
                    <label>Click Add Text Tag then hover the document</label>
                    <br/>
                    <input type="text" value={tagTitle} onChange={(e) => setTagTitle(e.target.value)}/>
                    <button onClick={(e) => {e.preventDefault();setIsAdd(true)}}>Add Text Tag</button>
                </form>
                {selectedTag && <input type="text" value={getContent()} onChange={changeTagContent}/>}
            </div>
            
            <ImgContainer>
                {imgArray.map(item => 
                    <ImageItem 
                        key={item.path} 
                        src={item.path} 
                        isAdd={isAdd} 
                        addTextTag={(pos) => addTextTag(item.path, pos)} 
                        tagList={item.tagList}
                        selectTag={(name) => selectTag(item.path, name)}
                    />    
                )}
            </ImgContainer>
        </Container>
        
    )
}

export default Playground
/* eslint-disable no-unreachable */
/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import React, { useRef, useState } from 'react'
import styled from 'styled-components'
import FieldTag from '../FieldTag'
import { Document, Page } from 'react-pdf/dist/esm/entry.webpack';
import UploadButton from './UploadButton'
import LoadingFile from '../LoadingFile';


const Container = styled.div`
    position: relative;
    min-height: 100%;
    width: 100%;
    & .react-document {
        min-height: 100%;
        width: 200px;
    }
`
const UploadContainer = styled.div`
    min-height: 100%;
    display: grid;
    place-items: center;
`
const DocContent = ({file, addingTag, fieldData, handleClickDoc, numPage, setNumPage, moveField, resizeField}) => {

    const [curPos, setCurPos] = useState({X: -100, Y: -100})
    let docRef = useRef()
    let pageRef = useRef()
    let floatRef = useRef()
    let selectedFieldId = useRef("")
    let selectedResizer = useRef(false)
    let oldPos = useRef({X: -100, Y: -100})
    const [displayTag, setDisplayTag] = useState(false)

    const handleMouseMoveDoc = (e) => {
        if (addingTag === "field") {
            let {x, y, width, height} = docRef.current.getBoundingClientRect()  
            let {width: floatWidth, height: floatHeight} = floatRef.current.getBoundingClientRect()
            setCurPos({X: (e.clientX - x - floatWidth/2)*100 / width, Y: (e.clientY - y - floatHeight/2)*100 / height})
            return
        }
        if (selectedResizer.current) {
            let tagPos = fieldData.find(field => field.id === selectedFieldId.current).position
            let {x, y, width, height} = docRef.current.getBoundingClientRect()
            let curPos = {X: (e.clientX - x)/width*100, Y: (e.clientY - y)/height*100}
            let size = {width: (curPos.X - tagPos.X), height:(curPos.Y - tagPos.Y)}
            resizeField(selectedFieldId.current, size)
            return
        }
        if (selectedFieldId.current !== "") {
            let tagPos = fieldData.find(field => field.id === selectedFieldId.current).position
            let {x, y, width, height} = docRef.current.getBoundingClientRect()  
            let currPos = {X: (e.clientX - x)*100 / width, Y: (e.clientY - y)*100 / height}
            let newPos = {X: currPos.X - oldPos.current.X, Y: currPos.Y - oldPos.current.Y}
            oldPos.current = currPos
            let pos = {
                X: tagPos.X + newPos.X , 
                Y: tagPos.Y + newPos.Y
            }
            moveField(selectedFieldId.current, pos)
        }
    }

    const renderPage = () => {
        let arr = []
        for (let i = 1; i <= numPage; i++) {
            arr.push(
                <Page 
                    key={i} 
                    inputRef={i === 1 ? pageRef : null} 
                    width={docRef.current.getBoundingClientRect().width} 
                    pageNumber={i} 
                    renderTextLayer={false} 
                    renderAnnotationLayer={false}
                    renderMode="canvas"
                />)
        }
        return arr
    }
    const handleMouseDownField = (e, id) => {
        selectedFieldId.current = id
        let {x, y, width, height} = docRef.current.getBoundingClientRect()  
        oldPos.current = {X: (e.clientX - x)*100 / width, Y: (e.clientY - y)*100 / height}
    }
    const handleMouseUp = () => {
        selectedFieldId.current = ""
        selectedResizer.current = false
    }
    const handleMouseDownResizer = () => selectedResizer.current = true
    
    return (
        <Container
            ref={docRef}
            onMouseMove={handleMouseMoveDoc}
            onClick={() => {handleClickDoc(curPos); setCurPos({X: -100, Y: -100})}}
            onMouseUp={handleMouseUp}
            className="doc-display"
        >
            {displayTag && fieldData.map(tag => 
                <FieldTag 
                    key={tag.id} 
                    data={tag}
                    onMouseDown={(e) => handleMouseDownField(e, tag.id)}
                    onMouseDownResizer={handleMouseDownResizer}
                    fontSize={docRef.current.getBoundingClientRect().width/60 + "px"}
                />
            )}
            {addingTag === "field" && 
                <FieldTag 
                    data= {{position: curPos, content: "", size: {width: 2, height: 0.1}}}
                    reff={floatRef}
                /> 
            }
            <Document 
                file={file}
                className="react-document" 
                onLoadSuccess={(numPage) => {setNumPage(numPage._pdfInfo.numPages); setDisplayTag(true)}}
                loading={<LoadingFile/>}
            >
                {renderPage()}
            </Document>
        </Container>
    )
}

export default DocContent
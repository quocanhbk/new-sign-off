/* eslint-disable no-unreachable */
/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import React, { useRef, useState } from 'react'
import styled from 'styled-components'
import FieldTag from './FieldTag'
import NoData from './NoFile';
import LoadingFile from './LoadingFile';
import { Document, Page } from 'react-pdf/dist/esm/entry.webpack';

const DocWrapper = styled.div`
    position: relative;
    min-height: 100%;
    & .abc {
        min-height: 100%;
    }
    overflow-x: auto;
`

const DocDisplay = ({file, addingTag, tagData, tagName, handleClickDoc, numPage, setNumPage, docRef, pageRef, moveTag, resizeTag}) => {

    const [curPos, setCurPos] = useState({X: -100, Y: -100})

    let selectedTagName = useRef("")
    let selectedResizer = useRef(false)
    let oldPos = useRef({X: -100, Y: -100})
    const handleMouseMoveDoc = (e) => {
        if (addingTag) {
            let {x, y, width, height} = docRef.current.getBoundingClientRect()  
            setCurPos({X: (e.clientX - x)*100 / width, Y: (e.clientY - y)*100 / height})
            return
        }
        if (selectedResizer.current) {
            let tagPos = tagData.find(tag => tag.name === selectedTagName.current).position
            let {x, y, width, height} = docRef.current.getBoundingClientRect()
            let curPos = {X: (e.clientX - x)/width*100, Y: (e.clientY - y)/height*100}
            let size = {width: (curPos.X - tagPos.X), height:(curPos.Y - tagPos.Y)}
            resizeTag(selectedTagName.current, size)
            return
        }
        if (selectedTagName.current !== "") {
            let tagPos = tagData.find(tag => tag.name === selectedTagName.current).position
            let {x, y, width, height} = docRef.current.getBoundingClientRect()  
            let currPos = {X: (e.clientX - x)*100 / width, Y: (e.clientY - y)*100 / height}
            let newPos = {X: currPos.X - oldPos.current.X, Y: currPos.Y - oldPos.current.Y}
            oldPos.current = currPos
            let pos = {
                X: tagPos.X + newPos.X , 
                Y: tagPos.Y + newPos.Y
            }
            moveTag(selectedTagName.current, pos)
        }
    }

    const renderPage = () => {
        let arr = []
        for (let i = 1; i <= numPage; i++) {
            arr.push(<Page key={i} inputRef={i === 1 ? pageRef : null} width={docRef.current.getBoundingClientRect().width} pageNumber={i} renderTextLayer={false} renderAnnotationLayer={false}/>)
        }
        return arr
    }
    const handleMouseDownTag = (e, name) => {
        selectedTagName.current = name
        let {x, y, width, height} = docRef.current.getBoundingClientRect()  
        oldPos.current = {X: (e.clientX - x)*100 / width, Y: (e.clientY - y)*100 / height}
    }
    const handleMouseUp = () => {
        selectedTagName.current = ""
        selectedResizer.current = false
    }
    const handleMouseDownResizer = () => selectedResizer.current = true

    return (
        <DocWrapper
            ref={docRef}
            onMouseMove={handleMouseMoveDoc}
            onClick={() => {handleClickDoc(curPos); setCurPos({X: -100, Y: -100})}}
            onMouseUp={handleMouseUp}
            className="doc-display"
        >
            {tagData.map(tag => 
                <FieldTag 
                    key={tag.name} 
                    data={tag}
                    onMouseDown={(e) => handleMouseDownTag(e, tag.name)}
                    onMouseDownResizer={handleMouseDownResizer}
                />
            )}
            {addingTag && 
                <FieldTag 
                    data= {{position: curPos, name: tagName, content: "", size: {width: 2, height: 0.1}}}
                /> 
            }
            <Document 
                file={file}
                className="abc" 
                onLoadSuccess={(numPage) => setNumPage(numPage._pdfInfo.numPages)}
                noData={<NoData/>}
                loading={<LoadingFile/>}
            >
                {renderPage()}
            </Document>
        </DocWrapper>
    )
}

export default DocDisplay
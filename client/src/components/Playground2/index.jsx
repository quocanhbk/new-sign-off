/* eslint-disable no-unused-vars */
import React, { useEffect, useRef, useState } from 'react'
import { Document, Page } from 'react-pdf/dist/esm/entry.webpack';
import styled from 'styled-components'
import jsPDF from 'jspdf';
import html2canvas from 'html2canvas'
const Container = styled.div`
    height: 100%;
    overflow-y: auto;
    display: flex;
    gap: 1rem;
`
const Toolbar = styled.div`
    display: flex;
    flex: 1;
    flex-direction: column;
    gap: 1rem;
    & button {
        border: none;
        outline: none;
        padding: 0.5rem 1rem;
        cursor: pointer;
    }
`
const Float = styled.div`
    position: absolute;
    width: 4rem;
    height: 1.5rem;
    transform: translate(-50%, -50%);
    border: 1px solid black;
    color: black;
    z-index: 3;
`
const DocContainer = styled.div`
    flex: 6;
    margin-left: auto;
    position: relative;
    overflow: overlay;
`
const DocWrapper = styled.div`
    position: relative;
`
const Playground2 = () => {
    const [add, setAdd] = useState(false)
    const [numPage, setNumPage] = useState(0)
    const [file, setFile] = useState()
    const [pos, setPos] = useState({x: 0, y: 0})
    const [tagData, setTagData] = useState([])
    const [tagName, setTagName] = useState("")
    let ipRef = useRef()
    let cvRef = useRef()
    let ctnRef = useRef()
    const handleDownload = (e) => {
        e.preventDefault()
        let docSize = ipRef.current.getBoundingClientRect()
        let pageSize = cvRef.current.getBoundingClientRect()

        html2canvas(ipRef.current).then(canvas => {
            let data = canvas.toDataURL('image/jpg')
            const pdf = new jsPDF('p', 'pt', [pageSize.width, pageSize.height])
            pdf.addImage(data, 'JPEG', 0, 0, docSize.width, docSize.height)
            for (let i = 1; i < numPage; i++) {
                pdf.addPage()
                pdf.addImage(data, 'JPEG', 0, -pageSize.height * i , docSize.width, docSize.height)
            }
            
            
            pdf.save("download.pdf")
        })
    }

    const handleAdd = (e) => setAdd(true)
    const handleMouseLeave = (e) => setAdd(false)
    const handleMouseMove = (e) => {
        if (add) {
            let {x, y, width, height} = ipRef.current.getBoundingClientRect()
            setPos({x: (e.clientX - x)*100 / width, y: (e.clientY - y)*100 / height})
        }
    }
    const handleAddTag = (e) => {
        if (add) {
            setTagData([...tagData, {pos: pos, name: tagName}])
            setAdd(false)
            setTagName("")
        }
    }
    const renderPage = () => {
        let arr = []
        for (let i = 1; i <= numPage; i++) {
            arr.push(<Page key={i} inputRef={i === 1 ? cvRef : null} width={ipRef.current.getBoundingClientRect().width} pageNumber={i} renderTextLayer={false} renderAnnotationLayer={false}/>)
        }
        return arr
    }

    const upFile = (e) => setFile(e.target.files[0])

    return (
        <Container className="what" ref={ctnRef}>
            <Toolbar>
                <button onClick={handleDownload}>Download</button>
                <input type="text" value={tagName} onChange={(e) => {e.preventDefault();setTagName(e.target.value)}}/>
                <button onClick={handleAdd}>Add Rect</button>
                <input type="file" onChange={upFile}/>
            </Toolbar>
            <DocContainer>
                <DocWrapper 
                    ref={ipRef} 
                    onMouseLeave={handleMouseLeave} 
                    onMouseMove={handleMouseMove}
                    onClick={handleAddTag}
                >
                    {tagData.map(tag => 
                        <Float key={tag.pos} style={{left: tag.pos.x + "%", top: tag.pos.y + "%"}} >
                            {tag.name}
                        </Float>
                    )}
                    {add && <Float style={{left: pos.x + "%", top: pos.y + "%"}}/> }
                    <Document 
                        file={file}
                        className="abc" 
                        onLoadSuccess={(numPage) => setNumPage(numPage._pdfInfo.numPages)}
                    >
                        {renderPage()}
                    </Document>
                </DocWrapper>
            </DocContainer>
            

        </Container>
    )
}

export default Playground2
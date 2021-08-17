import { useRef, useState } from "react"
import styled from "styled-components"
import FieldTag from "./FieldTag"
import { Document, Page } from "react-pdf/dist/esm/entry.webpack"
import LoadingFile from "./LoadingFile"

const Container = styled.div`
    position: relative;
    min-height: 100%;
    width: 100%;
    & .react-document {
        min-height: 100%;
        width: 200px;
    }
`
const DocContent = ({ attachment }) => {
    let docRef = useRef<HTMLDivElement>()
    let pageRef = useRef<HTMLDivElement>()
    const [displayTag, setDisplayTag] = useState(false)
    const [numPage, setNumPage] = useState(0)

    const renderPage = () => {
        let arr: JSX.Element[] = []
        for (let i = 1; i <= numPage; i++) {
            arr.push(
                <Page
                    key={i}
                    inputRef={i === 1 ? pageRef : null}
                    width={docRef.current!.getBoundingClientRect().width}
                    pageNumber={i}
                    renderTextLayer={false}
                    renderAnnotationLayer={false}
                    renderMode="canvas"
                />
            )
        }
        return arr
    }

    return (
        <Container ref={docRef} className="doc-display">
            {displayTag &&
                attachment.fields.map(tag => (
                    <FieldTag
                        key={tag.id}
                        data={tag}
                        fontSize={docRef.current!.getBoundingClientRect().width / 60 + "px"}
                    />
                ))}
            <Document
                file={attachment.file}
                className="react-document"
                onLoadSuccess={numPage => {
                    setNumPage(numPage._pdfInfo.numPages)
                    setDisplayTag(true)
                }}
                loading={<LoadingFile />}
            >
                {renderPage()}
            </Document>
        </Container>
    )
}

export default DocContent

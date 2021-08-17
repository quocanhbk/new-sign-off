import { useRef, useState } from "react"
import FieldTag from "../FieldTag"
import { Document, Page } from "react-pdf/dist/esm/entry.webpack"
import { Box } from "@chakra-ui/react"
import { Loader } from "components/Base"
import { IField } from "api"
import { Id } from "types"

export interface DocContentProps {
    file: File | string
    addingTag: string | null
    fieldData: IField[]
    handleClickDoc: (position: IField["position"]) => void
    numPage: number
    setNumPage: (pageNum: number) => void
    moveField: (fieldId: Id, position: IField["position"]) => void
    resizeField: (fieldId: Id, size: IField["size"]) => void
}

const DocContent = ({
    file,
    addingTag,
    fieldData,
    handleClickDoc,
    numPage,
    setNumPage,
    moveField,
    resizeField,
}: DocContentProps) => {
    const [curPos, setCurPos] = useState({ X: -100, Y: -100 })
    let docRef = useRef<HTMLDivElement>(null)
    let pageRef = useRef<HTMLDivElement>(null)
    let floatRef = useRef<HTMLDivElement>(null)
    let selectedFieldId = useRef("")
    let selectedResizer = useRef(false)
    let oldPos = useRef({ X: -100, Y: -100 })
    const [displayTag, setDisplayTag] = useState(false)

    const handleMouseMoveDoc = e => {
        if (addingTag === "field") {
            let { x, y, width, height } = docRef.current!.getBoundingClientRect()
            let { width: floatWidth, height: floatHeight } = floatRef.current!.getBoundingClientRect()
            setCurPos({
                X: ((e.clientX - x - floatWidth / 2) * 100) / width,
                Y: ((e.clientY - y - floatHeight / 2) * 100) / height,
            })
            return
        }
        if (selectedResizer.current) {
            let tagPos = fieldData.find(field => field.id === selectedFieldId.current)!.position
            let { x, y, width, height } = docRef.current!.getBoundingClientRect()
            let curPos = { X: ((e.clientX - x) / width) * 100, Y: ((e.clientY - y) / height) * 100 }
            let size = { width: curPos.X - tagPos.X, height: curPos.Y - tagPos.Y }
            resizeField(selectedFieldId.current, size)
            return
        }
        if (selectedFieldId.current !== "") {
            let tagPos = fieldData.find(field => field.id === selectedFieldId.current)!.position
            let { x, y, width, height } = docRef.current!.getBoundingClientRect()
            let currPos = { X: ((e.clientX - x) * 100) / width, Y: ((e.clientY - y) * 100) / height }
            let newPos = { X: currPos.X - oldPos.current.X, Y: currPos.Y - oldPos.current.Y }
            oldPos.current = currPos
            let pos = {
                X: tagPos.X + newPos.X,
                Y: tagPos.Y + newPos.Y,
            }
            moveField(selectedFieldId.current, pos)
        }
    }

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
    const handleMouseDownField = (e, id) => {
        selectedFieldId.current = id
        let { x, y, width, height } = docRef.current!.getBoundingClientRect()
        oldPos.current = { X: ((e.clientX - x) * 100) / width, Y: ((e.clientY - y) * 100) / height }
    }
    const handleMouseUp = () => {
        selectedFieldId.current = ""
        selectedResizer.current = false
    }
    const handleMouseDownResizer = () => (selectedResizer.current = true)

    return (
        <Box
            w="full"
            minH="100%"
            pos="relative"
            ref={docRef}
            onMouseMove={handleMouseMoveDoc}
            onClick={() => {
                handleClickDoc(curPos)
                setCurPos({ X: -100, Y: -100 })
            }}
            onMouseUp={handleMouseUp}
            className="doc-display"
        >
            {displayTag &&
                fieldData.map(tag => (
                    <FieldTag
                        key={tag.id}
                        data={tag}
                        onMouseDown={e => handleMouseDownField(e, tag.id)}
                        onMouseDownResizer={handleMouseDownResizer}
                        fontSize={docRef.current!.getBoundingClientRect().width / 60 + "px"}
                    />
                ))}
            {addingTag === "field" && (
                <FieldTag
                    data={{ position: curPos, content: "", size: { width: 2, height: 0.1 }, name: "" }}
                    ref={floatRef}
                />
            )}
            <Document
                file={file}
                className="react-document"
                onLoadSuccess={numPage => {
                    setNumPage(numPage._pdfInfo.numPages)
                    setDisplayTag(true)
                }}
                loading={<Loader isLoading={true} />}
            >
                {renderPage()}
            </Document>
        </Box>
    )
}

export default DocContent

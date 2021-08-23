import { useRef, useState } from "react"
import FieldTag from "components/Base/FormView/FieldTag"
import { Document, Page } from "react-pdf/dist/esm/entry.webpack"
import { Loader } from "components/Base"
import { Box } from "@chakra-ui/react"
import { IAttachment } from "api"

interface DocContentProps {
    attachment: IAttachment
}

const DocContent = ({ attachment }: DocContentProps) => {
    let docRef = useRef<HTMLDivElement>(null)
    let pageRef = useRef<HTMLDivElement>(null)
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
        <Box ref={docRef} pos="relative" w="full" h="32rem">
            {displayTag &&
                attachment.fields.map(tag => (
                    <FieldTag
                        key={tag.id}
                        data={tag}
                        fontSize={docRef.current!.getBoundingClientRect().width / 60 + "px"}
                        readOnly
                    />
                ))}
            <Document
                file={attachment.file}
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

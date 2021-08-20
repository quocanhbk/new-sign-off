import { Document, Page } from "react-pdf/dist/esm/entry.webpack"
import { navigate, RouteComponentProps } from "@reach/router"
import Header from "./Header"
import useForm from "./useForm"
import { Box, Flex } from "@chakra-ui/react"
import FieldTag from "components/Base/FormView/FieldTag"
import { Id } from "types"
import { Loader, SubmitConfirmAlert } from "components/Base"

interface DisplayContentProps extends RouteComponentProps {
    id?: string
}

const Detail = ({ id }: DisplayContentProps) => {
    const {
        form,
        render,
        numPage,
        docRef,
        renderFields,
        setNumPage,
        setRenderFields,
        deletePopup,
        setDeletePopup,
        mutateDeleteForm,
    } = useForm(id as Id)

    const renderPage = () => {
        let arr: JSX.Element[] = []
        for (let i = 1; i <= numPage; i++) {
            arr.push(
                <Page
                    key={i}
                    width={docRef.current!.getBoundingClientRect().width}
                    pageNumber={i}
                    renderTextLayer={false}
                    renderAnnotationLayer={false}
                />
            )
        }
        return arr
    }
    const renderDoc = () =>
        form ? (
            <>
                <SubmitConfirmAlert
                    isOpen={deletePopup}
                    onClose={() => setDeletePopup(false)}
                    title={`Delete ${form.name}`}
                    color="red"
                    onConfirm={mutateDeleteForm}
                />
                <Header
                    title={form.name}
                    onDeleteClick={() => setDeletePopup(true)}
                    onEditClick={() => navigate("/form/create/" + id)}
                />
                <Box flex={1} pos="relative" overflow="overlay">
                    {!renderFields && <Loader isLoading={true} />}
                    <Box pos="relative">
                        {renderFields &&
                            form.fields.map(field => (
                                <FieldTag
                                    key={field.id}
                                    data={field}
                                    fontSize={docRef.current!.getBoundingClientRect().width / 60 + "px"}
                                    readOnly
                                />
                            ))}
                        <Document
                            file={form && form.file}
                            className="form-document"
                            onLoadSuccess={numPage => {
                                setNumPage(numPage._pdfInfo.numPages)
                                setRenderFields(true)
                            }}
                            noData={""}
                            loading={""}
                        >
                            {renderPage()}
                        </Document>
                    </Box>
                </Box>
            </>
        ) : null

    return (
        <Flex direction="column" h="full" pos="relative" ref={docRef} className="container">
            {render(renderDoc())}
        </Flex>
    )
}

export default Detail

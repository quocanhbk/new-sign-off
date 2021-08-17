/* eslint-disable react/prop-types */
/* eslint-disable no-unreachable */
/* eslint-disable no-unused-vars */
import { useState } from "react"
import FieldContentInput from "./FieldContentInput"
import DocDisplay from "./DocDisplay"
import {
    ButtonContainer,
    Container,
    Wrapper,
    Toolbar,
    ToolbarContainer,
    ToolbarElement,
    NoField,
    FormNameInput,
} from "./IndexStyledComponents"
import useFormData from "./useFormData"

const FormPopup = ({ attachment, onUpdateAttachment, attachmentType }) => {
    const {
        // Field data : array of field (name, content, position (%), size (%), required)
        fieldData,
        // Some basic state
        formName,
        changeFormName,
        file,
        addingTag,
        setAddingTag,
        //Helper function
        addNewField,
        changeContent,
        moveField,
        resizeField,
        changeName,
        deleteField,
        toggleRequire,

        saveForm,
    } = useFormData(attachment, onUpdateAttachment)
    const [numPage, setNumPage] = useState()

    return (
        <Container>
            <Wrapper>
                <Toolbar className="toolbar">
                    <ToolbarElement>
                        <h3>Form Name</h3>
                        <FormNameInput value={formName} onChange={changeFormName} />
                    </ToolbarElement>
                    <ToolbarElement fieldList>
                        <h3>Fields</h3>
                        <ToolbarContainer>
                            {fieldData.length > 0 ? (
                                fieldData.map(field => (
                                    <FieldContentInput
                                        key={field.id}
                                        name={field.name}
                                        content={field.content}
                                        required={field.required}
                                        onChangeName={e => changeName(field.id, e.target.value)}
                                        onChangeContent={e => changeContent(field.id, e.target.value)}
                                        onToggleRequire={() => toggleRequire(field.id)}
                                        onDelete={() => deleteField(field.id)}
                                    />
                                ))
                            ) : (
                                <NoField>No Field</NoField>
                            )}
                        </ToolbarContainer>
                    </ToolbarElement>
                    <ButtonContainer>
                        {/* <Button onClick={downloadForm}>Download Form</Button> */}
                        <button onClick={saveForm}>Save Form</button>
                    </ButtonContainer>
                </Toolbar>
                <DocDisplay
                    attachmentType={attachmentType}
                    file={file}
                    addingTag={addingTag}
                    setAddingTag={setAddingTag}
                    fieldData={fieldData}
                    handleClickDoc={addNewField}
                    numPage={numPage}
                    setNumPage={setNumPage}
                    moveField={moveField}
                    resizeField={resizeField}
                />
            </Wrapper>
        </Container>
    )
}

export default FormPopup

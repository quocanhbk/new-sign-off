/* eslint-disable no-unreachable */
/* eslint-disable no-unused-vars */
import React, {useRef, useState} from 'react'
import {PDFDocument, StandardFonts, rgb} from 'pdf-lib'
import Button from '../../Button';
import FieldContentInput from './FieldContentInput'
import DocDisplay from './DocDisplay'
import {BsChevronLeft} from 'react-icons/bs'
import { navigate } from '@reach/router';
import {ButtonContainer, Container, Wrapper, StyleTitle, Toolbar, ToolbarContainer, ToolbarElement, NoField, FormNameInput} from './IndexStyledComponents'
import useFormData from './useFormData';
import axios from 'axios'
const CreatePage = () => {
    let {
        // Field data : array of field (name, content, position (%), size (%), required)
        fieldData, 
        // Some basic state
        formName, changeFormName, file, addingTag, setAddingTag,
        //Helper function
        addNewField, changeContent, moveField, resizeField, changeName, deleteField, toggleRequire, initForm,

        saveForm
    } = useFormData()
    
    const [numPage, setNumPage] = useState()
    const handleClickDoc = (pos) => {
        addNewField(pos)
    }

    const downloadForm = async () => {
        let existingPdf = await file.arrayBuffer()
        const pdfDoc = await PDFDocument.load(existingPdf)

        const helveticaFont = await pdfDoc.embedFont(StandardFonts.Helvetica)

        const pages = pdfDoc.getPages()
        const {width, height} = pages[0].getSize()

        fieldData.forEach(field => {
            let pctPage = 100 / pages.length
            let pageOfField = Math.floor(field.position.Y / pctPage)
            let relativeY = field.position.Y - pctPage*pageOfField
            
            pages[pageOfField].drawText(field.content, {
                x: field.position.X * width / 100,
                y: height - relativeY * height * pages.length / 100 -10,
                font: helveticaFont,
                size: 12,
                color: rgb(0,0,0)
            })
        });
        const pdfBytes = await pdfDoc.save()
        let blob = new Blob([pdfBytes], {type: "application/pdf"})
        let link = document.createElement('a');
        link.href = window.URL.createObjectURL(blob)
        link.download=`${formName}.pdf`
        link.click()
    }
    
    return (
        <Container>
            <StyleTitle>
                <div onClick={() => navigate('/form')}>
                    <BsChevronLeft/>
                </div>
                <p>Create Form</p>
            </StyleTitle>
            <Wrapper>
                {file && 
                    <Toolbar>
                        <ToolbarElement>
                            <h3>Form Name</h3>
                            <FormNameInput value={formName} onChange={changeFormName}/>
                        </ToolbarElement>
                        <ToolbarElement>
                            <h3>Field List</h3>
                            <ToolbarContainer>
                                {
                                    fieldData.length > 0 ? fieldData.map(field => 
                                        <FieldContentInput 
                                            key={field.id} 
                                            name={field.name} 
                                            content={field.content}
                                            required={field.required}
                                            onChangeName={(e) => changeName(field.id, e.target.value)}
                                            onChangeContent={(e) => changeContent(field.id, e.target.value)}
                                            onToggleRequire={() => toggleRequire(field.id)}
                                            onDelete={() => deleteField(field.id)}
                                        />
                                    ) : <NoField>No Field</NoField>
                                }
                            </ToolbarContainer>
                        </ToolbarElement>
                        <ButtonContainer>
                            <Button onClick={downloadForm}>Download Form</Button>
                            <Button onClick={saveForm}>Save Form</Button>
                        </ButtonContainer>
                        
                    </Toolbar>
                }
                <DocDisplay 
                    file={file}
                    initForm={initForm}
                    addingTag={addingTag}
                    setAddingTag={setAddingTag}
                    fieldData={fieldData}
                    handleClickDoc={handleClickDoc}
                    numPage={numPage}
                    setNumPage={setNumPage}
                    // docRef={docRef}
                    // pageRef={pageRef}
                    moveField={moveField}
                    resizeField={resizeField}
                />
            </Wrapper>
            
        </Container>
    )
}

export default CreatePage
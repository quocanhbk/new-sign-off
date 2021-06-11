/* eslint-disable no-unreachable */
/* eslint-disable no-unused-vars */
import React, {useRef, useState} from 'react'
import {PDFDocument, StandardFonts, rgb, drawTextField} from 'pdf-lib'
import Button from '../../Button';
import FieldContentInput from './FieldContentInput'
import DocDisplay from './DocDisplay'
import Context from '../../../Context'
import {BsChevronLeft} from 'react-icons/bs'
import { navigate } from '@reach/router';
import {ButtonContainer, Container, Wrapper, StyleTitle, Toolbar, ToolbarContainer, ToolbarElement, NoField, FormNameInput} from './IndexStyledComponents'
import useFormData from './useFormData';
import axios from 'axios'
import jsPDF from 'jspdf';
const CreatePage = () => {
    
    let docRef = useRef()
    let pageRef = useRef()
    let {
        // Field data : array of field (name, content, position (%), size (%), required)
        fieldData, 
        // Some basic state
        formName, changeFormName, file, addingTag, setAddingTag,
        //Helper function
        addNewField, changeContent, moveField, resizeField, changeName, deleteField, toggleRequire, initForm,
    } = useFormData()
    
    const [numPage, setNumPage] = useState()
    const {formContext} = Context.useContainer()
    const handleClickDoc = (pos) => {
        addNewField(pos)
    }

    const saveForm = () => {
        const data = new FormData()
        data.append('file', file)
        data.append('formName', formName)
        data.append('fieldData', fieldData)
        const config = {
            headers: {
                'content-type': 'multipart/form-data'
            }
        }
        axios.post('/api/form', data, config)
        formContext.addForm({name: formName, file: file, fieldData: fieldData})
        console.log(formContext.forms);
        navigate('/form')
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
            let {height: pageHeight} = pageRef.current.getBoundingClientRect()
            let newFontSize = height / window.innerHeight * 15
            console.log(pageHeight)
            console.log(newFontSize)
            pages[pageOfField].drawText(field.content, {
                x: field.position.X * width / 100,
                y: height - relativeY * height * pages.length / 100 - 9,
                font: helveticaFont,
                size: 11,
                color: rgb(0,0,0)
            })
        });
        const pdfBytes = await pdfDoc.save()
        let blob = new Blob([pdfBytes], {type: "application/pdf"})
        let link = document.createElement('a');
        link.href = window.URL.createObjectURL(blob)
        link.download="name.pdf"
        link.click()
    }
    const downloadForm2 = (e) => {
        e.preventDefault()
        let docSize = docRef.current.getBoundingClientRect()
        let pageSize = pageRef.current.getBoundingClientRect()
        let pdf = new jsPDF('p', 'pt', [pageSize.width, pageSize.height])
        pdf.html(docRef.current, {
            callback: () => {
                pdf.save('myDoc.pdf')
                window.open(pdf.output('bloburl'))
            }
        })
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
                            <Button onClick={downloadForm2}>Download Form 2</Button>
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
                    docRef={docRef}
                    pageRef={pageRef}
                    moveField={moveField}
                    resizeField={resizeField}
                />
            </Wrapper>
            
        </Container>
    )
}

export default CreatePage
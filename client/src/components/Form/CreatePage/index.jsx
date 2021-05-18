/* eslint-disable no-unreachable */
/* eslint-disable no-unused-vars */
import React, {useRef, useState} from 'react'
import Button from '../../Button';
import FieldContentInput from './FieldContentInput'
import DocDisplay from './DocDisplay'
import Context from '../../../Context'
import {BsChevronLeft} from 'react-icons/bs'
import { navigate } from '@reach/router';
import {Container, Wrapper, StyleTitle, Toolbar, ToolbarContainer, ToolbarElement, NoField, FormNameInput} from './IndexStyledComponents'
import useFormData from './useFormData';
import axios from 'axios'
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
                        <div style={{marginTop: "auto"}}>
                            <Button onClick={saveForm}>Save Form</Button>
                        </div>
                        
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
/* eslint-disable no-unreachable */
/* eslint-disable no-unused-vars */
import React, {useRef, useState} from 'react'
import Button from '../../Button';
import FieldContentInput from './FieldContentInput'
import DocDisplay from './DocDisplay'
import Context from '../../../Context'
import {BsChevronLeft} from 'react-icons/bs'
import { navigate } from '@reach/router';
import {Container, Wrapper, StyleTitle, Toolbar, ToolbarContainer, ToolbarElement, AddFieldInput, NoField} from './IndexStyledComponents'
import useFormData from './useFormData';

const CreatePage = () => {
    
    let docRef = useRef()
    let pageRef = useRef()
    let {file, setFile, addNewField, changeContent, changeName, moveField, resizeField, addingField, setAddingField, fieldData, toggleRequire} = useFormData()
    const [numPage, setNumPage] = useState()
    const {formContext} = Context.useContainer()
    const handleClickDoc = (pos) => {
        addNewField(pos)
    }

    const saveForm = () => {
        formContext.addForm({file: file, fieldData: fieldData})
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
                <Toolbar>
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
                                    />
                                ) : <NoField>No Field</NoField>
                            }
                        </ToolbarContainer>
                    </ToolbarElement>
                    <ToolbarElement>
                        <h3>Save</h3>
                        <ToolbarContainer>
                            <Button onClick={saveForm}>Save Form</Button>
                        </ToolbarContainer>
                    </ToolbarElement>
                </Toolbar>
                <DocDisplay 
                    file={file}
                    setFile={setFile}
                    addingField={addingField}
                    setAddingField={setAddingField}
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
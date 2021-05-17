/* eslint-disable no-unreachable */
/* eslint-disable no-unused-vars */
import React, {useRef, useState} from 'react'
import styled from "styled-components";
import UploadButton from './UploadButton'
import Button from '../../Button';
import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';
import FieldContentInput from './FieldContentInput'
import DocDisplay from './DocDisplay';
import Context from '../../../Context'
import {BsChevronLeft} from 'react-icons/bs'
import { getFader } from '../../../utils/color';
import { navigate } from '@reach/router';
const Container = styled.div`
    display:flex;
    flex-direction: column;
    height: 100%;
    width: 100%;
`
const Wrapper = styled.div`
    display: flex;
    flex: 1;
    gap: 1rem;
    height: 100%;
    overflow-y: auto;
`
const StyleTitle = styled.h3`
    width: 100%;
    border-bottom: 1px solid ${props => props.theme.color.border.primary};
    overflow: auto;
    display: flex;
    align-items: center;
    gap: 0.5rem;

    & div {
        display: grid;
        place-items: center;
        padding: 0.5rem;
        border-radius: 99px;
        cursor: pointer;
        &:hover {
            background: ${props => getFader(props.theme.color.border.primary, 0.5)};
        }
    }
    & {  
        padding: 1rem;
    }
`
const Toolbar = styled.div`
    flex: 1;
    display: flex;
    flex-direction: column;
    gap: 1rem;
    padding: 1rem;
    border-right: 1px solid ${props => props.theme.color.border.primary};
    & h3 {
        font-weight: 500;
        font-size: 1rem;
    }
`
const MainContainer = styled.div`
    flex: 5;
    position: relative;
    overflow: overlay;
`
const ToolbarContainer = styled.div`
    padding: 0.5rem;
    border: 1px solid ${props => props.theme.color.border.primary};
    border-radius: 0.5rem;
    display: flex;
    flex-direction: column;
    gap: 0.5rem;
`
const ToolbarElement = styled.div`
    display: flex;
    flex-direction: column;
    gap: 0.2rem;
`
const AddFieldInput = styled.input`
    border: 1px solid ${props => props.theme.color.border.primary};
    background: ${props => props.theme.color.background.secondary};
    color: ${props => props.theme.color.text.primary};
    font-size: 1rem;
    outline: none;
    padding: 0.5rem;
    border-radius: 0.5rem;

    &:focus {
        border-color: ${props => props.theme.color.fill.primary};
    }
`
const NoField = styled.div`
    font-style: italic;
    color: ${props => props.theme.color.text.secondary};
`

const CreatePage = () => {
    
    let docRef = useRef()
    let pageRef = useRef()
    
    const [addingTag, setAddingTag] = useState(false)
    const [tagData, setTagData] = useState([])
    const [file, setFile] = useState()
    const [numPage, setNumPage] = useState()
    const [tagName, setTagName] = useState("")
    const {formContext} = Context.useContainer()
    const handleClickDoc = (pos) => {
        if (addingTag) {
            setTagData([...tagData, {position: pos, name: tagName, content: "", size: {width: 2, height: 0.1}}])
            setAddingTag(false)
            setTagName("")
        }
    }
    const handleDownload = (e) => {
        e.preventDefault()
        let docSize = docRef.current.getBoundingClientRect()
        let pageSize = pageRef.current.getBoundingClientRect()

        html2canvas(docRef.current).then(canvas => {
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
    const changeContent = (name, e) => {
        let idx
        let tag = tagData.find((tag, index) => {
            idx = index
            return tag.name === name
        })
        tag.content = e.target.value
        setTagData([...tagData.slice(0, idx), tag, ...tagData.slice(idx + 1, tagData.length)])
    }
    const moveTag = (tagName, position) => {
        // position is the position of the cursor
        let idx
        let tag = tagData.find((tag, index) => {
            idx = index
            return tag.name === tagName
        })

        tag.position = position
        setTagData([...tagData.slice(0, idx), tag, ...tagData.slice(idx + 1, tagData.length)])
    }
    const resizeTag = (tagName, size) => {
        let idx
        let tag = tagData.find((tag, index) => {
            idx = index
            return tag.name === tagName
        })
        tag.size = size
        setTagData([...tagData.slice(0, idx), tag, ...tagData.slice(idx + 1, tagData.length)])
    }
    const saveForm = () => {
        formContext.addForm({file: file, tagData: tagData})
    }
    
    return (
        <Container>
            <StyleTitle>
                <div onClick={() => navigate('/playground3')}>
                    <BsChevronLeft/>
                </div>
                <p>Create Form</p>
            </StyleTitle>
            <Wrapper>
                <Toolbar>
                    <ToolbarElement>
                        <h3>Toolbar</h3>
                        <ToolbarContainer>
                            <UploadButton onSubmit={(f) => setFile(f)}/>
                            <Button onClick={handleDownload}>Download File</Button>
                        </ToolbarContainer>
                    </ToolbarElement>
                    <ToolbarElement>
                        <h3>Add Field</h3>
                        <ToolbarContainer>
                            <AddFieldInput type="text" value={tagName} onChange={(e) => {e.preventDefault();setTagName(e.target.value)}}/>
                            <Button onClick={() => setAddingTag(!addingTag)}>{!addingTag ? "Add Field" : "Cancel"}</Button>
                        </ToolbarContainer>
                    </ToolbarElement> 
                    <ToolbarElement>
                        <h3>Field List</h3>
                        <ToolbarContainer>
                            {
                                tagData.length > 0 ? tagData.map(tag => 
                                    <FieldContentInput 
                                        key={tag.name} 
                                        name={tag.name} 
                                        value={tag.content}
                                        onChange={(e) => changeContent(tag.name ,e)}
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
                <MainContainer className="maincontainer">
                    <DocDisplay
                        file={file}
                        addingTag={addingTag}
                        tagData={tagData}
                        tagName={tagName}
                        handleClickDoc={handleClickDoc}
                        numPage={numPage}
                        setNumPage={setNumPage}
                        docRef={docRef}
                        pageRef={pageRef}
                        moveTag={moveTag}
                        resizeTag={resizeTag}
                    />
                </MainContainer>
            </Wrapper>
            
        </Container>
    )
}

export default CreatePage
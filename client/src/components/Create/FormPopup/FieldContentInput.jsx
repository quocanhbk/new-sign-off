/* eslint-disable react/prop-types */
import React from 'react'
import { BsLockFill, BsFillUnlockFill, BsX } from 'react-icons/bs';
import styled from "styled-components";

const Container = styled.div`
    display: flex;
    flex-direction: column;
    gap: 0.2rem;
    
    & label {
        font-style: italic;
        color: ${props => props.theme.color.text.secondary};
    }
`
const NameInput = styled.input`
    background: transparent;
    font-style: italic;
    outline: none;
    color: ${props => props.theme.color.text.secondary};
    border: none;
    width: 100%;
`
const ContentInput = styled.input`
    border: 1px solid ${props => props.theme.color.border.primary};
    background: ${props => props.theme.color.background.secondary};
    color: ${props => props.theme.color.text.primary};
    font-size: 1rem;
    outline: none;
    padding: 0.5rem;
    border-radius: 0.5rem;
    width: 100%;
    &:focus {
        border-color: ${props => props.theme.color.fill.primary};
    }
`
const NameContainer = styled.div`
    display: flex;
    align-items: center;
    gap: 0.2rem;
`
const Icon = styled.div`
    display: flex;
    align-items: center;
    margin-left: auto;
    color: ${props => props.theme.color.text[props.color || "primary"]};
    cursor: pointer;
`
const FieldContentInput = ({name, content, onChangeContent, onChangeName, required, onToggleRequire, onDelete}) => {

    return (
        <Container>
            <NameContainer>
                <NameInput 
                    type="text" 
                    placeholder="Insert field name..."
                    value={name}
                    onChange={onChangeName}
                    spellCheck={"false"}
                />
                <Icon color="warning" onClick={onToggleRequire}>
                    {required ? <BsLockFill/> : <BsFillUnlockFill/>}
                </Icon>
                <Icon color="danger" onClick={onDelete}>
                    <BsX size="1.2rem"/>
                </Icon>
            </NameContainer>
            
            <ContentInput 
                type="text" 
                placeholder="Insert default content..." 
                value={content} 
                onChange={onChangeContent}
                spellCheck={"false"}
            />
        </Container>
    )
}

export default FieldContentInput
/* eslint-disable react/prop-types */
import React from 'react'
import styled from "styled-components";

const Container = styled.div`
    display: flex;
    flex-direction: column;
    gap: 0.2rem;
    
    & label {
        font-style: italic;
        color: ${props => props.theme.color.text.secondary};
    }

    & input {
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
    }
`

const FieldContentInput = ({name, value, onChange}) => {
    return (
        <Container>
            <label>{name}</label>
            <input 
                type="text" 
                placeholder="Insert default content..." 
                value={value} 
                onChange={onChange}
                autoComplete={"false"}
            />
        </Container>
    )
}

export default FieldContentInput
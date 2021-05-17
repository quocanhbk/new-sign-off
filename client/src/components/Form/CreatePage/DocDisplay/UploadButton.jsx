/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import React from 'react'
import styled from "styled-components";

const Container = styled.div`
    cursor: pointer;
    background: ${props => props.theme.color.fill.primary};
    position: relative;
    color: ${props => props.theme.color.background.primary};
    padding: 0.5rem;
    border-radius: 0.5rem;
    text-align: center;

    & input, input::-webkit-file-upload-button {
        height: 100%;
        width: 100%;
        position: absolute;
        top: 0;
        right: 0;
        z-index: 99;
        cursor: pointer;
        opacity: 0;
    }

`

const UploadButton = ({onSubmit}) => {

    const handleChange = (e) => {
        onSubmit(e.target.files[0])
    }
    
    return (
        <Container>
            Upload File
            <input type="file" onChange={handleChange} title=""/>
        </Container>
    )
}

export default UploadButton
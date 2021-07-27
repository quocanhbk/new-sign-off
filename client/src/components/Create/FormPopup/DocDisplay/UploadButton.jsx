/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import React from "react"
import styled from "styled-components"
import { BsArrowBarUp } from "react-icons/bs"
import { getFader } from "utils/color"

const Container = styled.div`
    cursor: pointer;
    background: transparent;
    position: relative;
    color: ${(props) => props.theme.color.fill.primary};
    border: 1px solid ${(props) => props.theme.color.border.primary};
    box-shadow: ${(props) => props.theme.shadow};
    padding: 1rem;
    border-radius: 0.5rem;
    text-align: center;
    display: flex;
    flex-direction: column;
    align-items: center;
    border-radius: 99px;
    & input,
    input::-webkit-file-upload-button {
        height: 100%;
        width: 100%;
        position: absolute;
        top: 0;
        right: 0;
        z-index: 99;
        cursor: pointer;
        opacity: 0;
    }
    &:hover {
        background: ${(props) =>
            getFader(props.theme.color.border.primary, 0.5)};
    }
    &:active {
        background: ${(props) => props.theme.color.border.primary};
    }
`

const UploadButton = ({ onSubmit }) => {
    const handleChange = (e) => {
        onSubmit(e.target.files[0])
    }

    return (
        <Container>
            <BsArrowBarUp size="2rem" />
            Upload
            <input type="file" onChange={handleChange} title="" accept=".pdf" />
        </Container>
    )
}

export default UploadButton

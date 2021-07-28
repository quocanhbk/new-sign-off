/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import React, { useState } from "react"
import styled from "styled-components"
import { BsArrowBarUp } from "react-icons/bs"

const Container = styled.div`
    flex: 1;
    cursor: pointer;
    background: transparent;
    position: relative;
    color: ${(props) => props.theme.color.fill.primary};
    border: 1px dashed ${(props) => props.theme.color.fill.primary};
    padding: 1rem;
    border-radius: 0.5rem;
    text-align: center;
    display: flex;
    flex-direction: column;
    align-items: center;
    & input,
    input::-webkit-file-upload-button {
        height: 100%;
        width: 100%;
        position: absolute;
        top: 0;
        right: 0;
        cursor: pointer;
        opacity: 0;
    }
    &:active {
        background: ${(props) => props.theme.color.border.primary};
    }
`

const UploadButton = ({ onSubmit, reference }) => {
    // const [dragging, setDragging] = useState(false)

    const handleChange = (e) => {
        let files = e.target.files
        onSubmit(Object.values(files).slice(0, files.length))
    }

    return (
        <Container>
            <BsArrowBarUp size="2rem" />
            Click to choose or drop file here
            <input
                type="file"
                multiple
                onChange={handleChange}
                title=""
                accept={reference ? "" : ".pdf"}
            />
        </Container>
    )
}

export default UploadButton

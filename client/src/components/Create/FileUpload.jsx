/* eslint-disable react/prop-types */
import React from 'react';
import styled from 'styled-components'
import {IoMdAddCircleOutline} from 'react-icons/all'

const StyleWrapper = styled.div`
    position: relative;
    display : flex;
    align-items: center;
    flex-direction: column;
    flex: 1;

    padding: 1rem;

    background-color: ${props => props.theme.color.background.secondary};
    border: 1px dashed ${props => props.theme.color.border.primary};

    input[type=file] {
        color: transparent;
    }
`
const InputFile = styled.input`
    display:none;
`
const LabelFile = styled.label`
    cursor: pointer;

    & svg{
        color: ${props => props.theme.color.text.primary}
    }
`

function FileUpload({handleFile,name}) {

    return (
        <StyleWrapper>
			<InputFile type="file" id={name} accept = "application/pdf" onChange={handleFile}/>
            <LabelFile htmlFor={name} className="custom-file-upload" id={name}>
                <IoMdAddCircleOutline size="3rem"/>
            </LabelFile>			
			<p>Upload files or Drag & Drop files here</p>
		</StyleWrapper>
    );
}

export default FileUpload;
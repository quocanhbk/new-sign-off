/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import React from 'react';
import styled from 'styled-components'
import {CKEditor} from '@ckeditor/ckeditor5-react'
import ClassicEditor from '@ckeditor/ckeditor5-build-classic'

const StyleWrapper = styled.div`
    display: flex;
    flex-direction: column;
    gap: 1rem;
    & .ck-editor__editable{
        background : ${props => props.theme.color.background.primary}!important;
        min-height: 10rem;
    }
    & .ck.ck-reset_all, .ck.ck-reset_all *{
        color : ${props => props.theme.color.text.primary}!important;
        background-color: ${props => props.theme.color.background.primary}!important;
    }
    /* & .ck.ck-editor__main>.ck-editor__editable:not(.ck-focused){
        border: 1px solid ${props => props.theme.color.border.primary}!important;
    } */
    & .ck.ck-toolbar{
        border: 1px solid ${props => props.theme.color.border.primary}!important;
    }
    & .ck-content {
        border: 1px solid ${props => props.theme.color.border.primary} !important;
        word-wrap: break-word;
        word-break: break-word;
        &:focus {
            border: 1px solid ${props => props.theme.color.border.primary} !important;
        }
    }
    & ol, ul {
        margin-left: 1rem;
    }
`
const Text = styled.label` 
    font-size: 0.9rem;
    color : ${props => props.theme.color.text.secondary};
`

function DescriptionEditor({description, set}) {

    return (
        <StyleWrapper>
            {/* <Text>Use the following editor to compose description for your approval document. Please summary the purpose/reason why are you submitting this document. </Text> */}
            <CKEditor
                editor={ClassicEditor}
                data={description}
                onReady={ editor => {
                    // You can store the "editor" and use when it is needed.
                    console.log( 'Editor is ready to use!', editor );
                }}
                onChange={ ( event, editor ) => {
                    const data = editor.getData();
                    set("description", data)
                }}
                // onBlur={ ( event, editor ) => {
                //     console.log( 'Blur.', editor );
                // } }
                // onFocus={ ( event, editor ) => {
                //     console.log( 'Focus.', editor );
                // } }
            />
        </StyleWrapper>
    );
}

export default DescriptionEditor;
import React from 'react';
import styled from 'styled-components'
import {CKEditor} from '@ckeditor/ckeditor5-react'
import ClassicEditor from '@ckeditor/ckeditor5-build-classic'

const StyleWrapper = styled.div`

& .ck-editor__editable{
    background : ${props => props.theme.color.background.primary}!important;
}
& .ck.ck-reset_all, .ck.ck-reset_all *{
    color : ${props => props.theme.color.text.primary}!important;
    background-color: ${props => props.theme.color.background.primary}!important;
}
& .ck.ck-editor__main>.ck-editor__editable:not(.ck-focused){
    border: 1px solid ${props => props.theme.color.border.primary}!important;
}
& .ck.ck-toolbar{
    border: 1px solid ${props => props.theme.color.border.primary}!important;
}
`
const Text = styled.label`
    display: -webkit-box;display: -moz-box;display: -ms-flexbox;display: -webkit-flex;display: flex;flex-wrap: wrap;-webkit-flex-wrap: wrap; 

    font-size: 0.9rem;
    color : ${props => props.theme.color.text.secondary};

    padding: 0.5rem 0;
`

function DescriptionEditor() {
    return (
        <StyleWrapper>
            <Text>Use the following editor to compose description for your approvall doucument. Please summary the purpose/ reason why are you submitting this document. </Text>
            <CKEditor
                editor={ClassicEditor}
                data=""
                // onReady={ editor => {
                //     // You can store the "editor" and use when it is needed.
                //     console.log( 'Editor is ready to use!', editor );
                // } }
                // onChange={ ( event, editor ) => {
                //     const data = editor.getData();
                //     console.log( { event, editor, data } );
                // } }
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
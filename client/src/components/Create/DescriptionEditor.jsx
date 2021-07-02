/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import React from 'react';
import styled from 'styled-components'
import CustomEditor from 'ckeditor5-custom-build/build/ckeditor';
import {CKEditor} from '@ckeditor/ckeditor5-react'
import { getFader } from 'utils/color';
// import ClassicEditor from '@ckeditor/ckeditor5-build-classic'
const StyleWrapper = styled.div`
    display: flex;
    flex-direction: column;
    gap: 1rem;

    & .ck-content {
        border: 1px solid ${props => props.theme.color.border.primary} !important;
        background: transparent !important;
        word-wrap: break-word;
        word-break: break-word;
        min-height: 10rem;
        &:focus {
            border: 1px solid ${props => props.theme.color.border.primary} !important;
        }
    }
    & .ck-toolbar__separator {
        background: ${props => props.theme.color.border.primary} !important;
    }

    //BUTTON
    & .ck.ck-button {
        /* background: ${props => props.theme.color.background.primary} !important; */
        color: ${props => props.theme.color.text.primary};
        &:hover {
            background: ${props => props.theme.color.border.primary} !important;
        }
        &:active {
            background: ${props => props.theme.color.border.primary} !important;
        }
        cursor: pointer;
    }
    & .ck.ck-button.ck-on {
        background: ${props => props.theme.color.border.primary};
        &:hover {
            background: ${props => props.theme.color.border.primary};
        }
    }
    & .ck-splitbutton__action, .ck-splitbutton__arrow {
        background: ${props => props.theme.color.background.primary} !important;
    }
    
    & .ck.ck-splitbutton.ck-dropdown__button{
        background: ${props => props.theme.color.background.primary} !important;
        &:hover {
            background: ${props => props.theme.color.border.primary} !important;
        }
        &:active {
            background: ${props => props.theme.color.border.primary} !important;
        }
    }
    /* & .ck.ck-dropdown.ck-list-styles-dropdown.ck-toolbar-dropdown {
        background: transparent !important;
    } */
    & .ck.ck-toolbar {
        background: ${props => props.theme.color.background.primary};
        border: 1px solid ${props => props.theme.color.border.primary};
    }
    & .ck-toolbar__items, .ck-color-table, .ck-dropdown__panel, .ck-list {
        background: ${props => props.theme.color.background.primary};
    }
    & .ck-color-table__remove-color {
        border-bottom: 1px solid ${props => props.theme.color.border.primary} !important;
    }
    & .ck-dropdown__panel {
        border: 1px solid ${props => props.theme.color.border.primary} !important;
    }
    & .ck-fontsize-option {
        color: ${props => props.theme.color.text.primary} !important;
        &:hover {
            background: ${props => getFader(props.theme.color.border.primary, 0.5)} !important;
        }
    }
    & ol, ul {
        margin-left: 1rem;
    }
`
function DescriptionEditor({description, set}) {

    return (
        <StyleWrapper className="description-editor">
            {/* <Text>Use the following editor to compose description for your approval document. Please summary the purpose/reason why are you submitting this document. </Text> */}
            <CKEditor
                editor={CustomEditor}
                config={{
                    toolbar: {
                        items: [
                            'heading',
                            '|',
                            'bold',
                            'italic',
                            'underline',
                            '|',
                            'alignment',
                            '|',
                            'numberedList',
                            'bulletedList',
                            '|',
                            'fontColor',
                            'fontBackgroundColor',
                            'fontSize',
                            '|',
                            'insertTable',
                            '|',
                            'undo'
                        ]
                    },
                    table: {
                        contentToolbar: [
                            'tableColumn',
                            'tableRow',
                            'mergeTableCells',
                            'tableCellProperties',
                            'tableProperties'
                        ]
                    },
                    disableNativeSpellChecker: true
                }}
                data={description}
                onChange={(_, editor) => {
                    set("description", editor.getData())
                }}
            />
        </StyleWrapper>
    );
}

export default DescriptionEditor;
import React from 'react'
import styled from 'styled-components'
import CustomEditor from 'ckeditor5-custom-build/build/ckeditor';
import {CKEditor} from '@ckeditor/ckeditor5-react'
const Container = styled.div`
	background-color: red;
`

const Playground = () => {
    return (
        <Container>
            <p>What the hell</p>
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
                            'link',
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
                data={"<h1>Noice</h1>"}
                onChange={(_, editor) => {
                    console.log("description", editor.getData())
                }}
                onError={(a, b) => console.log(a, b)}
            />
        </Container>
    )
}

export default Playground
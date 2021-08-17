import styled from "styled-components"
import CustomEditor from "ckeditor5-custom-build/build/ckeditor"
import { CKEditor } from "@ckeditor/ckeditor5-react"
const StyleWrapper = styled.div`
    display: flex;
    flex-direction: column;
    overflow: overlay;
    & > * + * {
        margin-top: 1rem;
    }

    & .ck-content {
        border: 1px solid #ccc !important;
        background: transparent !important;
        word-wrap: break-word;
        word-break: break-word;
        min-height: 10rem;
    }
    .ck.ck-editor__editable_inline > :first-child {
        margin-top: 0.5rem;
    }
    .ck.ck-editor__top.ck-reset_all {
        display: none;
    }
    & ol,
    ul {
        margin-left: 1rem;
    }
`
function DescriptionEditor({ description }) {
    let config = {}

    return (
        <StyleWrapper className="description-editor">
            {/* <Text>Use the following editor to compose description for your approval document. Please summary the purpose/reason why are you submitting this document. </Text> */}
            <CKEditor
                editor={CustomEditor}
                config={config}
                data={description}
                onReady={e => {
                    if (e) e.isReadOnly = true
                }}
            />
        </StyleWrapper>
    )
}

export default DescriptionEditor

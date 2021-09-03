import CustomEditor from "ckeditor5-custom-build/build/ckeditor"
import { CKEditor } from "@ckeditor/ckeditor5-react"
import { IRequestInput } from "api/request"
import { Flex } from "@chakra-ui/react"
import { memo } from "react"

interface DescriptionEditorProps {
    description: string
    setValue?: (key: keyof Omit<IRequestInput, "status">, value: any) => void
    readOnly?: boolean
}

const DescriptionEditor = ({ description, setValue, readOnly }: DescriptionEditorProps) => {
    let config = readOnly
        ? {}
        : {
              toolbar: {
                  items: [
                      "heading",
                      "|",
                      "bold",
                      "italic",
                      "underline",
                      "|",
                      "alignment",
                      "|",
                      "numberedList",
                      "bulletedList",
                      "|",
                      "fontColor",
                      "fontBackgroundColor",
                      "|",
                      "insertTable",
                      "|",
                      "undo",
                  ],
              },
              table: {
                  contentToolbar: [
                      "tableColumn",
                      "tableRow",
                      "mergeTableCells",
                      "tableCellProperties",
                      "tableProperties",
                  ],
              },
              disableNativeSpellChecker: true,
          }

    return (
        <Flex direction="column">
            {/* <Text>Use the following editor to compose description for your approval document. Please summary the purpose/reason why are you submitting this document. </Text> */}
            <CKEditor
                editor={CustomEditor}
                config={config}
                data={description}
                onChange={(_, editor) => {
                    if (!readOnly && setValue) setValue("description", editor.getData())
                }}
                onReady={e => {
                    if (e) e.isReadOnly = readOnly
                }}
            />
        </Flex>
    )
}

export default memo(DescriptionEditor)

// * DESCRIPTION: Entry point for formView

import FormView from "./FormView"
import useFormData, { UseFormDataProps } from "./useFormData"

interface IndexProps extends UseFormDataProps {
    addable?: boolean
    isSaving?: boolean
}

const Index = ({ attachment, onSave, addable, isSaving }: IndexProps) => {
    const { addingTag, fields, file, formName, formUtils, setAddingTag } = useFormData({ attachment, onSave })
    return (
        <FormView
            addingTag={addingTag}
            setAddingTag={setAddingTag}
            formUtils={formUtils}
            values={{
                name: formName,
                fields,
                file,
            }}
            addable={addable}
            isSaving={isSaving}
        />
    )
}

export default Index

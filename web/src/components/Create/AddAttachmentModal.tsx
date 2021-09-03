import { IForm } from "api/form"
import { AttachmentUploader, ChakraModal } from "components/Base"

interface AddAttachmentModalProps {
    isOpen: boolean
    onClose: () => void
    checklistItemName: string
    onAddAttachmentFiles: (files: File[]) => void
    onAddAttachmentForms: (form: IForm) => void
}

const AddAttachmentModal = ({
    onAddAttachmentFiles,
    onAddAttachmentForms,
    checklistItemName,
    isOpen,
    onClose,
}: AddAttachmentModalProps) => {
    return (
        <ChakraModal isOpen={isOpen} onClose={onClose} title={`Add attachment to ${checklistItemName}`} size="2xl">
            <AttachmentUploader
                type="approvalAttachments"
                handleFiles={onAddAttachmentFiles}
                handleForm={onAddAttachmentForms}
            />
        </ChakraModal>
    )
}

export default AddAttachmentModal

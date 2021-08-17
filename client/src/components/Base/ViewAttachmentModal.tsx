// * DESCRIPTION: Modal that show preview of attachment (if PDF), also you can change name, and other attachment properties...

import { IAttachmentInput, IField } from "api"
import { ChakraModal, FormView } from "components/Base"

interface ViewAttachmentModalProps {
    isOpen: boolean
    onClose: () => void
    attachmentType?: "approvalAttachments" | "referenceAttachments"
    attachment?: IAttachmentInput
    onUpdateAttachment?: (name: string, fields: IField[]) => void
}

const ViewAttachmentModal = ({
    isOpen,
    onClose,
    attachmentType,
    attachment,
    onUpdateAttachment,
}: ViewAttachmentModalProps) => {
    return (
        <ChakraModal isOpen={isOpen} onClose={onClose} size="6xl">
            {attachmentType && attachment && onUpdateAttachment ? (
                <FormView
                    attachmentType={attachmentType}
                    attachment={attachment}
                    onUpdateAttachment={onUpdateAttachment}
                />
            ) : null}
        </ChakraModal>
    )
}

export default ViewAttachmentModal

import AttachmentTablePC from "./AttachmentTablePC"
import { AttachmentUploader } from "components/Base"
import { IForm } from "api/form"
import { IRequestInput } from "api/request"
import { Flex, Text } from "@chakra-ui/react"
import { Id } from "types"

interface AttachmentBoardProps {
    type: "approvalAttachments" | "referenceAttachments"
    attachments: IRequestInput["approvalAttachments"]
    onRemoveAttachment: (id: Id) => void
    onEditAttachment: (id: Id) => void
    changeFieldContent: (attachmentId: Id, fieldId: Id, value: string) => void
    onAddAttachmentFiles: (files: File[]) => void
    onAddAttachmentForms: (form: IForm) => void
}

const AttachmentBoard = ({
    type,
    attachments,
    onRemoveAttachment,
    onEditAttachment,
    changeFieldContent,
    onAddAttachmentFiles,
    onAddAttachmentForms,
}: AttachmentBoardProps) => {
    return (
        <Flex direction="column">
            <Text color="text.secondary" fontSize="sm" mb={2}>
                The flexible approval may not follow the operational procedures, approval participants are responsible
                for the completeness of attached documents.
            </Text>
            <AttachmentUploader type={type} handleFiles={onAddAttachmentFiles} handleForm={onAddAttachmentForms} />
            {attachments.length > 0 && (
                <AttachmentTablePC
                    attachments={attachments}
                    onRemoveAttachment={onRemoveAttachment}
                    changeFieldContent={changeFieldContent}
                    onEditAttachment={onEditAttachment}
                />
            )}
        </Flex>
    )
}

export default AttachmentBoard

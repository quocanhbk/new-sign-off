import { useState } from "react"
import { Flex, Button } from "@chakra-ui/react"
import { FormControl, FileUpload, Select } from "components/Base"
import { useMutation, useQuery } from "react-query"
import { getFormDetail, getForms, IForm } from "api"
import { Id } from "types"

interface AttachmentUploaderProps {
    type: "referenceAttachments" | "approvalAttachments"
    handleFiles: (files: File[]) => void
    handleForm: (form: IForm) => void
}

const AttachmentUploader = ({ type, handleFiles, handleForm }: AttachmentUploaderProps) => {
    const [selectedForm, setSelectedForm] = useState<Id | null>(null)
    const { data: forms, isLoading: formLoading } = useQuery("forms", () => getForms(), {
        initialData: [],
    })
    const { mutateAsync, isLoading: isGettingForm } = useMutation(getFormDetail)
    const handleApplyForm = async () => {
        if (!selectedForm) return
        let formDetail = await mutateAsync(selectedForm)
        handleForm(formDetail)
        setSelectedForm(null)
    }
    return (
        <Flex>
            <Flex direction="column" flex={1} mr={4}>
                <FormControl label={`Upload from computer ${type === "referenceAttachments" ? "" : "(PDF)"}`}>
                    <FileUpload onSubmit={handleFiles} acceptExt={type === "referenceAttachments" ? "" : ".pdf"} />
                </FormControl>
            </Flex>
            <Flex direction="column" flex={1}>
                {forms && !formLoading && (
                    <FormControl label="Select from database" pl={4} borderLeft="1px" borderColor="gray.200">
                        <Select
                            selection={forms}
                            value={forms.find(form => form.id === selectedForm)}
                            displayField={"name"}
                            onSelect={newValue => setSelectedForm(newValue.id || null)}
                        />
                        <Button onClick={handleApplyForm} w="full" mt={2} variant="solid" isLoading={isGettingForm}>
                            Apply
                        </Button>
                    </FormControl>
                )}
            </Flex>
        </Flex>
    )
}

export default AttachmentUploader

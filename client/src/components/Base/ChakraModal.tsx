import { ComponentProps, FC } from "react"
import { Modal, ModalOverlay, ModalHeader, ModalBody, ModalContent } from "@chakra-ui/react"
interface AddUnitMalProps {
    title?: string
    isOpen: boolean
    onClose: () => void
    children: JSX.Element | JSX.Element[] | null | undefined
    size?: ComponentProps<typeof Modal>["size"]
}

const AddUnitMal: FC<AddUnitMalProps> = ({ title, isOpen, onClose, children, size }) => {
    return (
        <Modal isOpen={isOpen} onClose={onClose} size={size} isCentered scrollBehavior="inside">
            <ModalOverlay />
            <ModalContent bg="white" overflow="visible">
                {title && (
                    <ModalHeader fontSize="lg" bg="gray.50" borderTopRadius="md" shadow="base" mb={2}>
                        {title}
                    </ModalHeader>
                )}
                <ModalBody>{children}</ModalBody>
            </ModalContent>
        </Modal>
    )
}

export default AddUnitMal

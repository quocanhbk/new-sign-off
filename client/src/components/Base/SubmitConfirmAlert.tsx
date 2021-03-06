// * DESCRIPTION: this is a modal that confirm when you submit request, form, or procedure

import {
    AlertDialog,
    AlertDialogOverlay,
    AlertDialogContent,
    AlertDialogHeader,
    AlertDialogBody,
    AlertDialogFooter,
    Button,
    AlertDialogCloseButton,
} from "@chakra-ui/react"
import { RefObject, useRef } from "react"

interface SubmitConfirmAlertProps {
    isOpen: boolean
    onClose: () => void
    onConfirm: () => void
    title: string
    description?: string | JSX.Element
    cancelText?: string
    confirmText?: string
    color?: string
    leastDestructiveRef?: RefObject<any>
    isLoading?: boolean
}

const SubmitConfirmAlert = ({
    isOpen,
    onClose,
    onConfirm,
    title,
    description = "Are you sure? You can't undo this action afterwards.",
    cancelText = "Cancel",
    confirmText = "Confirm",
    color = "main",
    leastDestructiveRef,
    isLoading,
}: SubmitConfirmAlertProps) => {
    const cancelRef = useRef<HTMLButtonElement>(null)
    return (
        <AlertDialog isOpen={isOpen} onClose={onClose} leastDestructiveRef={leastDestructiveRef || cancelRef}>
            <AlertDialogOverlay>
                <AlertDialogContent>
                    <AlertDialogHeader fontSize="lg" fontWeight="semibold">
                        {title}
                    </AlertDialogHeader>
                    <AlertDialogCloseButton onClick={onClose} />
                    <AlertDialogBody>{description}</AlertDialogBody>

                    <AlertDialogFooter>
                        <Button ref={cancelRef} variant="ghost" colorScheme={color} onClick={onClose}>
                            {cancelText}
                        </Button>
                        <Button colorScheme={color} onClick={onConfirm} ml={3} isLoading={isLoading}>
                            {confirmText}
                        </Button>
                    </AlertDialogFooter>
                </AlertDialogContent>
            </AlertDialogOverlay>
        </AlertDialog>
    )
}

export default SubmitConfirmAlert

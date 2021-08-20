// * DESCRIPTION: Prompt user before cancel request

import { Input } from "@chakra-ui/react"
import { FormControl, SubmitConfirmAlert } from "components/Base"
import { useRef } from "react"
import { useRequestContext } from "./RequestProvider"

const CancelPopup = () => {
    const {
        popup,
        setPopup,
        request,
        mutator: { cancelRequest, deleteRequest },
    } = useRequestContext()
    const req = request!
    const inputRef = useRef<HTMLInputElement>(null)
    return (
        <>
            <SubmitConfirmAlert
                isOpen={popup === "cancel"}
                onClose={() => setPopup(null)}
                title={`Cancel ${req.title}`}
                description={
                    <FormControl label="Reason">
                        <Input ref={inputRef} />
                    </FormControl>
                }
                onConfirm={() => cancelRequest(inputRef.current?.value || "")}
                leastDestructiveRef={inputRef}
                color="red"
            />
            <SubmitConfirmAlert
                isOpen={popup === "delete"}
                onClose={() => setPopup(null)}
                title={`Delete ${req.title}`}
                description="Are you sure? You can't undo this action afterwards."
                onConfirm={() => deleteRequest()}
                color="red"
            />
        </>
    )
}

export default CancelPopup

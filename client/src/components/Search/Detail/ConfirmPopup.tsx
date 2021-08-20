import { useRef } from "react"
import FormControl from "components/Base/FormControl"
import { useRequestContext } from "./RequestProvider"
import { SubmitConfirmAlert } from "components/Base"
import { Textarea } from "@chakra-ui/react"

const ConfirmPopup = () => {
    // const inputRef = useFocus()
    const genTitle = (decision?: string) => {
        return !decision
            ? ""
            : decision === "REJECT"
            ? "Are you sure to reject this request ?"
            : "Are you sure to approve this request?"
    }
    const genFormTitle = (decision?: string) => {
        return !decision ? "" : decision === "APPROVE_WITH_OPINION" ? "Opinion" : "Comment"
    }
    const genDefaultText = (decision?: string) => {
        return !decision
            ? ""
            : decision === "REJECT"
            ? "I rejected because"
            : decision === "APPROVE_WITH_OPINION"
            ? "I have another opinion, which is"
            : "I agree"
    }
    const genColor = (decision?: string) => {
        return !decision ? "main" : decision === "APPROVE" ? "green" : decision === "REJECT" ? "red" : "yellow"
    }
    const {
        confirmPopup,
        setConfirmPopup,
        mutator: { approveRequest },
    } = useRequestContext()
    const inputRef = useRef<HTMLTextAreaElement>(null)
    return (
        <SubmitConfirmAlert
            isOpen={!!confirmPopup}
            onClose={() => setConfirmPopup(null)}
            title={genTitle(confirmPopup?.code)}
            description={
                <FormControl label={genFormTitle(confirmPopup?.code)}>
                    <Textarea resize="none" ref={inputRef} defaultValue={genDefaultText(confirmPopup?.code)} />
                </FormControl>
            }
            leastDestructiveRef={inputRef}
            color={genColor(confirmPopup?.code)}
            onConfirm={() => approveRequest({ ...confirmPopup!, comment: inputRef.current?.value || "" })}
        />
    )
}

export default ConfirmPopup

import { Flex } from "@chakra-ui/react"
// import { IRequest } from "api"
import { useRequestContext } from "../RequestProvider"
import FlowSection from "./FlowSection"

const ApprovalFlow = () => {
    const {
        request,
        mutator: { remindApprove },
    } = useRequestContext()

    return request ? (
        <Flex direction="column" align="center" flex={1}>
            <table style={{ borderCollapse: "collapse" }}>
                <tbody>
                    <FlowSection
                        headline="Submitter"
                        data={request.submitter}
                        type="submitter"
                        requestStatus={request.status}
                    />
                    {request.advisors && request.advisors.length > 0 && (
                        <FlowSection
                            headline="Advisors"
                            data={request.advisors}
                            type="advisor"
                            currentApprover={request.currentApprover}
                            remindApprover={remindApprove}
                        />
                    )}
                    <FlowSection
                        headline="Approvers"
                        data={request.approvers}
                        type="approver"
                        currentApprover={request.currentApprover}
                        remindApprover={remindApprove}
                    />
                    {request.observators.length > 0 && (
                        <FlowSection headline="Observators" data={request.observators} type="observator" />
                    )}
                </tbody>
            </table>
        </Flex>
    ) : null
}

export default ApprovalFlow

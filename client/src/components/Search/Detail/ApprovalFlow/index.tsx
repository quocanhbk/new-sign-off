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
                        requestStatus={request.status}
                        noApprover={request.advisors.length === 0 && request.approvers.length === 0}
                    />
                    {request.advisors && request.advisors.length > 0 && (
                        <FlowSection
                            headline="Advisors"
                            data={request.advisors}
                            currentApprover={request.currentApprover}
                            remindApprover={remindApprove}
                        />
                    )}
                    {request.approvers && request.approvers.length > 0 && (
                        <FlowSection
                            headline="Approvers"
                            data={request.approvers}
                            currentApprover={request.currentApprover}
                            remindApprover={remindApprove}
                        />
                    )}
                    {request.observators.length > 0 && (
                        <FlowSection
                            headline="Observators"
                            data={request.observators.map((obs, idx) => ({
                                id: obs.userId,
                                order: idx,
                                decision: "",
                                userId: obs.userId,
                                email: obs.email,
                                fullname: obs.fullname,
                            }))}
                        />
                    )}
                </tbody>
            </table>
        </Flex>
    ) : null
}

export default ApprovalFlow

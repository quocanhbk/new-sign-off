/* eslint-disable react/prop-types */
import React from "react"
import styled from "styled-components"
import { getFader } from "utils/color"
import FlowSection from "./FlowSection"

const Container = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    flex: 1;
    padding: 1rem;
    & > * + * {
        margin-top: 1rem;
    }
    height: 100%;
    overflow: auto;

    ::-webkit-scrollbar {
        width: 0.5rem;
    }
    ::-webkit-scrollbar-track {
        background: transparent;
    }
    ::-webkit-scrollbar-thumb {
        background: ${(props) =>
            getFader(props.theme.color.fill.secondary, 0.5)};
        border-radius: 99px;
    }
    ::-webkit-scrollbar-thumb:hover {
        background: ${(props) => props.theme.color.fill.secondary};
    }
    & table {
        border-collapse: collapse;
    }
`

const ApprovalFlow = ({
    submitter,
    advisors,
    approvers,
    observators,
    currentApprover,
    remindApprover,
    requestStatus,
}) => {
    return (
        <Container>
            <table>
                <tbody>
                    <FlowSection
                        headline="Submitter"
                        data={submitter}
                        type="submitter"
                        requestStatus={requestStatus}
                    />
                    {advisors && advisors.length > 0 && (
                        <FlowSection
                            headline="Advisors"
                            data={advisors}
                            type="advisor"
                            currentApprover={currentApprover}
                            remindApprover={remindApprover}
                        />
                    )}
                    <FlowSection
                        headline="Approvers"
                        data={approvers}
                        type="approver"
                        currentApprover={currentApprover}
                        remindApprover={remindApprover}
                    />
                    {observators.length > 0 && (
                        <FlowSection
                            headline="Observators"
                            data={observators}
                            type="observator"
                        />
                    )}
                </tbody>
            </table>
        </Container>
    )
}

export default ApprovalFlow

/* eslint-disable react/prop-types */
import React from "react"
import format from "date-fns/format"
import { getFader } from "utils/color"
import styled from "styled-components"
import SectionContainer from "components/SectionContainer"
import InfoLine from "./InfoLine"
import { projectList } from "constant"

const Container = styled.div`
    display: flex;
    flex-direction: column;
    padding: 1rem;
    overflow: overlay;
    position: relative;
    & > * + * {
        margin-top: 1rem;
    }
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
`
const LineContainer = styled.table`
    width: 100%;
    table-layout: fixed;
`

const ApprovalInfo = ({ request }) => {
    const lastApprover = request.approvers[request.approvers.length - 1] ? request.approvers[request.approvers.length - 1]  : {};
    return (
        <Container>
            <SectionContainer headline="Document">
                <LineContainer>
                    <tbody>
                        <InfoLine
                            headline={"Document Id"}
                            content={request.id}
                        />
                        <InfoLine
                            headline={"Priority"}
                            content={request.priority}
                        />
                        <InfoLine
                            headline={"Deadline"}
                            content={format(
                                request.deadline,
                                "HH:mm dd/MM/yyyy"
                            )}
                        />
                        <InfoLine
                            headline={"Related project"}
                            content={request.relatedProjects
                                .map(
                                    (i) =>
                                        projectList.find((p) => p.id === i).text
                                )
                                .join(", ")}
                        />
                        <InfoLine
                            headline={"Number of approval file"}
                            content={request.approvalAttachments.length}
                        />
                        <InfoLine
                            headline={"Final approval by"}
                            content={lastApprover.fullname}
                        />
                        <InfoLine
                            headline={"Final approval at"}
                            content={
                                lastApprover.decisionTimestamp
                                    ? format(
                                          new Date(
                                              lastApprover.decisionTimestamp
                                          ),
                                          "HH:mm dd/MM/yyyy"
                                      )
                                    : "N/A"
                            }
                        />
                    </tbody>
                </LineContainer>
            </SectionContainer>
            <SectionContainer headline="Creator">
                <LineContainer>
                    <tbody>
                        <InfoLine
                            headline={"Name"}
                            content={request.submitter[0].fullname}
                        />
                        <InfoLine
                            headline={"Email"}
                            content={request.submitter[0].email}
                        />
                        <InfoLine
                            headline={"Created"}
                            content={format(
                                request.createdAt,
                                "HH:mm dd/MM/yyyy"
                            )}
                        />
                    </tbody>
                </LineContainer>
            </SectionContainer>
            <SectionContainer headline="Log">
                <LineContainer>
                    <tbody>
                        {request.logs
                            .filter((log) => log.type !== "Comment")
                            .map((log) => (
                                <InfoLine
                                    key={log.id}
                                    span
                                    headline={`${log.author.name} ${
                                        log.description
                                    } at ${format(
                                        new Date(log.createdAt),
                                        "HH:mm dd/MM/yyyy"
                                    )}`}
                                />
                            ))}
                    </tbody>
                </LineContainer>
            </SectionContainer>
        </Container>
    )
}

export default ApprovalInfo

/* eslint-disable react/prop-types */
import React from "react"
import styled from "styled-components"
import { getFader } from "utils/color"
import EventComments from "./EventComments"
import SectionContainer from "components/SectionContainer"
import AttachmentTable from "components/Create/AttachmentTable"
import Nothing from "./Nothing"
import AttachmentCheckList from "components/Create/AttachmentChecklist"
import Button from "components/Base/Button"
import { projectList } from "constant"
import { downloadForm2 } from "api/file"
import DescriptionEditor from "components/Create/DescriptionEditor"
const ContentWrapper = styled.div`
    display: flex;
    flex-direction: column;
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
`
const ProjectContainer = styled.div`
    display: flex;
    flex-wrap: wrap;
    & > * + * {
        margin-left: 0.5rem;
    }
    & > * {
        margin-top: 0.5rem;
    }
`
const Content = ({ request, logs, setLogs, setEditingAttachment }) => {
    return (
        <ContentWrapper>
            <SectionContainer headline="1. Related Project">
                <ProjectContainer>
                    {request.relatedProjects.map((project) => (
                        <Button
                            readOnly
                            padding="0.2rem 0.4rem"
                            key={project}
                            weight="400"
                        >
                            {projectList.find((p) => p.id === project).text}
                        </Button>
                    ))}
                </ProjectContainer>
            </SectionContainer>
            <SectionContainer headline="2. Description">
                {request.description ? (
                    // <div dangerouslySetInnerHTML={{__html: request.description}}></div> :
                    <DescriptionEditor
                        description={request.description}
                        readOnly
                    />
                ) : (
                    <Nothing type="DESCRIPTION" />
                )}
            </SectionContainer>
            <SectionContainer headline="3. Approval File">
                {request.approvalAttachments.length > 0 ? (
                    request.type === "Procedure" ? (
                        <AttachmentCheckList
                            attachments={request.approvalAttachments}
                            checklist={request.checklist}
                            readOnly={true}
                            onEditAttachment={(attachmentId) =>
                                setEditingAttachment({
                                    type: "approval",
                                    id: attachmentId,
                                })
                            }
                            downloadAttachment={(name, file, fields) =>
                                downloadForm2(
                                    name,
                                    file,
                                    fields,
                                    request.status === "Approved",
                                    request.id
                                )
                            }
                        />
                    ) : (
                        <AttachmentTable
                            attachments={request.approvalAttachments}
                            readOnly={true}
                            onEditAttachment={(attachmentId) =>
                                setEditingAttachment({
                                    type: "approval",
                                    id: attachmentId,
                                })
                            }
                            downloadAttachment={(name, file, fields) =>
                                downloadForm2(
                                    name,
                                    file,
                                    fields,
                                    request.status === "Approved",
                                    request.id
                                )
                            }
                        />
                    )
                ) : (
                    <Nothing type="FILE" />
                )}
            </SectionContainer>
            <SectionContainer headline="4. Reference File">
                {request.referenceAttachments.length > 0 ? (
                    <AttachmentTable
                        attachments={request.referenceAttachments}
                        readOnly={true}
                        onEditAttachment={(attachmentId) =>
                            setEditingAttachment({
                                type: "reference",
                                id: attachmentId,
                            })
                        }
                    />
                ) : (
                    <Nothing type="FILE" />
                )}
            </SectionContainer>
            <SectionContainer headline={"5. Event & Comments"}>
                <EventComments
                    logs={logs}
                    lastApproverId={
                        request.approvers[request.approvers.length - 1] ? request.approvers[request.approvers.length - 1].userId : 'N/A'
                    }
                    setLogs={setLogs}
                    requestId={request.id}
                />
            </SectionContainer>
        </ContentWrapper>
    )
}

export default Content

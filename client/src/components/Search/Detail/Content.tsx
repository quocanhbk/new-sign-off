import styled from "styled-components"
import { getFader } from "utils/color"
import EventComments from "./EventComments"
import AttachmentTable from "components/Create/AttachmentTable"
import Nothing from "./Nothing"
import AttachmentChecklist from "components/Create/AttachmentChecklist"
import { projectList } from "constant"
import { downloadForm2 } from "api/file"
import { DescriptionEditor, SectionContainer } from "components/Base"
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
        background: ${props => getFader(props.theme.color.fill.secondary, 0.5)};
        border-radius: 99px;
    }
    ::-webkit-scrollbar-thumb:hover {
        background: ${props => props.theme.color.fill.secondary};
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
            <SectionContainer title="1. Related Project">
                <ProjectContainer>
                    {request.relatedProjects.map(project => (
                        <div key={project}>{projectList.find(p => p.id === project)!.text}</div>
                    ))}
                </ProjectContainer>
            </SectionContainer>
            <SectionContainer title="2. Description">
                {request.description ? (
                    // <div dangerouslySetInnerHTML={{__html: request.description}}></div> :
                    <DescriptionEditor description={request.description} readOnly />
                ) : (
                    <Nothing type="DESCRIPTION" />
                )}
            </SectionContainer>
            <SectionContainer title="3. Approval File">
                {request.approvalAttachments.length > 0 ? (
                    request.type === "Procedure" ? (
                        <AttachmentChecklist
                            attachments={request.approvalAttachments}
                            checklist={request.checklist}
                            readOnly={true}
                            onEditAttachment={attachmentId =>
                                setEditingAttachment({
                                    type: "approval",
                                    id: attachmentId,
                                })
                            }
                            downloadAttachment={(name, file, fields) =>
                                downloadForm2({ name, file: file, fields, requestId: request.id })
                            }
                        />
                    ) : (
                        <AttachmentTable
                            attachments={request.approvalAttachments}
                            readOnly={true}
                            onEditAttachment={attachmentId =>
                                setEditingAttachment({
                                    type: "approval",
                                    id: attachmentId,
                                })
                            }
                            downloadAttachment={(name, file, fields) =>
                                downloadForm2({ name, file: file, fields, requestId: request.id })
                            }
                        />
                    )
                ) : (
                    <Nothing type="FILE" />
                )}
            </SectionContainer>
            <SectionContainer title="4. Reference File">
                {request.referenceAttachments.length > 0 ? (
                    <AttachmentTable
                        attachments={request.referenceAttachments}
                        readOnly={true}
                        onEditAttachment={attachmentId =>
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
            <SectionContainer title={"5. Event & Comments"}>
                <EventComments
                    logs={logs}
                    lastApproverId={request.approvers[request.approvers.length - 1].userId}
                    setLogs={setLogs}
                    requestId={request.id}
                />
            </SectionContainer>
        </ContentWrapper>
    )
}

export default Content

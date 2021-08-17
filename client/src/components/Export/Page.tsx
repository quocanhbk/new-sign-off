/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import { FC, useEffect, useState } from "react"
import styled from "styled-components"
import { getRequestDetail, IRequest } from "api/request"
import { format } from "date-fns"
import QRCode from "qrcode"
import baseURL from "api/baseURL"
import Title from "./Title"
import { projectList } from "constant"
import DescriptionEditor from "./DescriptionEditor"
import AttachmentCheckList from "./AttachmentChecklist"
import AttachmentTable from "./AttachmentTable"
import { RouteComponentProps } from "@reach/router"

const Container = styled.div`
    & .table.ck-widget.ck-widget_with-selection-handle {
        pointer-events: none;
    }
    & .ck.ck-widget__selection-handle {
        display: none;
    }
    & .ck.ck-reset_all.ck-widget__type-around {
        display: none;
    }
`

const Section = styled.section`
    margin-top: 0.5rem;
    margin-bottom: 0.5rem;
`

const SectionHeader = styled.h4`
    margin: 1rem 0 0.5rem 0;
    font-weight: 500;
`

const FileInfo = styled.div`
    display: flex;
    align-items: center;
    flex-wrap: wrap;
`

const FileInfoItem = styled.div`
    padding: 0.4rem;
    flex-basis: 50%;
`

const LogsContainer = styled.div`
    margin-left: 1rem;
`
const LogItem = styled.li`
    margin-bottom: 0.25rem;
`
const LogType = styled.span`
    color: ${props => props.color || "#333"};
    font-weight: 500;
`

interface PageProps extends RouteComponentProps {
    id?: number
}

const Page: FC<PageProps> = ({ id }) => {
    const [request, setRequest] = useState<IRequest | null>(null)
    const [qrCode, setQRCode] = useState("")
    const getRequest = async id => {
        const request = await getRequestDetail(id)
        setRequest(request && request.status === "Approved" ? request : null)
        setQRCode(await QRCode.toDataURL(`${baseURL}/search/${id}`))
        document.title = request.title
    }
    useEffect(() => {
        if (id) getRequest(id)
    }, [id])

    const renderLog = log => {
        const genDescription = () => {
            if (log.type === "Comment")
                return (
                    <>
                        <LogType color="#666">commented: </LogType> {log.description.toLowerCase()}
                    </>
                )
            if (log.type === "Approval")
                return (
                    <>
                        <LogType color="#00ac00">approved </LogType>
                        {log.description.replace("Approved ", "").toLowerCase()}
                    </>
                )
            if (log.type === "Edit")
                return (
                    <>
                        <LogType color="#009999">edited </LogType>
                        {log.description.replace("Edited ", "").toLowerCase()}
                    </>
                )
            if (log.type === "Creation")
                return (
                    <>
                        <LogType color="#333">created </LogType>
                        {log.description.replace("Created ", "").toLowerCase()}
                    </>
                )
            else return log.description.toLowerCase()
        }
        return (
            <LogItem key={log.id}>
                <span>{log.author.name}</span> {genDescription()} at{" "}
                {format(new Date(log.createdAt), "dd/MM/yyyy hh:mm")}
            </LogItem>
        )
    }

    console.log("REQUEST", request)
    return request ? (
        <Container>
            <Title title={request.title} qrCode={qrCode} />
            <Section>
                <SectionHeader>DOCUMENT INFORMATION</SectionHeader>
                <FileInfo>
                    <FileInfoItem>Document ID: {id}</FileInfoItem>
                    <FileInfoItem>Document Type: {request.type}</FileInfoItem>
                    <FileInfoItem>Request deadline: {format(request.deadline as Date, "dd/MM/yyyy")}</FileInfoItem>
                    <FileInfoItem>Priority: {request.priority}</FileInfoItem>
                    <FileInfoItem>Creator: {request.submitter[0].fullname}</FileInfoItem>
                    <FileInfoItem>
                        Final Approver: {request.approvers[request.approvers.length - 1].fullname}
                    </FileInfoItem>
                    <FileInfoItem>Created Date: {format(request.createdAt as Date, "dd/MM/yyyy")}</FileInfoItem>
                    <FileInfoItem>Approved Date: {format(request.updatedAt as Date, "dd/MM/yyyy")}</FileInfoItem>
                </FileInfo>
            </Section>

            <Section>
                <SectionHeader>RELATED PROJECT</SectionHeader>
                <div>{request.relatedProjects.map(pid => projectList.find(p => p.id === pid)?.text).join(", ")}</div>
            </Section>
            {request.approvalAttachments.length > 0 && (
                <Section>
                    <SectionHeader>APPROVAL ATTACHMENTS</SectionHeader>
                    {request.type === "Procedure" ? (
                        <AttachmentCheckList attachments={request.approvalAttachments} checklist={request.checklist} />
                    ) : (
                        <AttachmentTable attachments={request.approvalAttachments} />
                    )}
                </Section>
            )}
            {request.description && (
                <Section>
                    <SectionHeader>DESCRIPTION</SectionHeader>
                    <DescriptionEditor description={request.description} />
                </Section>
            )}
            <Section>
                <SectionHeader>LOGS</SectionHeader>
                <LogsContainer>
                    <ul>{request.logs.map(log => renderLog(log))}</ul>
                </LogsContainer>
            </Section>
        </Container>
    ) : (
        <div>Loading</div>
    )
}
export default Page

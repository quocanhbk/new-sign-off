import { FC, useEffect, useState } from "react"
import { getRequestDetail, IRequest } from "api/request"
import { format } from "date-fns"
import QRCode from "qrcode"
import baseURL from "api/baseURL"
import Title from "./Title"
import { projectList } from "constant"
import { RouteComponentProps } from "@reach/router"
import { AttachmentChecklist, AttachmentTablePC, SectionContainer, DescriptionEditor } from "components/Base"
import { Box, chakra, Wrap } from "@chakra-ui/react"

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
                        <chakra.span fontWeight="semibold" color="#666">
                            commented:{" "}
                        </chakra.span>{" "}
                        {log.description.toLowerCase()}
                    </>
                )
            if (log.type === "Approval")
                return (
                    <>
                        <chakra.span fontWeight="semibold" color="#00ac00">
                            approved{" "}
                        </chakra.span>
                        {log.description.replace("Approved ", "").toLowerCase()}
                    </>
                )
            if (log.type === "Edit")
                return (
                    <>
                        <chakra.span fontWeight="semibold" color="#009999">
                            edited{" "}
                        </chakra.span>
                        {log.description.replace("Edited ", "").toLowerCase()}
                    </>
                )
            if (log.type === "Creation")
                return (
                    <>
                        <chakra.span fontWeight="semibold" color="#333">
                            created{" "}
                        </chakra.span>
                        {log.description.replace("Created ", "").toLowerCase()}
                    </>
                )
            else return log.description.toLowerCase()
        }
        return (
            <chakra.li mb={1} key={log.id}>
                <span>{log.author.name}</span> {genDescription()} at{" "}
                {format(new Date(log.createdAt), "dd/MM/yyyy hh:mm")}
            </chakra.li>
        )
    }

    console.log("REQUEST", request)
    return request ? (
        <Box>
            <Title title={request.title} qrCode={qrCode} />
            <SectionContainer title="Document Information">
                <Wrap align="center">
                    <Box p={1} flexBasis="45%" flexGrow={1}>
                        Document ID: {id}
                    </Box>
                    <Box p={1} flexBasis="45%" flexGrow={1}>
                        Document Type: {request.type}
                    </Box>
                    <Box p={1} flexBasis="45%" flexGrow={1}>
                        Request deadline: {format(request.deadline as Date, "dd/MM/yyyy")}
                    </Box>
                    <Box p={1} flexBasis="45%" flexGrow={1}>
                        Priority: {request.priority}
                    </Box>
                    <Box p={1} flexBasis="45%" flexGrow={1}>
                        Creator: {request.submitter[0].fullname}
                    </Box>
                    <Box p={1} flexBasis="45%" flexGrow={1}>
                        Final Approver: {request.approvers[request.approvers.length - 1].fullname}
                    </Box>
                    <Box p={1} flexBasis="45%" flexGrow={1}>
                        Created Date: {format(request.createdAt as Date, "dd/MM/yyyy")}
                    </Box>
                    <Box p={1} flexBasis="45%" flexGrow={1}>
                        Approved Date: {format(request.updatedAt as Date, "dd/MM/yyyy")}
                    </Box>
                </Wrap>
            </SectionContainer>
            <SectionContainer title="Related Projects">
                <div>{request.relatedProjects.map(pid => projectList.find(p => p.id === pid)?.text).join(", ")}</div>
            </SectionContainer>

            {request.approvalAttachments.length > 0 && (
                <SectionContainer title="Approval Attachments">
                    {request.type === "Procedure" ? (
                        <AttachmentChecklist
                            attachments={request.approvalAttachments}
                            checklist={request.checklist}
                            readOnly
                        />
                    ) : (
                        <AttachmentTablePC attachments={request.approvalAttachments} readOnly />
                    )}
                </SectionContainer>
            )}
            {request.description && (
                <SectionContainer title="Description">
                    <DescriptionEditor description={request.description} readOnly />
                </SectionContainer>
            )}
            <SectionContainer title="Logs">
                <Box ml={4}>
                    <ul>{request.logs.map(log => renderLog(log))}</ul>
                </Box>
            </SectionContainer>
        </Box>
    ) : (
        <div>Loading</div>
    )
}
export default Page

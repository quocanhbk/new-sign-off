import { Fragment } from "react"
import styled, { css } from "styled-components"
import { getFader } from "utils/color"
import Table from "../Table"
import { downloadAttachment } from "api/file"

const TableWrapper = styled.div`
    border: 1px solid ${props => props.theme.color.border.primary};

    & .header-cell {
        background: ${props => getFader(props.theme.color.border.primary, 0.5)};
    }

    ${props =>
        props.noHeader &&
        css`
            border: none;
        `}
`
const TableField = styled.table`
    width: 100%;
    background: ${props => props.theme.color.background.secondary};
    border-spacing: 0.2rem;
    font-size: 0.8rem;
    & .field-name {
        width: 30%;
        font-weight: 500;
        color: ${props => props.theme.color.text.secondary};
    }
    & .attachment-no-field {
        text-align: center;
        font-style: italic;
        color: ${props => props.theme.color.text.secondary};
    }
`
const FormField = styled.input`
    border: none;
    border-bottom: 1px solid ${props => props.theme.color.border.primary};
    padding: 0.4em;
    outline: none;
    width: 100%;
    background: none;
    font-size: 0.8rem;
    color: ${props => props.theme.color.text.primary};

    &:hover {
        background: ${props => getFader(props.theme.color.border.primary, 0.5)};
    }
    &:focus {
        border-color: ${props => props.theme.color.fill.primary};
        background: ${props => getFader(props.theme.color.border.primary, 0.5)};
    }
`

const AttachmentRow = styled.tr`
    border-bottom: 1px solid ${props => props.theme.color.border.primary};
`
const AttachmentName = styled.span`
    pointer-events: none;
    ${props =>
        props.readOnly &&
        css`
            border-bottom: 1px solid ${props => props.theme.color.fill.primary};
            color: ${props => props.theme.color.fill.primary};
            cursor: pointer;
            pointer-events: auto;

            &:hover {
                border-bottom: 1px solid ${props => props.theme.color.text.link};
                color: ${props => props.theme.color.text.link};
            }
        `}
`
const AttachmentTableMobile = ({ attachments }) => {
    const handleDownload = attachmentId => {
        const attachment = attachments.find(_ => _.id === attachmentId)
        if (attachment.file) {
            downloadAttachment({
                name: attachment.name,
                file: attachment.file,
                fields: attachment.fields,
            })
            console.log("Downloading...")
        }
    }

    return (
        <TableWrapper>
            <Table>
                <Table.Body>
                    {attachments.map(attachment => (
                        <Fragment key={attachment.id}>
                            <AttachmentRow>
                                <Table.Cell textAlign="left">
                                    <AttachmentName readOnly={true} onClick={() => handleDownload(attachment.id)}>
                                        {attachment.name}
                                    </AttachmentName>
                                </Table.Cell>
                            </AttachmentRow>
                            {attachment.fields.length > 0 && (
                                <AttachmentRow>
                                    <Table.Cell textAlign="left">
                                        <TableField>
                                            <tbody>
                                                {attachment.fields.map(field => (
                                                    <tr key={field.id}>
                                                        <td className="field-name">{field.name + ":"}</td>
                                                        <td>
                                                            <FormField
                                                                value={field.content}
                                                                readOnly={true}
                                                                spellCheck="false"
                                                            />
                                                        </td>
                                                    </tr>
                                                ))}
                                            </tbody>
                                        </TableField>
                                    </Table.Cell>
                                </AttachmentRow>
                            )}
                        </Fragment>
                    ))}
                </Table.Body>
            </Table>
        </TableWrapper>
    )
}

export default AttachmentTableMobile

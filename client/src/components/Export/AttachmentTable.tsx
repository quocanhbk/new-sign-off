/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import styled, { css } from "styled-components"
import { getFader } from "utils/color"
import Table from "../Table"

const TableWrapper = styled.div`
    border: 1px solid #ccc;

    & .header-cell {
        color: black;
        background: #eee;
        border-bottom: 1px solid #ccc;
    }

    ${props =>
        props.noHeader &&
        css`
            border: none;
        `}
`
const TableField = styled.table`
    width: 100%;
    border-left: 1px solid #aaa;
    border-right: 1px solid #aaa;
    border-spacing: 0.5rem;
    background: #eee;
    & .field-name {
        width: 40%;
        font-weight: 500;
        color: black;
    }
    & .attachment-no-field {
        text-align: center;
        font-style: italic;
        color: black;
    }
`
const FormField = styled.input`
    border: none;
    border-bottom: 1px solid #999;
    padding: 0.4em;
    outline: none;
    width: 100%;
    background: none;
    color: black;

    &:hover {
        background: ${props => getFader(props.theme.color.border.primary, 0.5)};
    }
    &:focus {
        border-color: ${props => props.theme.color.fill.primary};
        background: ${props => getFader(props.theme.color.border.primary, 0.5)};
    }
`
const AttachmentRow = styled.tr`
    border-bottom: 1px solid #ccc;
`
interface AttachmentTableProps {
    attachments?
    noHeader?
}

const AttachmentTable = ({ attachments, noHeader }: AttachmentTableProps) => {
    return (
        <TableWrapper noHeader={noHeader}>
            <Table>
                {!noHeader && (
                    <Table.Header>
                        <Table.Row className="header-row">
                            <Table.HeaderCell className="header-cell" textAlign="left" width="35%">
                                File Name
                            </Table.HeaderCell>
                            <Table.HeaderCell className="header-cell" textAlign="center">
                                Data Field
                            </Table.HeaderCell>
                        </Table.Row>
                    </Table.Header>
                )}
                <Table.Body>
                    {attachments.map(attachment => (
                        <AttachmentRow key={attachment.id}>
                            <Table.Cell textAlign="left" width="35%">
                                <p>{attachment.name}</p>
                            </Table.Cell>
                            <Table.Cell textAlign="left">
                                <TableField>
                                    <tbody>
                                        {attachment.fields.length > 0 ? (
                                            attachment.fields.map(field => (
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
                                            ))
                                        ) : (
                                            <tr>
                                                <td className="attachment-no-field" colSpan={3}>
                                                    No fields
                                                </td>
                                            </tr>
                                        )}
                                    </tbody>
                                </TableField>
                            </Table.Cell>
                        </AttachmentRow>
                    ))}
                </Table.Body>
            </Table>
        </TableWrapper>
    )
}

export default AttachmentTable

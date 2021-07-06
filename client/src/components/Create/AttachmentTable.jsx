/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import React from "react";
import styled, { css } from "styled-components";
import { getFader } from "utils/color";
import Table from "../Table";
import {BsTrash, BsThreeDotsVertical, BsDownload, BsEye} from 'react-icons/bs'
import { downloadForm, downloadForm2 } from "api/file";
import useMediaQuery from "hooks/useMediaQuery";
import AttachmentTableMobile from './AttachmentTableMobile'

const TableWrapper = styled.div`
    border: 1px solid ${(props) => props.theme.color.border.primary};

    & .header-cell {
      background: ${props => getFader(props.theme.color.border.primary, 0.5)};
    }

    ${props => props.noHeader && css`
      border: none;
    `}
`;
const TableField = styled.table`
  width: 100%;
  background: ${props => props.theme.color.background.secondary};
  //box-shadow: ${props => props.theme.shadow};
  border-left: 2px solid ${props => props.theme.color.border.primary};
  border-right: 2px solid ${props => props.theme.color.border.primary};
  border-spacing: 0.5rem;
  //border-radius: 0.5rem;
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
`;
const FormField = styled.input`
  border: none;
  border-bottom: 1px solid ${props => props.theme.color.border.primary};
  padding: 0.4em;
  outline: none;
  width: 100%;
  background: none;
  color: ${props => props.theme.color.text.primary};

  &:hover {
    background: ${props => getFader(props.theme.color.border.primary, 0.5)};
  }
  &:focus {
    border-color: ${props => props.theme.color.fill.primary};
    background: ${props => getFader(props.theme.color.border.primary, 0.5)};
  }
`
const IconContainer = styled.div`
  display: flex;
  justify-content: center;
  cursor: pointer;
`
const Icon = styled.div`
	padding: 0.5rem;
	border-radius: 99px;
	display: flex;
    align-items: center;
    justify-content: center;
	color: ${props => props.theme.color.fill[props.color || "primary"]};
	&:hover {
		background: ${props => getFader(props.theme.color.fill[props.color || "primary"], 0.2)}
	}
`
const AttachmentRow = styled.tr`
  border-bottom: 1px solid ${props => props.theme.color.border.primary};
`
const AttachmentName = styled.span`
	pointer-events: none;
	${props => props.readOnly && css`
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
const AttachmentTable = ({attachments, onRemoveAttachment, noHeader, changeFieldContent, readOnly, onEditAttachment}) => {
	let device = useMediaQuery()
	const handleDownload = (attachmentId) => {
		const attachment = attachments.find(_ => _.id === attachmentId)
		if (attachment.file) {
			downloadForm2(attachment.name, attachment.file, attachment.fields)
			console.log("Downloading...")
		}
        else downloadForm(attachment.name, attachment.fileId, attachment.fields)
	}
	if (device !== "PC") return <AttachmentTableMobile attachments={attachments}/> 
	return (
		<TableWrapper noHeader={noHeader}>
			<Table>
				{!noHeader && (
				<Table.Header>
					<Table.Row>
						<Table.HeaderCell className="header-cell" textAlign="left" width="35%">
							File Name
						</Table.HeaderCell>
						<Table.HeaderCell className="header-cell" textAlign="center">
							Data Field
						</Table.HeaderCell>
						<Table.HeaderCell className="header-cell" textAlign="center" width="10%">
							Action
						</Table.HeaderCell>
					</Table.Row>
				</Table.Header>
			)}
				<Table.Body>
				{attachments.map((attachment) => (
					<AttachmentRow key={attachment.id}>
					<Table.Cell textAlign="left" width="35%">
						<AttachmentName readOnly={readOnly} onClick={() => handleDownload(attachment.id)}>
							{attachment.name}
						</AttachmentName>
					</Table.Cell>
					<Table.Cell textAlign="left">
						<TableField>
						<tbody>
							{attachment.fields.length > 0 ?
							attachment.fields.map((field) => (
								<tr key={field.id}>
									<td className="field-name">{field.name + ':'}</td>
									<td>
										<FormField
											value={field.content}
											readOnly={readOnly}
											onChange={e => changeFieldContent(attachment.id, field.id, e.target.value)}
											spellCheck="false"
										/>
									</td>
								</tr>
							)) : <tr><td className="attachment-no-field" colSpan={3}>No fields</td></tr>
							}
						</tbody>
						</TableField>
					</Table.Cell>
					{!readOnly ? 
						<Table.Cell textAlign="center" width="10%">
							<IconContainer>
								<Icon color="info" onClick={() => onEditAttachment(attachment.id)}>
									<BsThreeDotsVertical/>
								</Icon>
								<Icon color="danger" onClick={() => onRemoveAttachment(attachment.id)}>
									<BsTrash />
								</Icon>
							</IconContainer>
						</Table.Cell> : 
						<Table.Cell textAlign="center" width="10%">
							<IconContainer>
								<Icon color="primary" onClick={() => onEditAttachment(attachment.id)}>
									<BsEye/>
								</Icon>
								<Icon color="primary" onClick={() => handleDownload(attachment.id)}>
									<BsDownload/>
								</Icon>
							</IconContainer>
						</Table.Cell>
					}
					</AttachmentRow>
				))}
				</Table.Body>
			</Table>
		</TableWrapper>
	);
}

export default AttachmentTable;

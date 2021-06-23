/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import React from "react";
import styled, { keyframes } from "styled-components";
import { getFader } from "utils/color";
import {BsCheckCircle, BsPlus, BsFileEarmarkText, BsTrash} from 'react-icons/bs'
import FieldTable from "./FieldTable";
import AttachmentTable from './AttachmentTable'

const TableWrapper = styled.div`

`;
const Table = styled.table`
	border: 1px solid ${(props) => props.theme.color.border.primary};
	width: 100%;
	border-collapse: collapse;
`
const AttachmentName = styled.td`
	vertical-align: top;
	padding: 0.5rem;
`
const AttachmentFields = styled.td`
	padding: 0.5rem;
	width: 50%;
`
const AttachmentActions = styled.td`
	vertical-align: top;
	padding: 0.5rem;
	width: 5%;
`
const AttachmentRow = styled.tr`
	font-size: 0.9rem;
`
const AddFormRow = styled.tr`
	overflow: hidden;
	max-height: 0;
	background: ${props => getFader(props.theme.color.border.primary, 0.2)};
	border: 1px solid ${props => props.theme.color.border.primary};
`
const IconContainer = styled.div`
	color: ${props => props.theme.color.fill[props.color || "primary"]};
	cursor: pointer;
	display: flex;
	align-items: center;
	justify-content: center;
`
const NameContainer = styled.div`
	display: flex;
	align-items: center;
	gap: 0.5rem;
	padding-left: 0.5rem;
`
const CheckItemRow = styled.tr`
	background: ${props => getFader(props.theme.color.border.primary, 0.2)};
	border: 1px solid ${props => props.theme.color.border.primary};
	& .add-form {
		width: 5%;
	}
`
const CheckItemName = styled.div`
	font-weight: 600;
	padding: 0.5rem;
	gap: 0.5rem;
	display: flex;
	align-items: center;
	& p {
		flex: 1;
	}
`
const stretchOut = keyframes`
	from {max-height: 0; padding: 0 0.5rem; overflow: hidden;}
	to {max-height: 6rem;padding: 0.5rem; overflow: visible;}
`
const ComboxWrapper = styled.div`
	position: relative;
	overflow: hidden;
	animation: ${stretchOut} 0.25s ease-in-out 0s 1 forwards normal;
	display: flex;
	flex-direction: column;
	gap: 0.2rem;
	& label {
		font-size: 0.8rem;
		display: block;
	}
`

const AttachmentCheckList = ({checklist, attachments}) => {
	console.log(attachments);
	return (
		<TableWrapper>
			<Table>
				<tbody>
					{checklist.map(checkItem => 
						<React.Fragment key={checkItem.id}>
							<CheckItemRow>
								<td colSpan={2} className="check-item-name">
									<CheckItemName>
										<IconContainer>
											<BsCheckCircle size="1.2rem"/>
										</IconContainer>
										<p>{checkItem.name}</p>
									</CheckItemName>
								</td>
								<td>
									<IconContainer color="info">
										<BsPlus size="1.2rem"/>
									</IconContainer>
								</td>
							</CheckItemRow>
							<tr>
								<td colSpan={3}>
									<AttachmentTable 
										attachments={attachments.filter(a => a.checklistItemId === checkItem.id)}
										noHeader
									/>
								</td>
							</tr>
							{/* {attachments.filter(a => a.checklistItemId === checkItem.id).map(form =>
								<AttachmentRow key={form.fileId}>
									<AttachmentName>
										<NameContainer>
											<BsFileEarmarkText size="1rem"/>{form.name}
										</NameContainer>
									</AttachmentName>
									<AttachmentFields>
										<FieldTable fields={form.fields}/>
									</AttachmentFields>
									<AttachmentActions >
										<IconContainer color="danger">
											<BsTrash size="1rem"/>
										</IconContainer>	
									</AttachmentActions>
								</AttachmentRow>
							)} */}
						</React.Fragment>	
					)}
				</tbody>
			</Table>
		</TableWrapper>
	);
}

export default AttachmentCheckList;

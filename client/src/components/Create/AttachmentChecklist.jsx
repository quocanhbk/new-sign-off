/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import React from "react";
import styled from "styled-components";
import { getFader } from "utils/color";
import {BsCheckCircle, BsPlus} from 'react-icons/bs'
import AttachmentTable from './AttachmentTable'

const TableWrapper = styled.div`

`;
const Table = styled.table`
	border: 1px solid ${(props) => props.theme.color.border.primary};
	width: 100%;
	border-collapse: collapse;
`

const IconContainer = styled.div`
	color: ${props => props.theme.color.fill[props.color || "primary"]};
	cursor: pointer;
	display: flex;
	align-items: center;
	justify-content: center;
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

const AttachmentCheckList = ({checklist, attachments, onRemoveAttachment, onEditAttachment, changeFieldContent, setAddingAttachment}) => {

	return (
		<TableWrapper>
			<Table>
				<tbody>
					{checklist.map(checkItem => 
						<React.Fragment key={checkItem.id}>
							<CheckItemRow>
								<td colSpan={2} className="check-item-name">
									<CheckItemName>
										<IconContainer
											color={attachments.filter(a => a.checklistItemId === checkItem.id).length > 0 ? "success" : "disabled"}
										>
											<BsCheckCircle size="1.4rem"/>
										</IconContainer>
										<p>{checkItem.name}</p>
									</CheckItemName>
								</td>
								<td width="10%">
									<IconContainer color="info" onClick={() => setAddingAttachment(checkItem.id)}>
										<BsPlus size="1.2rem"/>
									</IconContainer>
								</td>
							</CheckItemRow>
							<tr>
								<td colSpan={3}>
									<AttachmentTable 
										attachments={attachments.filter(a => a.checklistItemId === checkItem.id)}
										onRemoveAttachment={onRemoveAttachment}
										onEditAttachment={onEditAttachment}
										noHeader
										changeFieldContent={changeFieldContent}
									/>
								</td>
							</tr>
						</React.Fragment>	
					)}
				</tbody>
			</Table>
		</TableWrapper>
	);
}

export default AttachmentCheckList;

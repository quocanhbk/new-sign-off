/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import React, { useEffect, useState } from "react";
import styled, { keyframes } from "styled-components";
import { getFader } from "../../../utils/color";
import {BsTrash, BsFileEarmarkText, BsCheckBox, BsPlusCircle} from 'react-icons/bs'
import FieldTable from "./FieldTable";
import ControlledCombox from "../../ControlledCombox";
import {dynamicFormList} from '../sampleData'
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
	width: 70%;
`
const AttachmentActions = styled.td`
	vertical-align: top;
	width: 5%;
`
const AttachmentRow = styled.tr`
	font-size: 0.9rem;
`
const AddFormRow = styled.tr`
	overflow: hidden;
	max-height: 0;
	background: ${props => getFader(props.theme.color.border.primary, 0.5)};

	& .cancel-add-form-cell {
		border: 1px solid ${props => props.theme.color.border.primary};
	}
`
const IconContainer = styled.div`
	color: ${props => props.theme.color.fill[props.color || "primary"]};
	padding: 0.5rem;
	cursor: pointer;
	display: flex;
	align-items: center;
`
const NameContainer = styled.div`
	display: flex;
	align-items: center;
	gap: 0.5rem;
	padding-left: 0.5rem;
`
const CheckItemRow = styled.tr`
	background: ${props => getFader(props.theme.color.border.primary, 0.5)};
	border: 1px solid ${props => props.theme.color.border.primary};
	& .add-form {
		width: 5%;
	}
`
const CheckItemName = styled.div`
	font-weight: 600;
	padding: 0.2rem 0.5rem;
	display: flex;
	& input {
		border: none;
		width: 100%;
		padding: 0.2rem;
		font-size: 1rem;
		background: transparent;
		color: ${props => props.theme.color.text.primary};
		outline: none;
	}
`
const stretchOut = keyframes`
	from {max-height: 0; padding: 0 0.5rem; overflow: hidden;}
	to {max-height: 4rem;padding: 0.5rem; overflow: visible;}
`
const ComboxWrapper = styled.div`
	overflow: hidden;
	animation: ${stretchOut} 0.25s ease-in-out 0s 1 forwards normal;
`
const AttachmentCheckList = ({checkList, util}) => {
	return (
		<TableWrapper>
			<Table>
				<tbody>
					{checkList.map(item => 
						<React.Fragment key={item.id}>
							<CheckItemRow>
								<td colSpan={3} className="check-item-name">
									<CheckItemName>
										<IconContainer>
											<BsCheckBox/>
										</IconContainer>
										<input 
											value={item.name} 
											onChange={e => util.setCheckItemName(item.id, e.target.value)}
											placeholder={"Check item name ..."}
										/>
										<IconContainer color="info" onClick={() => util.toggleAdding(item.id)}>
											<BsPlusCircle size="1rem"/>
										</IconContainer>
										<IconContainer color="danger" onClick={() => util.removeCheckItem(item.id)}>
											<BsTrash/>
										</IconContainer>
									</CheckItemName>
								</td>
							</CheckItemRow>
							{item.adding && 
							<AddFormRow>
								<td colSpan={3} className="add-form-cell">
									<ComboxWrapper>
										<ControlledCombox 
											selection={dynamicFormList} 
											displayField={"name"}
											onSelect={newValue => util.addForm(item.id, newValue)}
										/>
									</ComboxWrapper>
								</td>
							</AddFormRow>}
							{item.defaultForms.map(form =>
								<React.Fragment key={form.id}>
									<AttachmentRow>
										<AttachmentName>
											<NameContainer>
												<BsFileEarmarkText size="1rem"/>{form.name}
											</NameContainer>
										</AttachmentName>
										<AttachmentFields>
											<FieldTable fields={form.fields}/>
										</AttachmentFields>
										<AttachmentActions >
											<IconContainer color="danger" onClick={() => util.removeForm(item.id, form.id)}>
												<BsTrash size="1rem"/>
											</IconContainer>	
										</AttachmentActions>
									</AttachmentRow>
								</React.Fragment>
							)}
						</React.Fragment>	
					)}
				</tbody>
			</Table>
		</TableWrapper>
	);
}

export default AttachmentCheckList;

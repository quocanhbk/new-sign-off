/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import React, { useEffect, useState } from "react";
import styled, { keyframes } from "styled-components";
import { getFader } from "utils/color";
import {BsTrash, BsFileEarmarkText, BsCheckBox, BsPlusCircle, BsFillExclamationTriangleFill} from 'react-icons/bs'
import FieldTable from "./FieldTable";
import ControlledCombox from "components/ControlledCombox";
import { useStoreState } from "easy-peasy";
import SmallLoader from 'components/SmallLoader'
import Snackbar from 'components/Snackbar'

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
	background: ${props => getFader(props.theme.color.border.primary, 0.2)};
	border: 1px solid ${props => props.theme.color.border.primary};
	& .add-form {
		width: 5%;
	}
`
const CheckItemName = styled.div`
	font-weight: 600;
	padding: 0.5rem 0 0.5rem 0rem;
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
const Notify = styled.div`
    padding: 1rem;
    background: ${props => props.theme.color.fill.danger};
    color: ${props => props.theme.color.background.primary};
    display: flex;
    align-items: center;
    gap: 0.5rem;
    border-radius: 0.5rem;
`
const AttachmentCheckList = ({checklist, util}) => {
	const [pt, setPt] = useState(0)
	const [errorNotify, setErrorNotify] = useState(false)
	useEffect(() => {
		if (pt === 100)
			setTimeout(() => setPt(0), 250)
	}, [pt])
	const forms = useStoreState(s => s.forms)	
	return (
		<TableWrapper>
			<Table>
				<tbody>
					{checklist.map(item => 
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
								<td colSpan={3}>
									<ComboxWrapper>
										{item.loading && <SmallLoader percent={pt}/>}
										<label>Select form</label>
										<ControlledCombox 
											selection={forms} 
											displayField={"name"}
											onSelect={
												newValue => {
													if (item.defaultForms.map(_ => _.id).includes(newValue.id))
														setErrorNotify(true)
													else util.addForm(item.id, newValue.id, (v) => setPt(v))
												}}
										/>
									</ComboxWrapper>
								</td>
							</AddFormRow>}
							{item.defaultForms.map(form =>
								<AttachmentRow key={form.id}>
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
							)}
						</React.Fragment>	
					)}
				</tbody>
			</Table>
			<Snackbar visible={errorNotify} onClose={() => setErrorNotify(false)} timeOut={2000}>
                <Notify>
                    <BsFillExclamationTriangleFill size="1.2rem"/>
                    <p>Duplicate forms in one check item!</p>
                </Notify>
            </Snackbar>
		</TableWrapper>
	);
}

export default AttachmentCheckList;

/* eslint-disable no-constant-condition */
/* eslint-disable no-unused-vars */
import React, { useState } from "react";
import styled, { css } from "styled-components";
import { getFader } from "../../../utils/color";
import Participants from "./Participants";
import Snackbar from "../../Snackbar";
import PrimaryInfo from "./PrimaryInfo";
import Header from "./Header";
import SectionContainer from "../../SectionContainer";
import useProcedure from "../useProcedure";
import AttachmentChecklist from "./AttachmentChecklist";
import { BsPlus, BsFillExclamationTriangleFill } from "react-icons/bs";
import Button from "../../Button";

const StyleContainer = styled.div`
	flex: 10;
	display: flex;
	flex-direction: column;
	border-left: 1px solid ${(props) => props.theme.color.border.primary};
	height: 100%;
`;
const ContainerItems = styled.div`
	flex: 1;
	display: flex;
	gap: 1rem;
	padding: 1rem;
	overflow: auto;
	position: relative;
	::-webkit-scrollbar {
		width: 0.5rem;
	}
	::-webkit-scrollbar-track {
		background: transparent;
	}
	::-webkit-scrollbar-thumb {
		background: ${(props) => getFader(props.theme.color.fill.secondary, 0.5)};
		border-radius: 99px;
	}
	::-webkit-scrollbar-thumb:hover {
		background: ${(props) => props.theme.color.fill.secondary};
	}
`;
const Column = styled.div`
	flex: 1;
	display: flex;
	flex-direction: column;
	gap: 1rem;

	${props => props.borderLeft && css`
		border-left: 1px solid ${props => props.theme.color.border.primary};
		padding-left: 1rem;
	`}
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
const AddCheckListWrapper = styled.div`
	padding: 0;
	display: flex;
	flex-direction: column;
	padding: 0.5rem 0 2rem 0;
	
	& button {
		border: 1px solid ${props => props.theme.color.border.primary};
		border-radius: 0.5rem;
		padding: 0.5rem;
		background: transparent;
		color: ${props => props.theme.color.fill.primary};
		font-weight: 600;
		font-size: 1rem;
		display: flex;
		align-items: center;
		justify-content: center;
		gap: 0.5rem;
		cursor: pointer;
		&:hover {
			background: ${props => getFader(props.theme.color.border.primary, 0.5)}
		}
		&:active {
			background: ${props => props.theme.color.border.primary};
		}
	}
`
const Detail = () => {

	const {
		title, description, advisors, approvers, observators, checkList, checkListUtil, set,
		error, isSubmittable, submitProcedure
	} = useProcedure()

	const [errorNotify, setErrorNotify] = useState(false)
	
	const handleSubmit = () => {
		if (!isSubmittable()) setErrorNotify(true)
		else submitProcedure() 
	}

	return (
		<StyleContainer>
			<Header onSubmit={handleSubmit}/>
			<ContainerItems>
				<Column>
					{/* SECTION PRIMARY INFO */}
					<SectionContainer headline="Primary Information" haveBorder>
						<PrimaryInfo 
							title={title}
							description={description}
							set={set}
							error={error}
						/>
					</SectionContainer>

					{/* SECTION PARTICIPANTS */}
					<SectionContainer headline="Participants" haveBorder>
						<Participants 
							advisors={advisors}
							approvers={approvers}
							observators={observators}
							set={set}
						/>
					</SectionContainer>
				</Column>
				<Column borderLeft>
					{/* SECTION CHECKLIST ATTACHMENT */}
					<SectionContainer headline="Attachment Checklist" haveBorder>
						<AttachmentChecklist checkList={checkList} util={checkListUtil}/>
						<AddCheckListWrapper>
							<Button onClick={() => checkListUtil.addCheckItem()}>
								<BsPlus size="1.2rem"/> Add Check Item
							</Button>
						</AddCheckListWrapper>
					</SectionContainer>
				</Column>
			</ContainerItems>
			<Snackbar visible={errorNotify} onClose={() => setErrorNotify(false)} timeOut={2000}>
                <Notify>
                    <BsFillExclamationTriangleFill size="1.2rem"/>
                    <p>Please fix all fields before submitting!</p>
                </Notify>
            </Snackbar>
		</StyleContainer>
	);
};

export default Detail;

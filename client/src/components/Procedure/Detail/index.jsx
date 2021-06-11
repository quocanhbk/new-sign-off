/* eslint-disable no-constant-condition */
/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { getFader } from "../../../utils/color";
import Participants from "./Participants";
import PrimaryInfo from "./PrimaryInfo";
import Header from "./Header";
import SectionContainer from "../../SectionContainer";
import useProcedure from "../useProcedure";
import AttachmentChecklist from "./AttachmentChecklist";
import { BsCheckBox, BsPlus } from "react-icons/bs";

const StyleContainer = styled.div`
	flex: 10;
	display: flex;
	flex-direction: column;
	border-left: 1px solid ${(props) => props.theme.color.border.primary};
`;
const ContainerItems = styled.div`
	flex: 1;
	display: flex;
	flex-direction: column;
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
		title, setTitle, description, setDescription,
		advisors, setAdvisors, approvers, setApprovers, observators, setObservators,
		checkList, checkListUtil
	} = useProcedure()

	return (
		<StyleContainer>
			<Header/>
			<ContainerItems>

				{/* SECTION PRIMARY INFO */}
				<SectionContainer headline="Primary Information" haveBorder>
					<PrimaryInfo data={{title, setTitle, description, setDescription}}/>
				</SectionContainer>

				{/* SECTION PARTICIPANTS */}
				<SectionContainer headline="Participants" haveBorder>
					<Participants data={{advisors, setAdvisors, approvers, setApprovers, observators, setObservators}}/>
				</SectionContainer>
					
				{/* SECTION CHECKLIST ATTACHMENT */}
				<SectionContainer headline="Attachment Checklist" haveBorder>
					<AttachmentChecklist checkList={checkList} util={checkListUtil}/>
					<AddCheckListWrapper>
						<button onClick={() => checkListUtil.addCheckItem()}>
							<BsPlus size="1.2rem"/> Add Check Item
						</button>
					</AddCheckListWrapper>
				</SectionContainer>
			</ContainerItems>
		</StyleContainer>
	);
};

export default Detail;

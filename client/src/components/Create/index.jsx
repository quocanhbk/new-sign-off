/* eslint-disable no-constant-condition */
/* eslint-disable no-unused-vars */
import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { getFader } from "utils/color";
import FlexibleApprovalAttachment from "./FlexibleApprovalAttachment";
import DescriptionEditor from "./DescriptionEditor";
import Participants from "./Participants";
import PrimaryInfo from "./PrimaryInfo";
import Header from "./Header";
import SectionContainer from "../SectionContainer";
import useDocument from "./useDocument";
import Modal from '../Modal'
import SubmitPopup from './SubmitPopup'
import Snackbar from "components/Snackbar";
import { BsFillExclamationTriangleFill } from "react-icons/bs";
import { getProcedures } from "api/procedure";
import AttachmentCheckList from "./AttachmentChecklist";
import AttachmentPopup from './AttachmentPopup'
import AbsoluteModal from 'components/AbsoluteModal'

const StyleContainer = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  height: 100%;
`;
const ContainerItems = styled.div`
	flex: 1;
	display: flex;
	flex-direction: column;
	position: relative;
	overflow: overlay;
  
`;
const Notify = styled.div`
    padding: 1rem;
    background: ${props => props.theme.color.fill.danger};
    color: ${props => props.theme.color.background.primary};
    display: flex;
    align-items: center;
    gap: 0.5rem;
    border-radius: 0.5rem;
`
const Container = styled.div`
	display: flex;
	flex-direction: column;
	gap: 1rem;
	padding: 1rem;
	overflow: auto;
	position: relative;
	overflow: overlay;
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
`
const Create = () => {
	const [modal, setModal] = useState()
	const [errorNotify, setErrorNotify] = useState(false)
	const [procedureList, setProcedureList] = useState([])
	const [addingAttachment, setAddingAttachment] = useState(null)
	const {
		title, description, type,
        priority, deadline, relatedProjects,
        advisors, approvers, observators,
        approvalAttachments, referenceAttachments, procedure, checklist,
        set,
        //Helper function
        removeAttachment, submitRequest, error, isSubmittable, changeFieldContent, render
	} = useDocument()

	const popupSubmit = () => {
		if (!isSubmittable()) setErrorNotify(true)
		else setModal("preview")
	}

	const renderModal = () => {
		return (
			<>
			<Modal height="80%" width="80%" visible={modal === "store"} onClickOutside = {() => setModal("")} title="Loading document">
				Store
			</Modal>
			<Modal height="80%" width="80%" visible={modal === "draft"} onClickOutside = {() => setModal("")} title="Loading document">
				Draft
			</Modal>
			<Modal visible={modal === "preview"} onClickOutside = {() => setModal("")}>
				<SubmitPopup closeSubmit={() => setModal("")} submitRequest={submitRequest} title={title}/>
			</Modal>
			</>
		)
	}

	useEffect(() => {
		const fetchProcedures = async () => {
			let data = await getProcedures()
			setProcedureList(data.filter(d => d.isActive))
		}
		fetchProcedures()
	}, [])

	return (
		<StyleContainer>
			{renderModal()}
			<Header openSubmit={popupSubmit}/>
			
			<ContainerItems className="ContainerItems">
				<AbsoluteModal visible={addingAttachment !== null} onClickOutside={() => setAddingAttachment(null)} width="50%">
					<AttachmentPopup 
						checkItemId={addingAttachment}
						set={set}
						attachments={approvalAttachments}
						closePopup={() => setAddingAttachment(null)}
						checklist={checklist}
					/>
				</AbsoluteModal>
				{render(
				<Container className="Container">
				{/* SECTION PRIMARY INFO */}
				<SectionContainer headline="Primary Information" haveBorder>
					<PrimaryInfo
						error={error}
						title={title}
						type={type}
						priority={priority}
						deadline={deadline}
						relatedProjects={relatedProjects}
						set={set}
						procedureList={procedureList}
						procedure={procedure}
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
				
				{/* SECTION APPROVAL DOCUMENT */}
				<SectionContainer headline="Approval Attachment" haveBorder>
					{type === "Procedure" ? 
						<AttachmentCheckList 
							checklist={checklist} 
							attachments={approvalAttachments}
							onRemoveAttachment={id => removeAttachment("approval", id)}
							setAddingAttachment={setAddingAttachment}
							changeFieldContent={(attachmentId, fieldId, content) => changeFieldContent("approvalAttachments", attachmentId, fieldId, content)}
						/> : 
						<FlexibleApprovalAttachment 
							type="approvalAttachments"
							attachments={approvalAttachments}
							set={set}
							onRemoveAttachment={id => removeAttachment("approval", id)}
							changeFieldContent={(attachmentId, fieldId, content) => changeFieldContent("approvalAttachments", attachmentId, fieldId, content)}
						/>
					}
				</SectionContainer>
				
				{/* SECTION REFERENCE DOCUMENT */}
				<SectionContainer headline="Reference Attachment" haveBorder>
					<FlexibleApprovalAttachment
						type="referenceAttachments"
						attachments={referenceAttachments} 
						set={set} 
						onRemoveAttachment={id => removeAttachment("reference", id)}
						changeFieldContent={(attachmentId, fieldId, content) => changeFieldContent("referenceAttachments", attachmentId, fieldId, content)}
					/>
				</SectionContainer>
				
				{/* SECTION DESCRIPTION */}
				<SectionContainer headline="Description" haveBorder>
					<DescriptionEditor description={description} set={set}/>
				</SectionContainer>
				</Container>
				)}


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

export default Create;

/* eslint-disable no-constant-condition */
/* eslint-disable no-unused-vars */
import React, { useState } from "react";
import styled from "styled-components";
import { getFader } from "../../utils/color";
import FlexibleApprovalAttachment from "./FlexibleApprovalAttachment";
import ApprovalDocumentProcess from "./ApprovalDocumentProcess";
import DescriptionEditor from "./DescriptionEditor";
import Participants from "./Participants";
import PrimaryInfo from "./PrimaryInfo";
import {procedureList, data} from './sampleData'
import Header from "./Header";
import SectionContainer from "../SectionContainer";
import useDocument from "./useDocument";

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

const Create = () => {
	const [tempForm , setTempForm ]= useState()

	const {
		title, description, type,
        priority, deadline, relatedProjects,
        advisors, approvers, observators,
        approvalAttachments, referenceAttachments,
        set,
        //Helper function
        removeAttachment, submitRequest, error, setError
	} = useDocument()

	return (
		<StyleContainer>
			<Header/>
			<ContainerItems>

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
					{false ? 
						<ApprovalDocumentProcess tempForm={tempForm} setTempForm={setTempForm} form={procedureList}/> : 
						<FlexibleApprovalAttachment 
							attachments={approvalAttachments}
							set={set}
							onRemoveAttachment={id => removeAttachment("approval", id)}
						/>
					}
				</SectionContainer>
				
				{/* SECTION REFERENCE DOCUMENT */}
				<SectionContainer headline="Reference Document" haveBorder>
					<FlexibleApprovalAttachment attachments={referenceAttachments} set={set}/>
				</SectionContainer>
				
				{/* SECTION DESCRIPTION */}
				<SectionContainer headline="Description" haveBorder>
					<DescriptionEditor description={description} set={set}/>
				</SectionContainer>
			</ContainerItems>
			<button onClick={() => submitRequest()}>Submit</button>
		</StyleContainer>
	);
};

export default Create;

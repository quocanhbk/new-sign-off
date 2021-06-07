/* eslint-disable no-constant-condition */
/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { getFader } from "../../utils/color";
import FlexibleApprovalAttachment from "./FlexibleApprovalAttachment";
import ApprovalDocumentProcess from "./ApprovalDocumentProcess";
import DescriptionEditor from "./DescriptionEditor";
import Participants from "./Participants";
import PrimaryInfo from "./PrimaryInfo";
import ReferenceDocument from "./ReferenceDocument";
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
  const [getDataForm, setGetDataForm] = useState(procedureList[0]);
  const [tempForm , setTempForm ]= useState()

  useEffect(() =>{
    if(getDataForm !== undefined)
    {
      setTempForm(getDataForm)
    }
  },[getDataForm])

  const {
    title, setTitle, 
    description, setDescription,
    approvalType, setApprovalType, 
    priority, setPriority, 
    deadline, setDeadline, 
    relatedProject, setRelatedProject,
    advisors, setAdvisors, approvers, setApprovers, observators, setObservators,
    process, setProcess,
    approvalAttachment, setApprovalAttachment, referenceAttachment, setReferenceAttachment,
    removeAttachment
  } = useDocument()

  return (
    <StyleContainer>
      <Header/>
      <ContainerItems>

        {/* SECTION PRIMARY INFO */}
        <SectionContainer headline="Primary Information" haveBorder>
          <PrimaryInfo
            data={{
              title, setTitle, 
              approvalType, setApprovalType, 
              priority, setPriority, 
              deadline, setDeadline, 
              relatedProject, setRelatedProject,
              process, setProcess
            }}
          />
        </SectionContainer>

        {/* SECTION PARTICIPANTS */}
        <SectionContainer headline="Participants" haveBorder>
          <Participants 
            data={{
              advisors, setAdvisors,
              approvers, setApprovers,
              observators, setObservators
            }}
          />
        </SectionContainer>
        
        {/* SECTION APPROVAL DOCUMENT */}
        <SectionContainer headline="Approval Attachment" haveBorder>
          {false ? 
            <ApprovalDocumentProcess tempForm={tempForm} setTempForm={setTempForm} form={procedureList}/> : 
            <FlexibleApprovalAttachment 
              attachment={approvalAttachment} 
              setAttachment={setApprovalAttachment}
              onRemoveAttachment={id => removeAttachment("approval", id)}
            />
          }
        </SectionContainer>
        
        {/* SECTION REFERENCE DOCUMENT */}
        <SectionContainer headline="Reference Document" haveBorder>
          <FlexibleApprovalAttachment attachment={referenceAttachment} setAttachment={setReferenceAttachment}/>
        </SectionContainer>
        
        {/* SECTION DESCRIPTION */}
        <SectionContainer headline="Description" haveBorder>
          <DescriptionEditor description={description} setDescription={setDescription}/>
        </SectionContainer>
      
      </ContainerItems>
    </StyleContainer>
  );
};

export default Create;

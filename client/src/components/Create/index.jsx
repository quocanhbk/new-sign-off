/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { getFader } from "../../utils/color";
import ApprovalDocument from "./ApprovalDocument";
import ApprovalDocumentProcess from "./ApprovalDocumentProcess";
import DescriptionEditor from "./DescriptionEditor";
import Participants from "./Participants";
import PrimaryInfo from "./PrimaryInfo";
import ReferenceDocument from "./ReferenceDocument";
import Modal from '../Modal'
import SavingDraftDocument from "./SavingDraftDocument";
import LoadingDocument from "./LoadingDocument";

const StyleContainer = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  height: 100%;
`;
const StyleTitle = styled.div`
  display: flex;
  justify-content: space-between;

  width: 100%;
  padding: 1rem;
  flex: 1;

  box-shadow: 0px 3px 4px rgba(0, 0, 0, 0.25);

  & h4 {
    text-transform: uppercase;
    color: ${(props) => props.theme.color.text.primary};
  }
`;
const StyleButton = styled.div`
  display: flex;

  gap: 1rem;
  & button {
    padding: 0.3rem 1rem;

    font-weight: bold;
    text-transform: uppercase;
    border: none;
    cursor: pointer;
    border-radius: 4px;

    &.btn-stored {
      background: ${(props) => props.theme.color.fill.info};
      color: ${(props) => props.theme.color.background.primary};
    }
    &.btn-draft {
      background: ${(props) => getFader(props.theme.color.text.primary, 0.3)};
      color: ${(props) => props.theme.color.text.primary};
    }
    &.btn-preview {
      background: ${(props) => props.theme.color.text.primary};
      color: ${(props) => props.theme.color.background.primary};
    }
  }
`;
const ContainerItems = styled.div`
  flex: 99;
  display: -webkit-box;
  display: -moz-box;
  display: -ms-flexbox;
  display: -webkit-flex;
  display: flex;
  flex-wrap: wrap;
  -webkit-flex-wrap: wrap;
  justify-content: space-between;
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
const DivContent = styled.div`
  width: 100%;

  & h4 {
    text-transform: uppercase;

    color: ${(props) => props.theme.color.text.primary};
    border-bottom: 2px solid ${(props) => props.theme.color.border.primary};

    padding-bottom: 0.5rem;
    margin-bottom: 0.5rem;
  }
`;
const data = [
  {
    id: 1,
    name: "Name File have field",
  },
  {
    id: 2,
    name: "Name File no field",
  },
];

const data2 = [
  {
    id: 1,
    name: "Name File have fieldName File have fieldName File have fieldName File have fieldName File have fieldName File have field",
    data_field: [
      {
        id: 1,
        name: "Date of Request",
        value: "",
      },
      {
        id: 2,
        name: "Description",
        value: "",
      },

      {
        id: 3,
        name: "Vat",
        value: "",
      },
      {
        id: 4,
        name: "Value",
        value: "",
      },
    ],
  },
  {
    id: 2,
    name: "Name File no field",
    data_field: [],
  },
];
const form = [
  {
    id: 1,
    name: "Đề nghị thanh toán nội bộ",
    approvalDocument: [
      {
        id: 11,
        name_required: 'Thư dề nghị thanh toán nhà thầu',
        data: [
          {
            id: 111,
            name: "Mau 1",
            file_name: "ahihi.pdf",
            data_field:[
              {
                id: 1,
                name: "Date of Request",
                value: "",
              },
              {
                id: 2,
                name: "Description",
                value: "",
              },
        
              {
                id: 3,
                name: "Vat",
                value: "",
              },
              {
                id: 4,
                name: "Value",
                value: "",
              },
            ],
          },
          {
            id: 112,
            name: "Mau 2",
            file_name: "ahihi.pdf",
            data_field: [],
          },
        ]
      },
      {
        id: 12,
        name_required: 'Thư dề nghị bão lãnh',
        data: [
          {
            id: 113,
            name: "Mau 1",
            file_name: "ahihi.pdf",
            data_field: [],
          },
          {
            id: 114,
            name: "Mau 2",
            file_name: "ahihi.pdf",
            data_field: [],
          },
          {
            id: 114,
            name: "Mau 2",
            file_name: "ahihi.pdf",
            data_field: [],
          },
          {
            id: 114,
            name: "Mau 2",
            file_name: "ahihi.pdf",
            data_field: [],
          },
        ]
      },
    ]
  },
  {
    id: 2,
    name: "Đề nghị thanh toán ngoại bộ",
    approvalDocument: [
      {
        id: 21,
        name_required: 'Thu de nghi nha thau',
        data: [
          {
            id: 221,
            file_name: "ahihi.pdf",
            data_field: [],
          },
          {
            id: 222,
            file_name: "ahihi.pdf",
            data_field: [],
          },
        ]
      },
      {
        id: 22,
        name_required: 'Thu de nghi nha thau 222',
        data: [
          {
            id: 221,
            file_name: "ahihi.pdf",
            data_field: [],
          },
        ]
      },
    ]
  },
]
const types = [
  {
    id: 1,
    name: "Flexible",
  },
  {
    id: 2,
    name: "Process",
  },
];
const draft = [
  {
    id: 1,
    name: 'Tờ trình 1',
    created: '15:00 20/04/2021',
    title: 'TT tiền điện',
    type: 'Flexible',
    priority: 'Normal',
    deadline: '22/04/2021'
  },
  {
    id: 2,
    name: 'Tờ trình 2',
    created: '15:00 20/04/2021',
    title: 'TT tiền điện',
    type: 'Flexible',
    priority: 'Normal',
    deadline: '22/04/2021'
  },
  {
    id: 3,
    name: 'Tờ trình 3',
    created: '15:00 20/04/2021',
    title: 'TT tiền điện',
    type: 'Flexible',
    priority: 'Normal',
    deadline: '22/04/2021'
  }
]
const Create = () => {
  const [approvalData, setApprovalData] = useState(data2);
  const [dataReference, setDataReference] = useState(data);
  const [getDataForm, setGetDataForm] = useState(form[0]);
  const [approvalNavigate, setApprovalNavigate] = useState(false);

  const [modalDraft, setModalDraft] = useState(false)
  const [modalStore, setModalStore] = useState(false)

  useEffect(() => {
    if (localStorage.getItem("approval")) {
      setApprovalNavigate(true);
      setTimeout(() => {
        localStorage.removeItem("approval");
      }, [1000]);
    }else{
      setApprovalNavigate(false)
    }
  }, [approvalNavigate]);

  const [typeValue, setTypeValue] = useState(types[0].name);
  const [tempForm , setTempForm ]= useState()
  const [dataDraft,setdataDraft] = useState(draft)
  const [dataStore,setDataStore] = useState(draft)

  useEffect(() =>{
    if(getDataForm !== undefined)
    {
      setTempForm(getDataForm)
    }
  },[getDataForm])

  return (
    <StyleContainer>
      <StyleTitle>
        <h4>CREATE A NEW APPROVAL DOCUMENT</h4>
        <StyleButton>
          <Modal height="80%" width="80%" visible={modalStore} onClickOutside = {() => setModalStore(false)} title="Loading document">
            <LoadingDocument dataStore={dataStore} setDataStore={setDataStore}/>
          </Modal>
          <button onClick={() => setModalStore(true)} className="btn-stored">Load from stored</button>
          <Modal height="80%" width="80%" visible={modalDraft} onClickOutside = {() => setModalDraft(false)} title="Saving draft document">
            <SavingDraftDocument dataDraft={dataDraft} setdataDraft={setdataDraft}/>
          </Modal>
          <button onClick={() => setModalDraft(true)} className="btn-draft">Save Draft</button>
          <button className="btn-preview">PREVIEW</button>
        </StyleButton>
      </StyleTitle>
      <ContainerItems>
        <DivContent>
          <h4>Primary Info</h4>
          <PrimaryInfo
            types={types}
            typeValue={typeValue}
            setTypeValue={setTypeValue}
            approvalNavigate={approvalNavigate}
            form= {form}
            setGetDataForm={setGetDataForm}
            setApprovalNavigate={setApprovalNavigate}
          />
        </DivContent>
        <DivContent>
          <h4>PARTICIPANTS</h4>
          <Participants />
        </DivContent>
        <DivContent>
          <h4>APPROVAL DOCUMENT ({approvalData.length})</h4>
          {typeValue === "Process" ? (
            <ApprovalDocumentProcess
              tempForm={tempForm}
              setTempForm={setTempForm}
              form={form}
            />
          ) : (
            <ApprovalDocument
              approvalData={approvalData}
              setApprovalData={setApprovalData}
            />
          )}
        </DivContent>
        <DivContent>
          <h4>REFERENCE DOCUMENT ({dataReference.length})</h4>
          <ReferenceDocument
            dataReference={dataReference}
            setDataReference={setDataReference}
          />
        </DivContent>
        <DivContent>
          <h4>DESCRIPTION</h4>
          <DescriptionEditor />
        </DivContent>
      </ContainerItems>
    </StyleContainer>
  );
};

export default Create;

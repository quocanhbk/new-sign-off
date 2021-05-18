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
        id: 1,
        name: "Name File 1",
        file_name: "ahihi.pdf",
        data_field: [],
        is_File: true,
      },
      {
        id: 2,
        name: "Name File 2",
        file_name: "",
        data_field: [],
        is_File: false,
      },
    ],
  },
  {
    id: 2,
    name: "Payment request form - Đề nghị thanh toán",
    approvalDocument: [
      {
        id: 1,
        name: "Payment File 1",
        file_name: "ahihi.pdf",
        data_field: [],
        is_File: true,
      },
      {
        id: 2,
        name: "Payment File 2",
        file_name: "",
        data_field: [],
        is_File: false,
      },
      {
        id: 3,
        name: "Payment File 3",
        file_name: "",
        data_field: [],
        is_File: false,
      },
    ],
  },
];
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

const Create = () => {
  const [approvalData, setApprovalData] = useState(data2);
  const [dataReference, setDataReference] = useState(data);

  const [dataForm, setDataForm] = useState(form);
  const [getDataForm, setGetDataForm] = useState({
    id: null,
    name: "",
    approvalDocument: [],
  });

  const [approvalNavigate, setApprovalNavigate] = useState(false);

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

  return (
    <StyleContainer>
      <StyleTitle>
        <h4>CREATE A NEW APPROVAL DOCUMENT</h4>
        <StyleButton>
          <button className="btn-stored">Load from stored</button>
          <button className="btn-draft">Save Draft</button>
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
            dataForm={dataForm}
            setGetDataForm={setGetDataForm}
          />
        </DivContent>
        <DivContent>
          <h4>PARTICIPANTS</h4>
          <Participants />
        </DivContent>
        <DivContent>
          <h4>APPROVAL DOCUMENT ({approvalData.length})</h4>
          {approvalNavigate || typeValue === "Process" ? (
            <ApprovalDocumentProcess
              getDataForm={getDataForm}
              setGetDataForm={setGetDataForm}
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

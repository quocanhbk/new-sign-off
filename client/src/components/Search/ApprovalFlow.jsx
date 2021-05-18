/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { getFader } from "../../utils/color";
import AvatarStatus from "../AvatarStatus";
import { GoPrimitiveDot } from "react-icons/all";
import { FaBeer } from 'react-icons/all';

const Approval = styled.div`
  display: flex;
  flex-direction: column;
  flex: 10;
  padding: 0 1rem;
  height: 80%;
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
const ApprovalContent = styled.div`
  border-bottom: 3px solid ${(props) => props.theme.color.border.primary};
  margin-top: 1rem;
  position: relative;
  padding-left: 1rem;
  .flow:before {
    content: "";
    width: 100%;
    height: 2px;
    background: #ffc107;
    position: absolute;
    left: 140%;
    top: 45%;
  }
  .flow:after {
    content: "";
    width: 130%;
    height: 130%;
    position: absolute;
    border-radius: 50%;
    border-right: 3px solid #ffc107;
    top: -15%;
  }
`;
const JoinGroup = styled.div`
  margin: 1rem;
  position: relative;
`;
const TitleApproval = styled.h4`
  text-transform: uppercase;
  padding-left: 2rem;
`;
const CardChild = styled.div`
  display: flex;
  align-items: center;
`;
const InfoApproval = styled.div`
  display: flex;
  align-items: center;
  width: 100%;
  margin: 0.5rem 0;
  padding-left: 1rem;
  .info {
    p {
      padding-left: 1rem;
    }
    & .position {
      font-size: 0.9rem;
      color: ${(props) => props.theme.color.text.secondary};
    }
  }
`;
const ButtonRemind = styled.button`
  background-color: transparent;
  border: 1px solid ${(props) => props.theme.color.border.primary};
  border-radius: 4px;
  text-transform: capitalize;
  padding: 0.5rem 1rem;
  color: ${(props) => props.theme.color.text.secondary};
  cursor: pointer;
`;
const Flow = styled.div`
  height: ${props => props.height}px;
  position: absolute;
  border-left: 2px solid #ffc107;
  top: ${(props) => props.top}px;
  overflow: hidden;
  left: 0.4%;
  width: 1px;
`;
const Cicle = styled.div`
  width: 2rem;
  height: 2rem;
  background: black;
  position: absolute;
  top: ${(props) => props.top}px;
  border-radius: 50%;
  left: -1%;
  border: 2px solid #ffc107;
  svg{
    margin-top: 50%;
    margin-left: 50%;
    transform: translateX(-50%);
    transform: translateY(-50%) translateX(-50%);
  }
`;
const data = [
  {
    id: 1,
    submitter: [
      {
        id: 1,
        name: "Nguyen Van Bao",
        job: "Chuyen vien Phat trien Ung dung",
      },
    ],
    advisor: [
      {
        id: 1,
        name: "Nguyen Van Cao",
        job: "Truong nhom Phat trien Ung dung",
      },
      {
        id: 2,
        name: "Le Thi Bo Cau",
        job: "Chuyen vien HCQT",
      },
      {
        id: 1,
        name: "Nguyen Van Cao",
        job: "Truong nhom Phat trien Ung dung",
      },
      {
        id: 2,
        name: "Le Thi Bo Cau",
        job: "Chuyen vien HCQT",
      },
      {
        id: 2,
        name: "Le Thi Bo Cau",
        job: "Chuyen vien HCQT",
      },
      {
        id: 2,
        name: "Le Thi Bo Cau",
        job: "Chuyen vien HCQT",
      },
      {
        id: 2,
        name: "Le Thi Bo Cau",
        job: "Chuyen vien HCQT",
      },
      {
        id: 2,
        name: "Le Thi Bo Cau",
        job: "Chuyen vien HCQT",
      },
      {
        id: 2,
        name: "Le Thi Bo Cau",
        job: "Chuyen vien HCQT",
      },
    ],
    approver: [
      {
        id: 1,
        name: "Nguyen Van Gau",
        job: "Giam doc CNTT",
      },
      {
        id: 1,
        name: "Nguyen Van Gau",
        job: "Giam doc CNTT",
      },
    ],
    observator: [
      {
        id: 1,
        name: "Nguyen Ca Chep",
        job: "Chuyen vien Lap Quy",
      },
      {
        id: 2,
        name: "Nguyen Ca Ro",
        job: "Chuyen vien Lap Quy",
      },
      {
        id: 3,
        name: "Nguyen Ca Hoi",
        job: "Chuyen vien Lap Quy",
      },
      {
        id: 3,
        name: "Nguyen Ca Hoi",
        job: "Chuyen vien Lap Quy",
      },
      {
        id: 3,
        name: "Nguyen Ca Hoi",
        job: "Chuyen vien Lap Quy",
      },
    ],
  },
];
function ApprovalFlow() {
  const [position1, setPosition1] = useState(0);
  const [position2, setPosition2] = useState(0);
  const [position3, setPosition3] = useState(0);
  const [positionflow, setPositionFlow] = useState(0)
  useEffect(() => {
    let position1 = document.getElementsByClassName("submiter");
    let position2 = document.getElementsByClassName("advisor");
    let position3 = document.getElementsByClassName("approver");
    let content = document.getElementsByClassName("content");
    setPosition1(
      position1[0].getBoundingClientRect().top -
        content[0].getBoundingClientRect().top +
        17
    );
    setPosition2(
      position2[0].getBoundingClientRect().top -
        content[0].getBoundingClientRect().top +
        17
    );
    setPosition3(
      position3[0].getBoundingClientRect().top -
        content[0].getBoundingClientRect().top +
        17
    );

    let flow = document.getElementsByClassName("flow")
    setPositionFlow(flow[flow.length - 1].getBoundingClientRect().top - flow[0].getBoundingClientRect().top)
  });
  return (
    <Approval>
      <ApprovalContent className="content">
        {/* draw flow */}
        <Flow top={position1 + 5} height={positionflow}/>
        <Cicle top={position1} className="flow"><FaBeer/></Cicle>
        <Cicle top={position2} className="flow"><FaBeer/></Cicle>
        <Cicle top={position3} className="flow"><FaBeer/></Cicle>
        {/* end drawa flow */}
        <JoinGroup>
          {/* <div className="ahihi">
          </div> */}
          <TitleApproval>SUBMITER</TitleApproval>
          {data.map((value, index) => {
            return (
              <CardChild key={index} className="submiter">
                <InfoApproval className="info_approval">
                  <AvatarStatus src="/avatar.png" status={value} />
                  <div className="info">
                    <p className="name">{value.submitter[0].name}</p>
                    <p className="position">{value.submitter[0].job}</p>
                  </div>
                </InfoApproval>
                <ButtonRemind>remind</ButtonRemind>
              </CardChild>
            );
          })}
        </JoinGroup>
        <JoinGroup>
          {/* <div className="ahihi2">
          </div> */}
          <TitleApproval>ADVISOR (2)</TitleApproval>
          {data.map((value, index) => {
            return (
              <div key={index}>
                {value.advisor.map((val) => {
                  return (
                    <CardChild key={val.id} className="advisor">
                      <InfoApproval className="info_approval">
                        <AvatarStatus src="/avatar.png" status={val} />
                        <div className="info">
                          <p className="name">{val.name}</p>
                          <p className="position">{val.job}</p>
                        </div>
                      </InfoApproval>
                      <ButtonRemind>remind</ButtonRemind>
                    </CardChild>
                  );
                })}
              </div>
            );
          })}
        </JoinGroup>
        <JoinGroup>
          {/* <div className="ahihi3">
          </div> */}
          <TitleApproval>APPROVER (1)</TitleApproval>
          {data.map((value, index) => {
            return (
              <div key={index}>
                {value.approver.map((val) => {
                  return (
                    <CardChild key={val.id} className="approver">
                      <InfoApproval className="info_approval">
                        <AvatarStatus src="/avatar.png" status={val} />
                        <div className="info">
                          <p className="name">{val.name}</p>
                          <p className="position">{val.job}</p>
                        </div>
                      </InfoApproval>
                      <ButtonRemind>remind</ButtonRemind>
                    </CardChild>
                  );
                })}
              </div>
            );
          })}
        </JoinGroup>
      </ApprovalContent>
      <JoinGroup>
        <TitleApproval>OBSERVATOR (1)</TitleApproval>
        {data.map((value, index) => {
          return (
            <div key={index}>
              {value.observator.map((val) => {
                return (
                  <CardChild key={val.id}>
                    <GoPrimitiveDot size="1.5rem" />
                    <InfoApproval className="info_approval">
                      <AvatarStatus src="/avatar.png" astatus={val} />
                      <div className="info">
                        <p className="name">{val.name}</p>
                        <p className="position">{val.job}</p>
                      </div>
                    </InfoApproval>
                  </CardChild>
                );
              })}
            </div>
          );
        })}
      </JoinGroup>
    </Approval>
  );
}

export default ApprovalFlow;

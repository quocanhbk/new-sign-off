import React, { useEffect } from "react";
import styled from "styled-components";
import { getFader } from "../../utils/color";
import AvatarStatus from "../AvatarStatus";
import {GoPrimitiveDot} from 'react-icons/all'

const Approval = styled.div`
  display:flex;
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
  border-bottom: 3px solid ${props => props.theme.color.border.primary};
  margin-top: 1rem;
  position: relative;
`;
const JoinGroup = styled.div`
  margin: 1rem;
  position:relative;

  & .ahihi{
    position: absolute;
    content: "";
    width: 3px;
    height: 150%;
    top: 50%;
    left: 0;
    background: #fff;

    &::before{
      content: "";
      position:absolute;
      left: -5.5px;
      top: 0;
      width: 1rem;
      height: 1rem;
      border-radius: 50%;
      background-color: #fff;
    }
  }
  & .ahihi2{
    position: absolute;
    content: "";
    width: 3px;
    height: 100%;
    top: 0;
    left: 0;
    background: #fff;

    &::before{
      content: "";
      position:absolute;
      left: -5.5px;
      top: 0%;
      width: 1rem;
      height: 1rem;
      border-radius: 50%;
      background-color: #fff;
    }
  }
  & .ahihi3{
    position: absolute;
    content: "";
    width: 3px;
    height: 100%;
    top: -30%;
    left: 0;
    background: #fff;

    &::before{
      content: "";
      position:absolute;
      left: -5.5px;
      bottom:0;
      width: 1rem;
      height: 1rem;
      border-radius: 50%;
      background-color: #fff;
    }
  }
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
    & .position{
      font-size: 0.9rem;
      color : ${props => props.theme.color.text.secondary}
    }
  }
`;
const ButtonRemind = styled.button`
  background-color: transparent;
  border: 1px solid ${props => props.theme.color.border.primary};
  border-radius: 4px;
  text-transform: capitalize;
  padding: 0.5rem 1rem;
  color: ${props => props.theme.color.text.secondary};
  cursor: pointer;
`;
const Flow = styled.div`
    height: 100%;
    position: absolute;
    border: 5px solid red;
    margin-top: 35px;
    overflow: hidden;
`;
const data = [
  {
    id: 1,
    submitter: [
      {
        id: 1,
        name: 'Nguyen Van Bao',
        job: 'Chuyen vien Phat trien Ung dung'
      },
    ],
    advisor : [
      {
        id: 1,
        name: 'Nguyen Van Cao',
        job: 'Truong nhom Phat trien Ung dung',
      },
      {
        id: 2,
        name: 'Le Thi Bo Cau',
        job: 'Chuyen vien HCQT'
      },
      {
        id: 1,
        name: 'Nguyen Van Cao',
        job: 'Truong nhom Phat trien Ung dung',
      },
      {
        id: 2,
        name: 'Le Thi Bo Cau',
        job: 'Chuyen vien HCQT'
      },
    ],
    approver: [
      {
        id: 1,
        name: 'Nguyen Van Gau',
        job: 'Giam doc CNTT'
      }
    ],
    observator: [
      {
        id: 1,
        name: 'Nguyen Ca Chep',
        job: 'Chuyen vien Lap Quy'
      },
      {
        id: 2,
        name: 'Nguyen Ca Ro',
        job: 'Chuyen vien Lap Quy'
      },
      {
        id: 3,
        name: 'Nguyen Ca Hoi',
        job: 'Chuyen vien Lap Quy'
      }
    ]
  }
]
function ApprovalFlow() {
  useEffect(() => {
    let position = document.querySelector(".submiter")
    console.log(position.offsetTop)
  })
  return (
    <Approval>
      <ApprovalContent className="content">
        <Flow />
        <JoinGroup>
          <div className="ahihi">
          </div>
          <TitleApproval>SUBMITER</TitleApproval>
          {data.map((value, index) => {
            return (
              <CardChild key={index}>
                <InfoApproval className="info_approval">
                  <AvatarStatus
                    src="/avatar.png"
                    status={value}
                  />
                  <div className="info">
                    <p className="name">{value.submitter[0].name}</p>
                    <p className="position">
                      {value.submitter[0].job}
                    </p>
                  </div>
                </InfoApproval>
                <ButtonRemind>remind</ButtonRemind>
              </CardChild>
            );
          })}
        </JoinGroup>
        <JoinGroup>
          <div className="ahihi2">
          </div>
          <TitleApproval>ADVISOR (2)</TitleApproval>
          {data.map((value, index) => {
            return (
              <div key={index}>
                 {
                   value.advisor.map((val) =>{
                     return (
                      <CardChild key={val.id}>
                        <InfoApproval className="info_approval">
                          <AvatarStatus
                            src="/avatar.png"
                            status={val}
                          />
                          <div className="info">
                            <p className="name">{val.name}</p>
                            <p className="position">
                              {val.job}
                            </p>
                          </div>
                        </InfoApproval>
                        <ButtonRemind>remind</ButtonRemind>
                    </CardChild>
                     )
                   })
                 }
              </div>
            );
          })}
        </JoinGroup>
        <JoinGroup>
        <div className="ahihi3">
          </div>
          <TitleApproval>APPROVER (1)</TitleApproval>
          {data.map((value, index) => {
            return (
              <div key={index}>
                 {
                   value.approver.map((val) =>{
                     return (
                      <CardChild key={val.id}>
                        <InfoApproval className="info_approval">
                          <AvatarStatus
                            src="/avatar.png"
                            status={val}
                          />
                          <div className="info">
                            <p className="name">{val.name}</p>
                            <p className="position">
                              {val.job}
                            </p>
                          </div>
                        </InfoApproval>
                        <ButtonRemind>remind</ButtonRemind>
                    </CardChild>
                     )
                   })
                 }
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
                 {
                   value.observator.map((val) =>{
                     return (
                      <CardChild key={val.id}>
                      <GoPrimitiveDot size="1.5rem"/>
                      <InfoApproval className="info_approval">
                        <AvatarStatus
                          src="/avatar.png"
                          astatus={val}
                        />
                        <div className="info">
                          <p className="name">{val.name}</p>
                          <p className="position">
                            {val.job}
                          </p>
                        </div>
                      </InfoApproval>
                    </CardChild>
                     )
                   })
                 }
              </div>
            );
          })}
        </JoinGroup>
    </Approval>
  );
}

export default ApprovalFlow;

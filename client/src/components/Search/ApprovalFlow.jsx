import React from "react";
import styled from "styled-components";
import { getFader } from "../../utils/color";
import AvatarStatus from "../AvatarStatus";

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
  border-bottom: 2px solid #807660;
  margin-top: 1rem;
  margin-left: 5%;
`;
const JoinGroup = styled.div`
  margin: 1rem;
`;
const TitleApproval = styled.h4`
  text-transform: uppercase;
  margin: 1rem 0;
`;
const CardChild = styled.div`
  display: flex;
  align-items: center;
`;
const InfoApproval = styled.div`
  display: flex;
  align-items: center;
  width: 90%;
  margin: 0.5rem 0;
  .info {
    div {
      margin: 0.5rem;
    }
  }
`;
const ContentStatus = styled.div`
  border: 1px solid #4c4c4c;
  box-sizing: border-box;
  border-radius: 2px;
  text-transform: capitalize;
  padding: 1rem 2rem;
`;
function ApprovalFlow() {
  const data = [1, 2, 3];
  return (
    <Approval>
      <ApprovalContent>
        <JoinGroup>
          <TitleApproval>SUBMITER</TitleApproval>
          {data.map((value, index) => {
            return (
              <CardChild key={index}>
                <InfoApproval className="info_approval">
                  <AvatarStatus
                    astatus={value}
                  />
                  <div className="info">
                    <div className="name">Nguyen van A {value}</div>
                    <div className="position">
                      Chuyên viên Phát triển Ứng dụng
                    </div>
                  </div>
                </InfoApproval>
                <ContentStatus>remind</ContentStatus>
              </CardChild>
            );
          })}
        </JoinGroup>
        <JoinGroup>
          <TitleApproval>ADVISOR (2)</TitleApproval>
          {data.map((value, index) => {
            return (
              <CardChild key={index}>
                <InfoApproval className="info_approval">
                  <AvatarStatus
                    astatus={value}
                  />
                  <div className="info">
                    <div className="name">Nguyen van A {value}</div>
                    <div className="position">
                      Chuyên viên Phát triển Ứng dụng
                    </div>
                  </div>
                </InfoApproval>
                <ContentStatus>remind</ContentStatus>
              </CardChild>
            );
          })}
        </JoinGroup>
        <JoinGroup>
          <TitleApproval>APPROVER (1)</TitleApproval>
          {data.map((value, index) => {
            return (
              <CardChild key={index}>
                <InfoApproval className="info_approval">
                  <AvatarStatus
                    astatus={value}
                  />
                  <div className="info">
                    <div className="name">Nguyen van A {value}</div>
                    <div className="position">
                      Chuyên viên Phát triển Ứng dụng
                    </div>
                  </div>
                </InfoApproval>
                <ContentStatus>remind</ContentStatus>
              </CardChild>
            );
          })}
        </JoinGroup>
      </ApprovalContent>
      <ApprovalContent>
        <TitleApproval>OBSERVATOR (3)</TitleApproval>
        {data.map((value, index) => {
          return (
            <JoinGroup key={index}>
              <CardChild>
                <InfoApproval className="info_approval">
                  <AvatarStatus
                    astatus={value}
                  />
                  <div className="info">
                    <div className="name">Nguyen van A {value}</div>
                    <div className="position">
                      Chuyên viên Phát triển Ứng dụng
                    </div>
                  </div>
                </InfoApproval>
                <ContentStatus>remind</ContentStatus>
              </CardChild>
            </JoinGroup>
          );
        })}
      </ApprovalContent>
      <ApprovalContent>
        <TitleApproval>OBSERVATOR (3)</TitleApproval>
        {data.map((value, index) => {
          return (
            <JoinGroup key={index}>
              <CardChild>
                <InfoApproval className="info_approval">
                  <AvatarStatus
                    astatus={value}
                  />
                  <div className="info">
                    <div className="name">Nguyen van A {value}</div>
                    <div className="position">
                      Chuyên viên Phát triển Ứng dụng
                    </div>
                  </div>
                </InfoApproval>
                <ContentStatus>remind</ContentStatus>
              </CardChild>
            </JoinGroup>
          );
        })}
      </ApprovalContent>
    </Approval>
  );
}

export default ApprovalFlow;

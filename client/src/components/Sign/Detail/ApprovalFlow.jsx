/* eslint-disable no-unused-vars */
import React, { useEffect, useRef, useState } from "react";
import styled from "styled-components";
import { getFader } from "utils/color";
import { BiCheck } from "react-icons/all";
import FlowTag from "./FlowTag";
import data from './sampleData'

const Approval = styled.div`
  display: flex;
  flex-direction: column;
  flex: 1;
  padding: 1rem;
  overflow: auto;
  position: relative;
  gap: 1rem;
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
  border-bottom: 1px solid ${(props) => props.theme.color.border.primary};
  position: relative;
  display: flex;
  flex-direction: column;
  gap: 1rem;
`;
const JoinGroup = styled.div`
  margin-left: 3rem;
  position: relative;
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
  margin-bottom: 0.5rem;
  & h4 {
    font-weight: 500;
    color: ${props => props.theme.color.fill.secondary};
    font-size: 1.1rem;
  }
`;
const Flow = styled.div`
  height: ${props => props.height}px;
  position: absolute;
  border-left: 0.2rem solid ${props => props.theme.color.fill.primary};
  top: ${(props) => props.top}px;
  overflow: hidden;
  left: ${props => props.left}px;
  transform: translateX(-50%);
`;
const Circle = styled.div`
  width: 2rem;
  height: 2rem;
  background: ${props => props.theme.color.background.primary};
  position: absolute;
  top: ${(props) => props.top}px;
  border-radius: 50%;
  left: 0;
  border: 2px solid ${props => props.theme.color.fill.primary};
  display: grid;
  place-items: center;
  color : ${props => props.theme.color.fill.success};
  z-index: 2;
  &:after {
    content: '';
    position: absolute;
    width: 100%;
    height: 2px;
    background: ${props => props.theme.color.fill.primary};
    right: -1px;
    transform: translate(100%, 0%);
    z-index: 1;
  }
`;

function ApprovalFlow() {
  const [position1, setPosition1] = useState(0);
  const [position2, setPosition2] = useState(0);
  const [position3, setPosition3] = useState(0);
  const [flowHeight, setFlowHeight] = useState(0)
  const [flowLeft, setFlowLeft] = useState(0)

  const submitterRef = useRef()
  const advisorRef = useRef()
  const approverRef = useRef()
  const contentRef = useRef()
  const dotRef = useRef()
  useEffect(() => {
    let submitterRect = submitterRef.current.getBoundingClientRect()
    let advisorRect = advisorRef.current.getBoundingClientRect()
    let approverRect = approverRef.current.getBoundingClientRect()
    let contentRect = contentRef.current.getBoundingClientRect()
    let dotRect = dotRef.current.getBoundingClientRect()

    setPosition1(submitterRect.y - contentRect.y + 4)
    setPosition2(advisorRect.y - contentRect.y + 4)
    setPosition3(approverRect.y - contentRect.y + 4)
    setFlowHeight(position3 - position1)
    setFlowLeft(dotRect.left - contentRect.left + dotRect.width/2)
  });
  return (
    <Approval>
      <ApprovalContent className="content" ref={contentRef}>
        {/* draw flow */}
        <Flow top={position1 + 5} height={flowHeight} left={flowLeft}/>
        <Circle top={position1} ref={dotRef} ><BiCheck size="1.5rem"/></Circle>
        <Circle top={position2}><BiCheck size="1.5rem"/></Circle>
        <Circle top={position3}><BiCheck size="1.5rem"/></Circle>
        {/* end draw flow */}
        <JoinGroup>
          <h4>Submitter</h4>
          <FlowTag reff={submitterRef} data={data.submitter}/>
        </JoinGroup>
        <JoinGroup>
          <h4>Advisor (2)</h4>
          {data.advisor.map((advisor, index) => <FlowTag key={advisor.id} reff={index === 0 ? advisorRef : null} data={advisor}/>)}
        </JoinGroup>
        <JoinGroup>
          <h4>Approver (1)</h4>
          {data.approver.map((approver, index) => <FlowTag key={approver.id} reff={index === 0 ? approverRef : null} data={approver}/>)}
        </JoinGroup>
      </ApprovalContent>
      <JoinGroup>
        <h4>Observator (1)</h4>
        {data.observator.map((observator, index) => <FlowTag key={observator.id} data={observator}/>)}
      </JoinGroup>
    </Approval>
  );
}

export default ApprovalFlow;

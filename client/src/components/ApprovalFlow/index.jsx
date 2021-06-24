/* eslint-disable react/prop-types */
import baseURL from 'api/baseURL';
import Avatar from 'components/Avatar';
import { UserDisplayCardInfo } from 'components/SideBar';
import { UserDisplayCard } from 'components/SideBar';
import React from 'react'
import styled from "styled-components";
import { getFader } from 'utils/color';
import FlowSection from './FlowSection';

const Container = styled.div`
    display:flex;
    flex-direction: column;
    flex: 1;
    padding: 1rem;
    gap: 1rem;
    height: 100%;
    overflow: auto;

    ::-webkit-scrollbar {
        width: 0.5rem;
    }
    ::-webkit-scrollbar-track {
        background: transparent;
    }
    ::-webkit-scrollbar-thumb {
        background: ${props => getFader(props.theme.color.fill.secondary, 0.5)};
        border-radius: 99px;
    }
    ::-webkit-scrollbar-thumb:hover {
        background: ${props => props.theme.color.fill.secondary};
    }
    & table {
        border-collapse: collapse;
    }
`

const Headline = styled.div`
    padding: 0.5rem;
    font-weight: 600;
    color: ${props => props.theme.color.fill.primary};
    //border: 1px solid black;
`;

const ObservatorsWrapper = styled.div`
`

const Divider = styled.div`
    height: 2px;
    width: 96%;
    margin-top: 2rem;
    margin-left: auto;
    margin-right: auto;
    background-color: ${props => props.theme.color.fill.primary};
`;
const ApprovalFlow = ({submitter, advisors, approvers, observators}) => {
    return (
      <Container>
        <table>
          <tbody>
            <FlowSection
              headline="Submitter"
              data={submitter}
              type="submitter"
              done={true}
            />
            {advisors && advisors.length > 0 && (
              <FlowSection headline="Advisor" data={advisors} type="advisor" done={advisors.every(advisor => advisor.decision === 'Approved')} />
            )}
            <FlowSection headline="Approver" data={approvers} type="approver" done={approvers.every(approver => approver.decision === 'Approved')} />
          </tbody>
        </table>
        <Divider />
        <Headline>Observators</Headline>
        <ObservatorsWrapper>
          {observators.map((obs) => (
            <UserDisplayCard key={obs.email}>
              <Avatar
                src={`${baseURL}/api/v1/avatar/${obs.email}`}
              />
              <UserDisplayCardInfo>
                <h3>{obs.fullname}</h3>
                <p>{obs.email}</p>
              </UserDisplayCardInfo>
            </UserDisplayCard>
          ))}
        </ObservatorsWrapper>
      </Container>
    );
}

export default ApprovalFlow
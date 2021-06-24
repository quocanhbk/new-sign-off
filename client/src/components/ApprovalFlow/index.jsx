/* eslint-disable react/prop-types */
import baseURL from 'api/baseURL';
import Avatar from 'components/Avatar';
import { UserDisplayCardInfo } from 'components/SideBar';
import { UserDisplayCard } from 'components/SideBar';
import React from 'react'
import styled from "styled-components";
import FlowSection from './FlowSection';

const Container = styled.div`
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
              <FlowSection headline="Advisor" data={advisors} type="advisor" />
            )}
            <FlowSection headline="Approver" data={approvers} type="approver" />
          </tbody>
        </table>
        <Divider />
        <Headline>Observators</Headline>
        <ObservatorsWrapper>
          {observators.map((obs) => (
            <UserDisplayCard key={obs.email}>
              <Avatar
                src={
                  baseURL + '/api/v1/avatar/' + obs.fullname + '/48x48'
                }
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
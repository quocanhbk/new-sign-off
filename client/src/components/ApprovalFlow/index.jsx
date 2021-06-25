/* eslint-disable no-unused-vars */
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
    align-items: center;
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
    height: 1px;
    width: 50%;
    margin-top: 2rem;
    margin-left: auto;
    margin-right: auto;
    background-color: ${props => props.theme.color.border.primary};
`;
const ApprovalFlow = ({submitter, advisors, approvers, observators, currentApprover}) => {
    return (
		<Container>
			<table>
				<tbody>
					<FlowSection
						headline="Submitter"
						data={submitter}
						type="submitter"
					/>
					{advisors && advisors.length > 0 && (
						<FlowSection 
							headline="Advisors" 
							data={advisors} 
							type="advisor" 
							currentApprover={currentApprover}
						/>
					)}
					<FlowSection
						headline="Approvers" 
						data={approvers} 
						type="approver" 
						currentApprover={currentApprover}
					/>
					{observators.length > 0 && 
					<FlowSection
						headline="Observators"
						data={observators}
						type="observator"
					/>}
				</tbody>
			</table>
		</Container>
    );
}

export default ApprovalFlow
/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import React, {memo} from 'react';
import styled from 'styled-components'
import ControlledCombox from '../ControlledCombox'
import FormControl from '../FormControl';
import {useStoreState} from 'easy-peasy'
import baseURL from 'api/baseURL';
const Container = styled.div`
    display: flex;
    flex-direction: column;
    & > * + * {
		margin-top: 0.5rem;
	}
`
const TagContainer = styled.div`
    display: flex;
    height: 100%;
    align-items: center;
    & > * + * {
		margin-left: 0.5rem;
	}
    & img {
        height: 1.2rem;
        border-radius: 99px;
    }
`
const Tag = ({email, name}) => {
    return (
        <TagContainer>
            <img src={baseURL + "/api/v1/avatar/" + email} alt="" loading="lazy"/>
            <p>{name}</p>
        </TagContainer>
    )
}
const Participants = ({advisors, approvers, observators, set, error, mode}) => {
    
    const users = useStoreState(s => s.users).map(s => ({...s, display: <Tag email={s.email} name={s.name}/>}))
    const readOnly = mode === "revise"
    return (
        <Container>
            <FormControl 
                headline={"Advisor List"} 
                errorText={advisors.some(v => approvers.concat(observators).includes(v)) && "Duplicate"}
            >
                <ControlledCombox
                    multiple searchable
                    selection={users}
                    value={users.filter(u => advisors.includes(u.id))}
                    onSelect={newValue => set("advisors", newValue.map(_ => _.id))}
                    displayField={"display"}
                    readOnly={readOnly}
                />
            </FormControl>
            <FormControl 
                headline={"Approver List"} 
                required 
                errorText={
                    (approvers.some(v => advisors.concat(observators).includes(v)) && "Duplicate") ||
                    error.approvers
                }
            >
                <ControlledCombox
                    multiple searchable
                    selection={users}
                    value={users.filter(u => approvers.includes(u.id))}
                    onSelect={newValue => set("approvers", newValue.map(_ => _.id))}
                    displayField={"display"}
                    readOnly={readOnly}
                />
            </FormControl>
            <FormControl 
                headline={"Observator List"} 
                errorText={observators.some(v => advisors.concat(approvers).includes(v)) && "Duplicate"}
            >
                <ControlledCombox
                    multiple searchable
                    selection={users}
                    value={users.filter(u => observators.includes(u.id))}
                    onSelect={newValue => set("observators", newValue.map(_ => _.id))}
                    displayField={"display"}
                    readOnly={readOnly}
                />
            </FormControl>
        </Container>
    );
};

export default memo(Participants)
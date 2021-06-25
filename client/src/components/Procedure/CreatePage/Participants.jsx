/* eslint-disable react/prop-types */
import React from 'react';
import styled from 'styled-components'
import ControlledCombox from 'components/ControlledCombox'
import FormControl from 'components/FormControl'
import { useStoreState } from 'easy-peasy';
import baseURL from 'api/baseURL';

const Container = styled.div`
    display: flex;
    flex-direction: column;
    gap: 0.5rem;
`
const TagContainer = styled.div`
    display: flex;
    height: 100%;
    align-items: center;
    gap: 0.5rem;
    & img {
        height: 1.2rem;
        border-radius: 99px;
    }
`
const Tag = ({email, name}) => {
    return (
        <TagContainer>
            <img src={baseURL + "/api/v1/avatar/" + email} alt="" loading="lazy"/>
            {name}
        </TagContainer>
    )
}

const Participants = ({advisors, approvers, observators, set}) => {
    const users = useStoreState(s => s.users).map(s => ({...s, display: <Tag email={s.email} name={s.name}/>}))

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
                />
            </FormControl>
            <FormControl 
                headline={"Approver List"}
                errorText={approvers.some(v => advisors.concat(observators).includes(v)) && "Duplicate"}
            >
                <ControlledCombox
                    multiple searchable
                    selection={users}
                    value={users.filter(u => approvers.includes(u.id))}
                    onSelect={newValue => set("approvers", newValue.map(_ => _.id))}
                    displayField={"display"}
                />
            </FormControl>
            <FormControl 
                headline={"Observator List"}
                errorText={observators.some(v => approvers.concat(advisors).includes(v)) && "Duplicate"}
            >
                <ControlledCombox
                    multiple searchable
                    selection={users}
                    value={users.filter(u => observators.includes(u.id))}
                    onSelect={newValue => set("observators", newValue.map(_ => _.id))}
                    displayField={"display"}
                />
            </FormControl>
        </Container>
    );
}

export default Participants;
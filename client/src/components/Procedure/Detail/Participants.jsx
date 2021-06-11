/* eslint-disable react/prop-types */
import React from 'react';
import styled from 'styled-components'
import ControlledCombox from '../../ControlledCombox'
import FormControl from './FormControl';
import {userList} from '../sampleData'

const Container = styled.div`
    display: flex;
    flex-direction: column;
    gap: 0.5rem;
`

const Participants = ({data}) => {
    return (
        <Container>
            <FormControl headline={"Advisor List"}>
                <ControlledCombox
                    multiple searchable
                    selection={userList}
                    value={data.advisors}
                    onSelect={newValue => data.setAdvisors(newValue)}
                    displayField={"name"}
                />
            </FormControl>
            <FormControl headline={"Approver List"} required>
                <ControlledCombox
                    multiple searchable
                    selection={userList}
                    value={data.approvers}
                    onSelect={newValue => data.setApprovers(newValue)}
                    displayField={"name"}
                />
            </FormControl>
            <FormControl headline={"Observator List"}>
                <ControlledCombox
                    multiple searchable
                    selection={userList}
                    value={data.observators}
                    onSelect={newValue => data.setObservators(newValue)}
                    displayField={"name"}
                />
            </FormControl>
        </Container>
    );
}

export default Participants;
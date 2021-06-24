/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import React, {memo } from 'react';
import styled from 'styled-components'
import useFocus from '../../hooks/useFocus';
import ControlledCombox from '../ControlledCombox'
import Calendar from '../TeamsCalendar'
import FormControl from '../FormControl';
import {approvalTypeList, priorityList, projectList} from 'constant'
const Container = styled.div`
    display: flex;
    flex-direction: column;
    gap: 0.5rem;
`

const Row = styled.div`
    display:flex;
    justify-content:space-between;
    gap: 1rem;
`

const Input = styled.input`
    background-color: ${props=> props.theme.color.background.secondary};
    color : ${props => props.theme.color.text.primary};
    border: 1px solid ${props => props.theme.color.border.primary};
    outline: none;
    border-radius: 4px;
    padding: 0.4em 0.8em;
    font-size: 1rem;
    font-weight: 400;

    &:focus{
        border: 1px solid ${props => props.theme.color.fill.primary};
    }
`

const PrimaryInfo = ({title, type, priority, deadline, relatedProjects, set, error, procedureList, procedure}) => {
    
    let ref = useFocus()
    
    return (
        <Container>
            <Row>
                <FormControl headline="Document Title" required errorText={error.title}>
                    <Input 
                        ref={ref}
                        value={title} 
                        onChange={(e) => set("title", e.target.value)} 
                        placeholder="Input document title..."
                        spellCheck="false"
                    />
                </FormControl>
            </Row>
            <Row>
                <FormControl headline="Type" required>
                    <ControlledCombox 
                        selection={approvalTypeList}
                        value={approvalTypeList.find(a => a.id === type)}
                        onSelect={newValue => set("type", newValue.id)}
                    />
                </FormControl>
                <FormControl headline="Procedure" required disabled={type !== "Procedure"} errorText={error.procedure}>
                    <ControlledCombox
                        selection={procedureList}
                        value={procedureList.find(p => p.id === procedure)}
                        onSelect={newValue => set("procedure", newValue.id)}
                        displayField={"title"}
                        disabled={type !== "Procedure"}
                    />
                </FormControl>
            </Row>
            <Row>
                <FormControl headline={"Priority"} required>
                    <ControlledCombox 
                        selection={priorityList} 
                        value={priorityList.find(p => p.id === priority)}
                        onSelect={newValue => set("priority", newValue.id)}
                    />
                </FormControl>
                <FormControl headline={"Deadline"} sub={"Expected date to receive final approval"} required errorText={error.deadline}>
                    <Calendar fullWidth value={deadline} onChange={v => set("deadline", v)}/>
                </FormControl>
                <FormControl headline={"Related Project"} required errorText={error.relatedProjects}>
                    <ControlledCombox 
                        multiple
                        selection={projectList}
                        value={projectList.filter(p => relatedProjects.includes(p.id))}
                        onSelect={newValue => set("relatedProjects", newValue.map(_ => _.id))}
                    /> 
                </FormControl>
            </Row>
        </Container>

    );
}

export default memo(PrimaryInfo);
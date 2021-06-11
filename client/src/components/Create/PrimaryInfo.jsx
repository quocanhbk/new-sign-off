/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import React, { useEffect, useRef, useState } from 'react';
import styled from 'styled-components'
import Combox from '../Combox'
import ControlledCombox from '../ControlledCombox'
import Calendar from '../TeamsCalendar'
import {procedureList} from './sampleData'
import FormControl from './FormControl';
import {approvalTypeList, priorityList, projectList} from './localData'
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

const PrimaryInfo = ({data}) => {
    const inputRef = useRef()
    useEffect(() => {
        inputRef.current.focus()
    }, [])
    return (
        <Container>
            <Row>
                <FormControl headline="Document Title" required>
                    <Input 
                        ref={inputRef}
                        value={data.title} 
                        onChange={(e) => data.setTitle(e.target.value)} 
                        placeholder="Input document title..."
                        spellCheck="false"
                    />
                </FormControl>
            </Row>
            <Row>
                <FormControl headline="Approval Type" required>
                    <ControlledCombox 
                        selection={approvalTypeList}
                        value={approvalTypeList.find(a => a.id === data.approvalType)}
                        onSelect={newValue => data.setApprovalType(newValue.id)}
                    />
                </FormControl>
                {data.approvalType === "process" &&
                    <FormControl headline="Process Name" required>
                        <Combox onSelect={v => data.setProcess(v[0])}>
                            {procedureList.map((procedure) =>
                                <Combox.Option default={data.process && data.process.id === procedure.id} id={procedure.id}
                                    value={procedure}    
                                    key={procedure.id}
                                >
                                    {procedure.name}
                                </Combox.Option>
                            )}
                        </Combox>
                    </FormControl>
                }
            </Row>
            <Row>
                <FormControl headline={"Priority"} required>
                    <ControlledCombox 
                        selection={priorityList} 
                        value={priorityList.find(p => p.id === data.priority)}
                        onSelect={newValue => data.setPriority(newValue.id)}
                    />
                </FormControl>
                <FormControl headline={"Deadline"} sub={"Expected date to receive final approval"} required>
                    <Calendar fullWidth value={data.deadline} onChange={v => data.setDeadline(v)}/>
                </FormControl>
                <FormControl headline={"Related Project"} required>
                    <ControlledCombox 
                        selection={projectList}
                        value={projectList.find(p => p.id === data.relatedProject)}
                        onSelect={newValue => data.setRelatedProject(newValue.id)}
                    /> 
                </FormControl>
            </Row>
        </Container>

    );
}

export default PrimaryInfo;
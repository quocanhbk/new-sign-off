/* eslint-disable react/prop-types */
import React from 'react'
import styled from 'styled-components'
import FormControl from 'components/FormControl'
import ControlledCombox from 'components/ControlledCombox'
import {priorityList, approvalTypeList, projectList} from 'constant'
const Container = styled.div`
    width: 15rem;
    text-align: left;
`
const Title = styled.p`
    background: ${props => props.theme.color.background.secondary};
    border-bottom: 1px solid ${props => props.theme.color.border.primary};
    text-align: center;
    padding: 0.5rem 1rem;
    font-weight: 500;
`
const Body = styled.div`
    padding: 0.5rem;
`
const statusSelection = [
    {id: "Draft", text: "Draft"},
    {id: "Pending", text: "Pending"},
    {id: "Approved", text: "Approved"},
    {id: "Rejected", text: "Rejected"},
]
const FilterPopup = ({query, set}) => {
    return (
        <Container>
            <Title>Filter</Title>
            <Body>
                <FormControl headline="Status">
                    <ControlledCombox
                        removable={true}
                        selection={statusSelection}
                        value={statusSelection.find(q => q.id === query.status.value)}
                        onSelect={v => set("status", v ? v.id : null)}
                    />
                </FormControl>
                <FormControl headline="Approval Type">
                    <ControlledCombox
                        removable={true}
                        selection={approvalTypeList}
                        value={approvalTypeList.find(q => q.id === query.type.value)}
                        onSelect={v => set("type", v ? v.id : null)}
                    />
                </FormControl>
                <FormControl headline="Priority">
                    <ControlledCombox
                        removable={true}
                        selection={priorityList}
                        value={priorityList.find(q => q.id === query.priority.value)}
                        onSelect={v => set("priority", v ? v.id : null)}
                    />
                </FormControl>
                <FormControl headline="Project">
                    <ControlledCombox
                        removable={true}
                        selection={projectList}
                        value={projectList.find(q => q.id === query.project.value)}
                        onSelect={v => set("project", v ? v.id : null, v ? v.text : "")}
                    />
                </FormControl>
            </Body>
        </Container>
    )
}

export default FilterPopup
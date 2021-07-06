/* eslint-disable react/prop-types */
import React from 'react'
import styled from 'styled-components'
import FormControl from 'components/FormControl'
import ControlledCombox from 'components/ControlledCombox'
import {priorityList, approvalTypeList, projectList} from 'constant'
import SettingContainer from './SettingContainer'
const Container = styled.div`
    width: 100%;
    text-align: left;
    border-radius: 0.5rem 0.5rem 0 0;
    padding-bottom: 0.5rem;
`
const Title = styled.p`
    background: ${props => props.theme.color.background.secondary};
    border-bottom: 1px solid ${props => props.theme.color.border.primary};
    text-align: center;
    padding: 0.5rem 1rem;
    font-weight: 500;
    border-radius: 0.5rem 0.5rem 0 0;
`
const Body = styled.div`
    padding: 0.5rem;
    display: flex;
    flex-direction: column;
    & > * + * {
		margin-top: 1rem;
	}
`
const statusSelection = [
    {id: "Draft", text: "Draft"},
    {id: "Pending", text: "Pending"},
    {id: "Approved", text: "Approved"},
    {id: "Rejected", text: "Rejected"},
    {id: "Revising", text: "Revising"},
]
const sortSelection = [
    {id: "updated_at", text: "Updated Time"},
    {id: "created_at", text: "Created Time"},
    {id: "deadline", text: "Deadline"},
]
const sortOrderSelection = [
    {id: "asc", text: "Ascending"},
    {id: "desc", text: "Descending"}
]
const FilterPopup = ({query, set}) => {
    return (
        <Container>
            <Title>View Setting</Title>
            <Body>
                <SettingContainer headline="Filter">
                    <FormControl headline="Status" noSpace>
                        <ControlledCombox
                            removable={true}
                            selection={statusSelection}
                            value={statusSelection.find(q => q.id === query.status.value)}
                            onSelect={v => set("status", v ? v.id : null)}
                        />
                    </FormControl>
                    <FormControl headline="Approval Type" noSpace>
                        <ControlledCombox
                            removable={true}
                            selection={approvalTypeList}
                            value={approvalTypeList.find(q => q.id === query.type.value)}
                            onSelect={v => set("type", v ? v.id : null)}
                        />
                    </FormControl>
                    <FormControl headline="Priority" noSpace>
                        <ControlledCombox
                            removable={true}
                            selection={priorityList}
                            value={priorityList.find(q => q.id === query.priority.value)}
                            onSelect={v => set("priority", v ? v.id : null)}
                        />
                    </FormControl>
                    <FormControl headline="Project" noSpace>
                        <ControlledCombox
                            removable={true}
                            selection={projectList}
                            value={projectList.find(q => q.id === query.project.value)}
                            onSelect={v => set("project", v ? v.id : null, v ? v.text : "")}
                        />
                    </FormControl>
                </SettingContainer>
                <SettingContainer headline="Sort">
                    <FormControl headline="Sort By" noSpace>
                        <ControlledCombox
                            selection={sortSelection}
                            value={sortSelection.find(s => s.id === query.sortBy.value)}
                            onSelect={v => set("sortBy", v.id, v.id)}
                        />
                    </FormControl>
                    <FormControl headline="Sort Order" noSpace>
                        <ControlledCombox
                            selection={sortOrderSelection}
                            value={sortOrderSelection.find(s => s.id === query.sortOrder.value)}
                            onSelect={v => set("sortOrder", v.id, v.id)}
                        />
                    </FormControl>
                </SettingContainer>
            </Body>
        </Container>
    )
}

export default FilterPopup
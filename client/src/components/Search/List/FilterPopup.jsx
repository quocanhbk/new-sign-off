/* eslint-disable react/prop-types */
import React from 'react'
import styled from 'styled-components'
import FormControl from 'components/FormControl'
import ControlledCombox from 'components/ControlledCombox'
const Container = styled.div`
    width: 20rem;
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
    padding: 1rem;
`

const FilterPopup = ({statusSelection}) => {
    return (
        <Container>
            <Title>Filter</Title>
            <Body>
                <FormControl headline="Status" noSpace>
                    <ControlledCombox
                        selection={statusSelection.map(s => ({id: s, text: s}))}
                        
                    />
                </FormControl>
            </Body>
        </Container>
    )
}

export default FilterPopup
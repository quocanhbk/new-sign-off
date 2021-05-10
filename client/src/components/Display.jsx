import React from 'react'
import styled from 'styled-components'
import TableBody from './TableBody'
import TableHead from './TableHead'

const StyledDisplay = styled.div`
    padding: 0.5rem;
    height: 100%;
`
const StyledTable = styled.table`
    color: ${props => props.theme.color.text.primary};
    width: 100%;
    border-radius: 0.5rem;
    border-collapse: collapse;    
    table-layout: fixed;
`
const TableWrapper = styled.div`
    height: 70%;
    border: 1px solid ${props => props.theme.color.border.primary};
    overflow: auto;
    &::-webkit-scrollbar {
        width: 0.6rem;
    }
    &::-webkit-scrollbar-track {
        background: transparent;
    }
    &::-webkit-scrollbar-thumb {
        background: ${props => props.theme.color.fill.secondary};
        border-radius: 99px;
    }
    &::-webkit-scrollbar-thumb:hover {
        background: ${props => props.theme.color.fill.primary};
    }
`
const Display = () => {
    return (
        <StyledDisplay>
            <TableWrapper>
                <StyledTable>
                    <TableHead/>
                    <TableBody/>
                </StyledTable>
            </TableWrapper>
        </StyledDisplay>
    )
}

export default Display
/* eslint-disable react/prop-types */
import React from 'react';
import styled from 'styled-components'
import Table from '../Table'

const TableWrapper = styled.div`
    border: 2px solid ${(props) => props.theme.color.border.primary};
    padding: 0.5rem;
    & .data-field{
        display:flex;

    }

    & p{
        color: ${props => props.theme.color.text.secondary};
    }
`
const TableInfo = styled.div`
    padding: 0.5rem 0;
`
const TableTitle = styled.h4`
    color: ${props => props.theme.color.text.secondary};
    padding: 0.3rem 0;
`
const StyleButton = styled.button`
    background : transparent;
    color: ${props => props.theme.color.text.secondary};


    border: 1px solid ${(props) => props.theme.color.border.primary};
    padding: 0.3rem 1rem;

    cursor: pointer;
`
function TableReference({dataList}) {
    return (
        <TableWrapper className='table-list-1'>
            <TableInfo>
                <TableTitle>REFERENCE DOCUMENT ({dataList.length})</TableTitle>
            </TableInfo>
            <Table>
                <Table.Header>
                    <Table.Row>
                        <Table.HeaderCell textAlign="left" width="90%">
                            Name
                        </Table.HeaderCell>
                        <Table.HeaderCell textAlign="left" width="10%">
                            Action
                        </Table.HeaderCell>
                    </Table.Row>
                </Table.Header>
                <Table.Body>
                    {dataList.map((val, keys) => {
                        return (
                        <Table.Row
                            key={keys}
                        >
                            <Table.Cell textAlign="left">
                            <p>{val.name}</p>
                            </Table.Cell>
                            <Table.Cell textAlign="left">
                                <StyleButton>Detail</StyleButton>
                            </Table.Cell>
                        </Table.Row>
                        );
                    })}
                </Table.Body>
            </Table>
        </TableWrapper>
    );
}

export default TableReference;
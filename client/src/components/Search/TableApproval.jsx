/* eslint-disable react/prop-types */
import React from 'react';
import styled from 'styled-components'
import Table from '../Table'

const TableWrapper = styled.div`


    & .data-field{
        display:flex;
    }
`
function TableApproval({dataList}) {
    return (
        <TableWrapper className='table-list-1'>
            <Table>
                <Table.Header>
                    <Table.Row>
                        <Table.HeaderCell textAlign="left" width="30%">
                            Name
                        </Table.HeaderCell>
                        <Table.HeaderCell textAlign="left" width="60%">
                            Data Field
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
                            {val.name}
                            </Table.Cell>
                            <Table.Cell textAlign="left">
                            {
                                (val.data_field && val.data_field.length > 0)
                                ?
                                    val.data_field.map((val) => {
                                        return(
                                            <span className='data-field' key={val.id}>
                                                <p>{val.name + ': '}</p>
                                                <p>{val.value}</p>
                                            </span>
                                        )
                                    }) 
                                    :
                                "N/A"
                            }
                            </Table.Cell>
                            {status !== "4" ? (
                            <Table.Cell textAlign="left">
                            
                            </Table.Cell>
                            ) : (
                            <Table.Cell textAlign="left">
                                
                            </Table.Cell>
                            )}
                        </Table.Row>
                        );
                    })}
                </Table.Body>
            </Table>
        </TableWrapper>
    );
}

export default TableApproval;
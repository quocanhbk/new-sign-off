/* eslint-disable react/prop-types */
import React from 'react';
import Table from '../Table';
import styled from 'styled-components'
import {AiOutlineDelete} from 'react-icons/all'

const TableWrapper = styled.div`
    border: 1px solid ${(props) => props.theme.color.border.primary};
    box-shadow: 0px 3px 4px rgba(0, 0, 0, 0.25);

    padding: 0.5rem;
`;

const TableField = styled.table`
  & th {
    vertical-align: top;
  }
  & .field-value {
    font-weight: normal;
  }
`;
const ButtonRemove = styled.button`
    background-color: transparent;
    color: ${props => props.theme.color.fill.danger};

    border: none;
    cursor: pointer;
`
function TableApproval({data,setData}) {

    const removeItem = (value) =>{
       console.log(value)
       setData(data.filter(item => item.id !== value.id))
    }
    return (
        <TableWrapper className="table-list-1">
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
                {data.map((val, keys) => {
                    return (
                    <Table.Row key={keys}>
                        <Table.Cell textAlign="left">
                        <p>{val.name}</p>
                        </Table.Cell>
                        <Table.Cell textAlign="left">
                        {val.data_field && val.data_field.length > 0 ? (
                            val.data_field.map((val) => {
                            return (
                                <TableField
                                className="table-data-field"
                                key={val.id}
                                style={{ width: "100%" }}
                                >
                                <tbody>
                                    <tr>
                                    <th style={{ width: "35%",textAlign: "left" }}>
                                        <p>{val.name + ":"}</p>
                                    </th>
                                    <th>
                                        <p className="field-value">{(val.value !== '') ? val.value : 'N/A'}</p>
                                    </th>
                                    </tr>
                                </tbody>
                                </TableField>
                            );
                            })
                        ) : (
                            <p className="field-value">N/A</p>
                        )}
                        </Table.Cell>
                        <Table.Cell textAlign="left">
                            <ButtonRemove onClick={() => removeItem(val)}><AiOutlineDelete size="1.5rem"/></ButtonRemove>
                        </Table.Cell>
                    </Table.Row>
                    );
                })}
                </Table.Body>
            </Table>
        </TableWrapper>
    );
}

export default TableApproval;
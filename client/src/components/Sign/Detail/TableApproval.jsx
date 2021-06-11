/* eslint-disable react/prop-types */
import React from "react";
import styled from "styled-components";
import { getFader } from "../../../utils/color";
import Table from "../../Table";

const TableWrapper = styled.div`
    border: 1px solid ${(props) => props.theme.color.border.primary};

    & .header-cell {
      background: ${props => getFader(props.theme.color.border.primary, 0.5)};
    }
`;

const TableField = styled.table`
  width: 100%;
  & th {
    vertical-align: top;
  }
  & .field-value {
    font-weight: normal;
  }
  & .field-name {
    font-weight: 500;
    color: ${props => props.theme.color.fill.secondary};
  }
`;

const StyleButton = styled.button`
  background: ${props => getFader(props.theme.color.border.primary, 0.2)};
  color: ${(props) => props.theme.color.text.primary};
  border: none;
  border: 1px solid ${(props) => props.theme.color.border.primary};
  padding: 0.3rem 1rem;
  cursor: pointer;
  &:hover {
    background: ${props => getFader(props.theme.color.border.primary, 0.5)};
  }
  &:active {
    background: ${props => getFader(props.theme.color.border.primary, 1)};
  }
`;
function TableApproval({ dataList }) {
  return (
    <TableWrapper className="table-list-1">
      <Table>
        <Table.Header>
          <Table.Row>
            <Table.HeaderCell className="header-cell" textAlign="left" width="30%">
              File Name
            </Table.HeaderCell>
            <Table.HeaderCell className="header-cell" textAlign="left" width="60%">
              Data Field
            </Table.HeaderCell>
            <Table.HeaderCell className="header-cell" textAlign="center" width="10%">
              Action
            </Table.HeaderCell>
          </Table.Row>
        </Table.Header>
        <Table.Body>
          {dataList.map(val =>
              <Table.Row key={val.id}>
                <Table.Cell textAlign="left">
                  <p>{val.name}</p>
                </Table.Cell>
                <Table.Cell textAlign="left">
                  {val.data_field && (
                    val.data_field.map((val) =>
                        <TableField key={val.id}>
                          <tbody>
                            <tr>
                              <th style={{ width: "35%",textAlign: "left" }}>
                                <p className="field-name">{val.name + ":"}</p>
                              </th>
                              <th>
                                <p className="field-value">{val.value}</p>
                              </th>
                            </tr>
                          </tbody>
                        </TableField>
                    )
                  )}
                </Table.Cell>
                <Table.Cell textAlign="center">
                  <StyleButton>Detail</StyleButton>
                </Table.Cell>
              </Table.Row>
          )}
        </Table.Body>
      </Table>
    </TableWrapper>
  );
}

export default TableApproval;

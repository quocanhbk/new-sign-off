/* eslint-disable react/prop-types */
import React from 'react';
import Table from '../Table';
import styled from 'styled-components'
import {AiOutlineDelete,VscFilePdf,BiDotsVerticalRounded} from 'react-icons/all'

const TableWrapper = styled.div`
    border: 1px solid ${(props) => props.theme.color.border.primary};
    box-shadow: 0px 3px 4px rgba(0, 0, 0, 0.25);

    margin-top: 1rem;
    padding: 0.5rem;
`;

const DivButton = styled.div`
    display:flex;
    justify-content: space-around;
`
const ButtonRemove = styled.button`
    background-color: transparent;
    color: ${props => props.theme.color.fill.danger};

    border: none;
    cursor: pointer;
`
const ButtonDetail = styled.button`
    background-color: transparent;
    color: ${props => props.theme.color.fill.primary};

    border: none;
    cursor: pointer;
`
function TableReference({data,setData}) {

    const removeItem = (value) =>{
       console.log(value)
       setData(data.filter(item => item.id !== value.id))
    }
    return (
        <TableWrapper className="table-list-1">
            <Table>
                <Table.Header>
                <Table.Row>
                    <Table.HeaderCell textAlign="left" width="90%">
                    Name
                    </Table.HeaderCell>
                    <Table.HeaderCell textAlign="center" width="10%">
                    Action
                    </Table.HeaderCell>
                </Table.Row>
                </Table.Header>
                <Table.Body>
                {data.map((val, keys) => {
                    return (
                    <Table.Row key={keys}>
                        <Table.Cell textAlign="left">
                            <p><VscFilePdf size="18px" style={{marginRight: '0.2rem'}}/>{val.name}</p>
                        </Table.Cell>
                        <Table.Cell textAlign="left">
                            <DivButton>
                                <ButtonRemove onClick={() => removeItem(val)}><AiOutlineDelete size="1.5rem"/></ButtonRemove>
                                <ButtonDetail><BiDotsVerticalRounded size="1.5rem"/></ButtonDetail>
                            </DivButton>
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
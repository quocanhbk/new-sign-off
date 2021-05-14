/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import React, { useEffect, useState } from 'react';
import Table from '../Table';
import styled from 'styled-components'
import {AiOutlineDelete,VscFilePdf,BiDotsVerticalRounded,BiSquare,BiCheckSquare} from 'react-icons/all'

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
    color: ${props => props.theme.color.text.primary};

    border: none;
    cursor: pointer;
`
const LabelFile = styled.label`
    cursor: pointer;
    background-color: ${props => props.theme.color.fill.success};
    color: ${props => props.theme.color.background.primary};
    padding: 0.2rem 0.3rem;
    border-radius: 4px;
`
const Name = styled.span`
    display: flex;
    align-items: center;


    & .bi-check-square{
        color: ${props => props.theme.color.fill.success}
    }
    & p{
        padding-left: 0.3rem;
    }
`
function TableApprovalProcess({data}) {
    const [temp, setTemp] = useState()
    
    

    //set data at Temp
    useEffect(() =>{
        if(data)
        {
            setTemp(data.approvalDocument)
        }
    },[data])

    const handleFile = (e,val) =>{
        
        let fileName = e.target.files[0].name
        if(fileName !== "")
        {
            setTemp(
                temp.map((item) => {
                    if (item.id === val.id) {
                    return {
                        ...item,
                        file_name: fileName,
                        is_File: true,
                    };
                    }
                    return item;
                })
            );
        }
    }
    const removeItem = (value) =>{
        setTemp(temp.filter(item => item.id !== value.id))
    }
    return (
        <TableWrapper className="table-list-1">
            <Table>
                <Table.Header>
                <Table.Row>
                    <Table.HeaderCell textAlign="left" width="30%">
                    Name
                    </Table.HeaderCell>
                    <Table.HeaderCell textAlign="left" width="30%">
                    File Name
                    </Table.HeaderCell>
                    <Table.HeaderCell textAlign="left" width="30%">
                    Data Field
                    </Table.HeaderCell>
                    <Table.HeaderCell textAlign="center" width="10%">
                    Action
                    </Table.HeaderCell>
                </Table.Row>
                </Table.Header>
                <Table.Body>
                {temp && temp.map((val, keys) => {
                    return (
                    <Table.Row key={keys}>
                        <Table.Cell textAlign="left">
                            <Name>
                                {
                                    !val.is_File ? <BiSquare size="1.5rem"/> : <BiCheckSquare className="bi-check-square" size="1.5rem"/>
                                }
                                <p>{val.name}</p>
                            </Name>
                        </Table.Cell>
                        <Table.Cell textAlign="left">
                            {val.file_name !== "" ? (
                                <Name><VscFilePdf size="1.2rem" style={{marginRight: '0.2rem'}}/><p>{val.file_name}</p></Name>
                            ) : (
                                <p className="field-value">N/A</p>
                            )}
                        </Table.Cell>
                        <Table.Cell textAlign="left">
                        { val.data_field.length > 0 ? (
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
                            <DivButton>
                                {
                                    !val.is_File ?
                                        <>
                                            <input style={{display: 'none'}} type="file" id={val.name} accept = "application/pdf" onChange={(e) => handleFile(e,val)}/>
                                            <LabelFile htmlFor={val.name} className="custom-file-upload" id={val.name}>
                                                Attach File
                                            </LabelFile>
                                        </>
                                    :
                                    <>
                                        <ButtonRemove onClick={() => removeItem(val)}><AiOutlineDelete size="1.5rem"/></ButtonRemove>
                                        <ButtonDetail><BiDotsVerticalRounded size="1.5rem"/></ButtonDetail>
                                    </>
                                }
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

export default TableApprovalProcess;
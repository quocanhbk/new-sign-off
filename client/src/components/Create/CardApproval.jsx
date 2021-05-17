/* eslint-disable react/prop-types */
import React from 'react';
import styled from 'styled-components'
import {AiOutlineDelete,VscFilePdf,BiDotsVerticalRounded} from 'react-icons/all'

const CardWrapper = styled.div`
    border: 1px solid ${props => props.theme.color.border.primary};
    border-radius: 0.5rem;
    background-color: ${(props) =>
        props.selected ? props.theme.color.background.secondary : 'transparent'};
    box-shadow: ${props => props.theme.shadow};
    
    display: flex;
    position: relative;
    flex-direction: column;
    
    width: 100%;
    padding: 1rem 0.5rem;
    padding-bottom: 0.5rem;

    &:hover {
        background: ${props => props.theme.color.background.secondary};
    }
`
const TableField = styled.table`
  & th {
    vertical-align: top;
  }
  & .field-value {
    font-weight: normal;
  }
`;

const FileName = styled.p`
    display:flex;
    align-items:center;

    margin-bottom: 0.3rem;
`
const DivInfo = styled.div`
    display:flex;
    flex-direction : row;
`

const DataField = styled.div`
    flex: 7;
    display:flex;
    flex-direction: column;

`

const StyleButton = styled.div`
     flex: 1;
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

function CardApproval({approvalData,removeItem}) {

    return (
        <CardWrapper>
            <DivInfo>
                <DataField>
                    <FileName><VscFilePdf size="1.4rem" style={{marginRight: '0.2rem'}}/>{approvalData.file_name}</FileName>
                        {approvalData.data_field && approvalData.data_field.length > 0 ? (
                        approvalData.data_field.map((val) => {
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
              </DataField>
                    <StyleButton>
                        <ButtonRemove onClick={() => removeItem(approvalData)}><AiOutlineDelete size="1.5rem"/></ButtonRemove>
                       <ButtonDetail><BiDotsVerticalRounded size="1.5rem"/></ButtonDetail>
                    </StyleButton>
            </DivInfo>    
        </CardWrapper>
    );
}

export default CardApproval;
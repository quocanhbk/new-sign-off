/* eslint-disable react/prop-types */
import React, { useState } from 'react';
import { AiOutlineDelete } from 'react-icons/ai';
import styled from 'styled-components'
import Table from '../Table';
import Pagination from '../Pagination'
import Modal from '../Modal';

const StyleWrapper = styled.div`

    & img{
        max-width: 100%;
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
const ButtonChoose = styled.button`
    background-color: ${props => props.theme.color.fill.success};
    color: ${props => props.theme.color.background.primary};

    border: none;
    cursor: pointer;
    text-transform: none!important;
`
const DivInput = styled.div`
    margin: 1rem 0;
`
const StyleInput = styled.div`
    display:flex;
    gap: 1rem;
    margin: 0.5rem 0;
    & input{
        flex: 9;
        background-color: ${props => props.theme.color.border.primary};
        color: ${props => props.theme.color.text.primary};
        border: none;
        border-radius: 6px;
        padding: 0.5rem;
        font-size: 1rem;
        &:focus{
            border: 1px solid ${props => props.theme.color.fill.primary};
            outline: none;
        }
    }
    & button{
        flex: 1;
        border-radius: 6px;
        background-color: ${props => props.theme.color.fill.warning};
        color: ${props => props.theme.color.background.primary};
    }
`

const Text = styled.label`
    display: -webkit-box;display: -moz-box;display: -ms-flexbox;display: -webkit-flex;display: flex;flex-wrap: wrap;-webkit-flex-wrap: wrap; 

    font-size: 0.9rem;
    color : ${props => props.theme.color.text.primary};

    padding: 0.5rem 0;
`
const Text1 = styled.label`
    display: -webkit-box;display: -moz-box;display: -ms-flexbox;display: -webkit-flex;display: flex;flex-wrap: wrap;-webkit-flex-wrap: wrap; 

    font-size: 0.8rem;
    color : ${props => props.theme.color.text.secondary};
`
const PopupRemove = styled.div`
    padding: 1rem;
    display:flex;
    flex-direction: column;
    & span{
        padding: 1rem 0;
    }
    & p{
        text-align: center;
        font-size: 1rem;
        
    }
`
const ButtonPopup = styled.div`
    padding-top: 3rem;
    display:flex;
    justify-content: space-between;

    & .btn-cancel-pop{
        background-color: ${props => props.theme.color.fill.danger};
        color: ${props => props.theme.color.background.primary};
    }
    & .btn-confirm-pop{
        background-color: ${props => props.theme.color.fill.success};
        color: ${props => props.theme.color.background.primary};
    }
`
function LoadingDocument({dataStore,setDataStore}) {
    const [activePage, setActivePage] = useState(1)
    const [searchValue,setSearchValue] = useState('')
    const [modalRemove, setModalRemove] = useState(false)
    const [nameRemind, setNameRemind] = useState('')


    const openPopUp = (value) =>{
        setNameRemind(value)
        setModalRemove(true)
    }
    const searchItem = (data) =>{
        return data.filter((dt) => dt.name.toLowerCase().includes(searchValue.toLowerCase().trim()))
    }
    const removeItem = (val) =>{
        setDataStore(dataStore.filter( item => item.id !== val.id))
        setModalRemove(false)
    }
    
    return (
        <StyleWrapper className="table-list-4">
        <Text>Please input remind name to search</Text>
        <DivInput>
            <Text1>Remind name <p style={{color: 'red', paddingLeft: '0.3rem'}}>*</p></Text1>
            <StyleInput>
                <input type="text" onChange={e => setSearchValue(e.target.value)}/>
            </StyleInput>
            <Text1>Little caption goes here</Text1>
        </DivInput>
        <Table>
            <Table.Header>
            <Table.Row>
                <Table.HeaderCell textAlign="left" width="30%">
                Remind name
                </Table.HeaderCell>
                <Table.HeaderCell textAlign="left" width="60%">
                Primary Info
                </Table.HeaderCell>
                <Table.HeaderCell textAlign="center" width="10%">
                Action
                </Table.HeaderCell>
            </Table.Row>
            </Table.Header>
            <Table.Body>
            {searchItem(dataStore).slice((activePage-1)*3, (activePage-1)*3 + 3).map((val,keys)=>{
                return (
                <Table.Row key={keys}>
                    <Table.Cell textAlign="left">
                        <p>{val.name}</p>
                    </Table.Cell>
                    <Table.Cell textAlign="left">
                        <TableField
                            className="table-data-field"
                            key={val.id}
                            style={{ width: "100%" }}
                            >
                            <tbody>
                                <tr>
                                    <th style={{ width: "35%",textAlign: "left" }}>
                                        <p>Created:</p>
                                    </th>
                                    <th>
                                        <p className="field-value">{(val.created !== '') ? val.created : 'N/A'}</p>
                                    </th>
                                </tr>
                                <tr>
                                    <th style={{ width: "35%",textAlign: "left" }}>
                                        <p>Title:</p>
                                    </th>
                                    <th>
                                        <p className="field-value">{(val.title !== '') ? val.title : 'N/A'}</p>
                                    </th>
                                </tr>
                                <tr>
                                    <th style={{ width: "35%",textAlign: "left" }}>
                                        <p>Approval Type:</p>
                                    </th>
                                    <th>
                                        <p className="field-value">{(val.type !== '') ? val.type : 'N/A'}</p>
                                    </th>
                                </tr>
                                <tr>
                                    <th style={{ width: "35%",textAlign: "left" }}>
                                        <p>Priority:</p>
                                    </th>
                                    <th>
                                        <p className="field-value">{(val.priority !== '') ? val.priority : 'N/A'}</p>
                                    </th>
                                </tr>
                                <tr>
                                    <th style={{ width: "35%",textAlign: "left" }}>
                                        <p>Deadline:</p>
                                    </th>
                                    <th>
                                        <p className="field-value">{(val.deadline !== '') ? val.deadline : 'N/A'}</p>
                                    </th>
                                </tr>
                            </tbody>
                        </TableField>
                    </Table.Cell>
                    <Table.Cell textAlign="left">
                        <DivButton>
                            <Modal children2 visible={modalRemove} onClickOutside = {() => setModalRemove(false)}>
                                <PopupRemove>
                                    <img src="remove.png"/>
                                    <span>
                                        <p>Are you sure to delete</p>
                                        <p>{nameRemind}</p>
                                    </span>
                                    <ButtonPopup>
                                        <button className='btn-cancel-pop' onClick={() => setModalRemove(false)}>Cancel</button>
                                        <button className='btn-confirm-pop' onClick={() => removeItem(val)}>Confirm</button>
                                    </ButtonPopup>
                                </PopupRemove>
                            </Modal>
                            <ButtonRemove onClick={() => openPopUp(val.name)}><AiOutlineDelete size="1.5rem"/></ButtonRemove>
                            <ButtonChoose>Select</ButtonChoose>
                        </DivButton>
                    </Table.Cell>
                </Table.Row>
                );
            })}
            </Table.Body>
            <Table.Footer>
                <Table.Cell colSpan="2" textAlign="center">
                    {"Total: " + dataStore.length}
                </Table.Cell>
                <Table.Cell colSpan="99" textAlign="right">
                    <Pagination
                    totalPage={Math.ceil(dataStore.length / 3)}
                    boundary={1}
                    sibling={1}
                    onSelect={(x) => setActivePage(x)}
                    activePage={activePage}
                    />
                </Table.Cell>
            </Table.Footer>
        </Table>
    </StyleWrapper>
    );
}

export default LoadingDocument;
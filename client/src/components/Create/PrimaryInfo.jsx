/* eslint-disable react/prop-types */
import React from 'react';
import styled from 'styled-components'
import Combox from '../Combox'
import Calendar from '../Calendar'

const StyleWrapper = styled.div`
    padding: 0.5rem 0;
`

const StyleItemsColumn = styled.div`
    display:flex;
    flex-direction: column;

`
const StyleItemRow = styled.div`
    display:flex;
    flex-direction: row;
    justify-content:space-between;
    gap: 1rem;
 `
const StyleItems = styled.div`
    display:flex;
    flex-direction: column;
    flex: 1;
`
const Text = styled.label`
    display: -webkit-box;display: -moz-box;display: -ms-flexbox;display: -webkit-flex;display: flex;flex-wrap: wrap;-webkit-flex-wrap: wrap; 

    font-size: 0.9rem;
    color : ${props => props.theme.color.text.primary};

    padding: 0.5rem 0;
`
const Text1 = styled.label`
    display: -webkit-box;display: -moz-box;display: -ms-flexbox;display: -webkit-flex;display: flex;flex-wrap: wrap;-webkit-flex-wrap: wrap; 

    font-size: 0.9rem;
    color : ${props => props.theme.color.text.secondary};

    padding: 0.5rem 0;
`
const Input = styled.input`
    background-color: ${props=> props.theme.color.background.secondary};
    color : ${props => props.theme.color.text.primary};
    border: none;

    border-radius: 4px;
    padding: 0.5rem;
    font-size: 1rem;

    &:focus{
        border: 1px solid ${props => props.theme.color.fill.primary};
        outline: none;
    }
`

const priority = [
    {
        id: 1,
        name: 'Normal'
    },
    {
        id: 2,
        name: 'Urgent'
    }
]
const project = [
    {
        id: 1,
        name: 'TTG - Tập Đoàn Trung Thủy'
    },
    {
        id: 2,
        name: 'Lumina'
    },
    {
        id: 3,
        name: 'Eden'
    },
    {
        id: 4,
        name: 'Lancaster'
    }
]

function PrimaryInfo({approvalNavigate,dataForm,setGetDataForm,typeValue,setTypeValue,types}) {

    const PopupProcess = (value) =>{
        setTypeValue(value[0])
    }

    return (
        <StyleWrapper>
            <StyleItemsColumn>
                <StyleItems>
                    <Text>Approval Title <p style={{color: 'red', paddingLeft: '0.3rem'}}>*</p></Text>
                    <Input placeholder="Input document title..."/>
                    <Text1>Little caption goes here</Text1>
                </StyleItems>
            </StyleItemsColumn>
            <StyleItemRow>
                <StyleItems>
                    <Text>Approval Type <p style={{color: 'red', paddingLeft: '0.3rem'}}>*</p></Text>
                    <Combox
                        className="combox-type"
                        onSelect={v => PopupProcess(v)}
                        selectTodo={approvalNavigate}
                    >
                        {types.map((data, index) => {
                            return(
                            <Combox.Option
                            default={(approvalNavigate ? data.id === 2 : data.id === 1)}
                            id={data.id}
                            searchText={[data.name]}
                            value={data.name}    
                            key={index}
                            approval={true}
                            >
                            {
                                data.name
                            }
                            </Combox.Option>
                            )
                        })}
                    </Combox>
                    <Text1>Little caption goes here</Text1>
                </StyleItems>
                {
                    typeValue === "Process" ?
                    <StyleItems>
                        <Text>Process Name <p style={{color: 'red', paddingLeft: '0.3rem'}}>*</p></Text>
                        <Combox
                            className="combox-type"
                            onSelect={v => setGetDataForm(v[0])}
                        >
                            {dataForm.map((data, index) => {
                                return(
                                <Combox.Option
                                default={data.id === 1}
                                id={data.id}
                                searchText={[data.name]}
                                value={data}    
                                key={index}
                                >
                                {
                                    data.name
                                }
                                </Combox.Option>
                                )
                            })}
                        </Combox>
                        <Text1>Little caption goes here</Text1>
                    </StyleItems>
                : ""
                }
                </StyleItemRow>
            <StyleItemRow>
                <StyleItems>
                    <Text>Priority <p style={{color: 'red', paddingLeft: '0.3rem'}}>*</p></Text>
                    <Combox
                        className="combox-priority"
                        // onSelect={v => console.log(v)}
                    >
                        {priority.map((data, index) => {
                            return(
                            <Combox.Option
                            default={data.id === 1}
                            id={data.id}
                            searchText={[data.name]}
                            value={data.name}    
                            key={index}
                            >
                            {
                                data.name
                            }
                            </Combox.Option>
                            )
                        })}
                    </Combox>
                    <Text1>Little caption goes here</Text1>
                </StyleItems>
                <StyleItems>
                    <Text>Deadline <p style={{color: 'red', paddingLeft: '0.3rem'}}>*</p></Text>
                    <Calendar fullWidth/>
                    <Text1>Expected date to receive final approval</Text1>
                </StyleItems>
                <StyleItems>
                    <Text>Related Project <p style={{color: 'red', paddingLeft: '0.3rem'}}>*</p></Text>
                    <Combox
                        className="combox-project"
                        // onSelect={v => console.log(v)}
                    >
                        {project.map((data, index) => {
                            return(
                            <Combox.Option
                            default={data.id === 1}
                            id={data.id}
                            searchText={[data.name]}
                            value={data.name}    
                            key={index}
                            >
                            {
                                data.name
                            }
                            </Combox.Option>
                            )
                        })}
                    </Combox>
                    <Text1>Little caption goes here</Text1>
                </StyleItems>
            </StyleItemRow>
        </StyleWrapper>
    );
}

export default PrimaryInfo;
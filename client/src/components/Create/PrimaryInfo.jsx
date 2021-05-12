import React from 'react';
import styled from 'styled-components'
import Combox from '../Combox'
import Calendar from '../Calendar'

const StyleWrapper = styled.div`
    padding: 1rem;
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
    color : ${props => props.theme.color.text.secondary};

    padding: 0.5rem;
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
const types = [
    {
        id: 1,
        name: 'Flexible'
    },
    {
        id: 2,
        name: 'Process'
    }
]
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
function PrimaryInfo() {
    return (
        <StyleWrapper>
            <StyleItemsColumn>
                <StyleItems>
                    <Text>Approval Title <p style={{color: 'red', paddingLeft: '0.3rem'}}>*</p></Text>
                    <Input placeholder="Input document title..."/>
                    <Text>Little caption goes here</Text>
                </StyleItems>
                <StyleItems>
                    <Text>Approval Type <p style={{color: 'red', paddingLeft: '0.3rem'}}>*</p></Text>
                    <Combox
                        className="combox-type"
                        onSelect={v => console.log(v)}
                        // selectTodo={emailCalendar}
                    >
                        {types.map((data, index) => {
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
                    <Text>Little caption goes here</Text>
                </StyleItems>
            </StyleItemsColumn>
            <StyleItemRow>
                <StyleItems>
                    <Text>Priority <p style={{color: 'red', paddingLeft: '0.3rem'}}>*</p></Text>
                    <Combox
                        className="combox-priority"
                        onSelect={v => console.log(v)}
                        // selectTodo={emailCalendar}
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
                    <Text>Little caption goes here</Text>
                </StyleItems>
                <StyleItems>
                    <Text>Deadline <p style={{color: 'red', paddingLeft: '0.3rem'}}>*</p></Text>
                    <Calendar fullWidth/>
                    <Text>Expected date to receive final approval</Text>
                </StyleItems>
                <StyleItems>
                    <Text>Related Project <p style={{color: 'red', paddingLeft: '0.3rem'}}>*</p></Text>
                    <Combox
                        className="combox-project"
                        onSelect={v => console.log(v)}
                        // selectTodo={emailCalendar}
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
                    <Text>Little caption goes here</Text>
                </StyleItems>
            </StyleItemRow>
        </StyleWrapper>
    );
}

export default PrimaryInfo;
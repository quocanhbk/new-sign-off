import React from 'react';
import styled from 'styled-components'
import Combox from '../Combox';

const StyleWrapper = styled.div`
    padding: 0.5rem 0;
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
const user = [
    {
        id: 1,
        name: 'Nguyen Hoang Tan',
    },
    {
        id: 2,
        name: 'Van Thuan Quan',
    },
    {
        id: 3,
        name: 'Le Quoc Anh',
    },
    {
        id: 4,
        name: 'Nguyen Quoc Dat',
    },
]
function Participants() {
    return (
        <StyleWrapper>
            <StyleItems>
                <Text>Advisor List</Text>
                <Combox
                    multiple
                    searchable
                    className="combox-advisor-list"
                    // onSelect={v => console.log(v)}
                >
                    {user.map((data, index) => {
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
                <Text1>List of individuals to contribute opinion for approver(s). Advisor could approve unorder but all advisor must approved before the document could be sent to the first person in Approver List.</Text1>
            </StyleItems>
            <StyleItems>
                <Text>Approver List <p style={{color: 'red', paddingLeft: '0.3rem'}}>*</p></Text>
                <Combox
                    multiple
                    searchable
                    className="combox-advisor-list"
                    // onSelect={v => console.log(v)}
                >
                    {user.map((data, index) => {
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
                <Text1>List of individuals has authority to approve the document. In order to complete approval process, all person in this list must approved the document.</Text1>
            </StyleItems>
            <StyleItems>
                <Text>Observator List</Text>
                <Combox
                    multiple
                    searchable
                    className="combox-advisor-list"
                    // onSelect={v => console.log(v)}
                >
                    {user.map((data, index) => {
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
                <Text1>List of individuals should be noted about this document but are not need to participate in approval process.</Text1>
            </StyleItems>
        </StyleWrapper>
    );
}

export default Participants;
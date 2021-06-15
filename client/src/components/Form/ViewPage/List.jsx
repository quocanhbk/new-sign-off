/* eslint-disable react/prop-types */
import React from 'react';
import styled from 'styled-components'
import Card from './Card';
import ListToolbar from './ListToolbar';
import {getFader} from '../../../utils/color'
import { navigate } from '@reach/router';
import {BsFileEarmarkPlus} from 'react-icons/bs'
const StyleListWrapper =styled.div`
    flex: 5;
    background-color: ${(props) => props.theme.color.background.primary};
    color: ${(props) => props.theme.color.text.primary};
    display: flex;
    flex-direction: column;
    height: 100%;
    padding: 0 0.5rem;
`

const CardList = styled.div`
    width: 100%;
    flex: 1;
    border-top: 1px solid ${props => props.theme.color.border.primary};
    padding-top: 0.5rem;
    overflow: auto;
    position: relative;
    display:flex;
    flex-direction: column;
    gap: 0.5rem;

    ::-webkit-scrollbar {
    width: 0.5rem;
    }
    ::-webkit-scrollbar-track {
    background: transparent;
    }
    ::-webkit-scrollbar-thumb {
    background: ${props => getFader(props.theme.color.fill.secondary, 0.5)};
    border-radius: 99px;
    }
    ::-webkit-scrollbar-thumb:hover {
    background: ${props => props.theme.color.fill.secondary};
    }

`
const AddNewContainer = styled.div`
    display: flex;
    align-items: center;
    padding: 0.5rem 0;
    justify-content: space-between;
`
const IconContainer = styled.div`
    cursor: pointer;
    display: flex;
    padding: 0.2rem 0.4rem;
    background: ${props => props.theme.color.border.primary};
    font-size: 0.9rem;
    align-items: center;
    gap: 0.4rem;
    border-radius: 0.5rem;
    &:hover {
        background: ${props => getFader(props.theme.color.border.primary,0.5)};
    }
`
function List({setSelectedForm}) {    
    return (
        <StyleListWrapper>
            <ListToolbar/>
            <AddNewContainer>
                <p>How many result</p>
                <IconContainer onClick={() => navigate('/form/create')}>
                    <BsFileEarmarkPlus size="1.4rem"/> Add
                </IconContainer>
            </AddNewContainer>
            <CardList>
                {
                    [].map(form => 
                        <Card key={form.name} name={form.name} fileName={form.file.name} onClick={() => setSelectedForm(form)}/>
                    )
                }
            </CardList>
        </StyleListWrapper>
    );
}

export default List;
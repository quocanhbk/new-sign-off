/* eslint-disable react/prop-types */
import React from 'react';
import styled from 'styled-components'
import Cardv2 from './Cardv2';
import ListToolbar from './ListToolbar';
import {getFader} from '../../../../utils/color'
import { navigate } from '@reach/router';
import Button from '../../../Button'
import { BsFileEarmarkPlus } from 'react-icons/bs';

const StyleListWrapper =styled.div`
    flex: 5;
    background-color: ${(props) => props.theme.color.background.primary};
    color: ${(props) => props.theme.color.text.primary};
    display: flex;
    flex-direction: column;
    height: 100%;
    padding: 0 0.5rem;
`
const AddNewContainer = styled.div`
    display: flex;
    align-items: center;
    padding: 0.5rem 0;
    justify-content: space-between;
`
const CardList = styled.div`
    width: 100%;
    flex: 1;
    
    overflow: auto;
    position: relative;
    
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

    display:flex;
    flex-direction: column;
    
    gap: 0.5rem;
`

function List({data,setSelectedId}) {
    return (
        <StyleListWrapper>
            <ListToolbar/>
            <AddNewContainer>
                <p>Filter: </p>
                <Button 
                    onClick={() => navigate('/procedure/create')} 
                    padding="0.2rem 0.4rem" 
                    gap="0.4rem"
                    variant="border"
                >
                    <BsFileEarmarkPlus size="1rem"/> Add
                </Button>
            </AddNewContainer>
            <CardList>
                {data.map((procedure) => (
                    <Cardv2
                        key={procedure.id}
                        title={procedure.title}
                        running={procedure.running}
                        setSelectedId={() => setSelectedId(procedure.id)}
                    />
                ))}
            </CardList>
        </StyleListWrapper>
    );
}

export default List;
/* eslint-disable no-constant-condition */
/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import React, { useEffect, useState } from 'react';
import styled from 'styled-components'
import Card from './Card';
import ListToolbar from './ListToolbar';
import {getFader} from 'utils/color'
import { navigate, useLocation } from '@reach/router';
import {BsFileEarmarkPlus} from 'react-icons/bs'
import { getForms } from 'api/form'
import Button from 'components/Button';
import { useStoreState } from 'easy-peasy';
import Placeholder from 'components/Placeholder';
import useCustomLoader from 'hooks/useCustomLoader';

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
function List() {
    const [forms, setForms] = useState([])
    const [searchText, setSearchText] = useState("")
    const location = useLocation().pathname.split("/")
    const users = useStoreState(_ => _.users)
    const {render, setNotFound, setPercent} = useCustomLoader(true, <Placeholder type="NOT_FOUND"/>)
    useEffect(() => {
        const fetchData = async () => {
            getForms((v) => setPercent(v))
                .then(forms => setForms(forms))
                .catch(() => setNotFound(true))
        }
        fetchData()
    }, [])

    const handle = (formId) => {
        navigate('/form/view/' + formId)
    }

    return (
        <StyleListWrapper>
            <ListToolbar search={searchText} setSearch={setSearchText}/>
            <AddNewContainer>
                <p>Result: {forms.filter(form => form.name.toLowerCase().includes(searchText.toLowerCase())).length}</p>
                <Button 
                    onClick={() => navigate('/form/create')} 
                    padding="0.2rem 0.4rem" 
                    gap="0.4rem"
                    variant="border"
                >
                    <BsFileEarmarkPlus size="1rem"/> Add
                </Button>
            </AddNewContainer>
            <CardList>
                {render(
                    forms.filter(form => form.name.toLowerCase().includes(searchText.toLowerCase())).map(form => 
                        <Card 
                            key={form.id} 
                            name={form.name}
                            createdBy={users.find(u => u.id === form.createdBy)}
                            onClick={() => handle(form.id)}
                            active={form.id == location[location.length - 1]}
                        />
                ))}
            </CardList>
        </StyleListWrapper>
    );
}

export default List;
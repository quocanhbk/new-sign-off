/* eslint-disable react/prop-types */
import React, { useEffect, useState } from 'react';
import styled from 'styled-components'
import Cardv2 from './Cardv2';
import ListToolbar from './ListToolbar';
import {getFader} from 'utils/color'
import { navigate, useLocation } from '@reach/router';
import Button from 'components/Base/Button'
import { BsFileEarmarkPlus } from 'react-icons/bs';
import { useStoreState } from 'easy-peasy';
import { getProcedures} from 'api/procedure'
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
const AddNewContainer = styled.div`
    display: flex;
    align-items: center;
    padding: 0.5rem 0;
    justify-content: space-between;
`
const CardList = styled.div`
    width: 100%;
    flex: 1;
    padding-bottom: 0.5rem;
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

function List() {

    const [procedures, setProcedures] = useState([])
    const [searchText, setSearchText] = useState("")
    const location = useLocation().pathname.split("/")
    const users = useStoreState(s => s.users)
    const {render, setNotFound, setPercent} = useCustomLoader(true, <Placeholder type="NOT_FOUND"/>)
    
    useEffect(() => {
        const fetchData = async () => {
            getProcedures((v) => setPercent(v))
                .then(data => setProcedures(data))
                .catch(() => {setNotFound(true)})
        }
        fetchData()
    }, [])

    const handle = (formId) => {
        navigate('/procedure/view/' + formId)
    }

    return (
        <StyleListWrapper>
            <ListToolbar search={searchText} setSearch={setSearchText}/>
            <AddNewContainer>
                <p>Result: {procedures.filter(procedure => procedure.title.toLowerCase().includes(searchText.toLowerCase())).length}</p>
                <Button 
                    onClick={() => navigate('/procedure/create')} 
                    padding="0.2rem 0.4rem" 
                    gap="0.4rem"
                >
                    <BsFileEarmarkPlus size="1rem"/> Add
                </Button>
            </AddNewContainer>
            <CardList>
                {render(
                    procedures.filter(procedure => procedure.title.toLowerCase().includes(searchText.toLowerCase())).map(procedure => 
                        <Cardv2 
                            key={procedure.id} 
                            title={procedure.title}
                            isActive={procedure.isActive}
                            createdBy={users.find(u => u.id === procedure.createdBy)}
                            onClick={() => handle(procedure.id)}
                            active={procedure.id == location[location.length - 1]}
                        />
                    )
                )}
            </CardList>
        </StyleListWrapper>
    );
}

export default List;
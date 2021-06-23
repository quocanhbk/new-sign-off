/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import React, { useEffect, useState } from 'react';
import styled from 'styled-components'
import RequestCard from './RequestCard';
import ListToolbar from './ListToolbar';
import {getFader} from '../../../utils/color';
import { getRequests } from 'api/request';
import useCustomLoader from 'hooks/useCustomLoader';
import Placeholder from 'components/Placeholder';
const StyleListWrapper =styled.div`
    flex: 5;
    background-color: ${(props) => props.theme.color.background.primary};
    color: ${(props) => props.theme.color.text.primary};
    display: flex;
    flex-direction: column;
    height: 100%;
    padding: 0 0.5rem;
`
const TagBar = styled.div`
  display: flex;
  gap: 0.5rem;
  height: 2.5rem;
  align-items: center;
`;
const TagContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem;
`;

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

function List() {
    const [requests, setRequests] = useState([])

    const {render, setNotFound, setPercent} = useCustomLoader(true, <Placeholder type="NOT_FOUND"/>)
    
    useEffect(() => {
        const fetchRequests = async () => {
            let requestsData = await getRequests((p) => setPercent(p)).catch(() => setNotFound(true))
            setRequests(requestsData)
        }
        fetchRequests()
    }, [])


    return (
        <StyleListWrapper>
            <ListToolbar/>
            <TagBar>
                <p>Filter: </p>
                <TagContainer>
                Dữ liệu ảo
                </TagContainer>
            </TagBar>
            <CardList>
                {render(requests.map((task) => (
                    <RequestCard
                        key={task.id}
                        id={task.id}
                        title={task.title}
                        status={task.status}
                        type={task.type}
                        deadline={task.deadline}
                        createdBy={task.author.full_name}
                        page={"search"}
                    />
                )))}
            </CardList>
        </StyleListWrapper>
    );
}

export default List;
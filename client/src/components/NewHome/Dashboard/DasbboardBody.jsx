/* eslint-disable no-unused-vars */
import React, {useState, useEffect} from 'react'
import styled from "styled-components";
import {getRequests} from 'api/request'
import RequestTag from './RequestTag';
const Container = styled.div`
    width: 60%;
    min-width: 240px;
    display: flex;
    flex-direction: column;
    gap: 2rem;
`
const Section = styled.div`
    & ul {
        display: flex;
        flex-direction: column;
        gap: 0.5rem;
    }
`
const SectionName = styled.p`
    font-size: 1.4rem;
    margin-bottom: 1rem;
    text-align: center;
    color: ${props => props.theme.color.fill[props.color || "warning"]};
    font-weight: 300;

`
const DashboardBody = () => {
    const [requests, setRequests] = useState([])
    const [loading, setLoading] = useState(true)
    useEffect(() => {
        const fetchRequest = async () => {
            let data = await getRequests("start=0&end=2&sign=true")
            setRequests(data)
            setLoading(false)
        }
        fetchRequest()
    }, [])
    return (
        <Container>
            {requests.length > 0 ? 
                <Section>
                    <SectionName>You have documents to sign</SectionName>
                    <ul>
                        {requests.map(req =>
                            <RequestTag 
                                key={req.id} id={req.id} 
                                name={req.author.name} email={req.author.email}
                                title={req.title}
                            />
                        )}
                    </ul>
                </Section> : 
                loading === false ?
                <Section>
                    <SectionName color="success">All documents are signed !</SectionName>
                </Section> :
                null
            }
        </Container>
    )
}

export default DashboardBody
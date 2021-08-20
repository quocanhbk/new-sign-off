/* eslint-disable no-unused-vars */
import styled from "styled-components"
import { getRequests } from "api/request"
import { useQuery } from "react-query"
import { RequestCard } from "components/Base"
const Container = styled.div`
    width: 80%;
    min-width: 240px;
    display: flex;
    flex-direction: column;
`
const Section = styled.div`
    & ul {
        display: flex;
        flex-direction: column;
        /* gap: 0.5rem; */
        & > * + * {
            margin-top: 0.5rem;
        }
    }
`
const SectionName = styled.p`
    font-size: 1.2rem;
    margin-bottom: 1rem;
    text-align: center;
    color: ${props => props.theme.color.fill[props.color || "warning"]};
    font-weight: 300;
`
const DashboardBody = () => {
    const { data: requests, isLoading } = useQuery("dashboard_request", () => getRequests("start=0&end=5&sign=true"))
    return (
        <Container>
            {requests && requests.length > 0 ? (
                <Section>
                    <SectionName>You have documents to sign</SectionName>
                    <ul>
                        {requests.map(req => (
                            // <RequestTag
                            //     key={req.id}
                            //     id={req.id}
                            //     name={req.author.name}
                            //     email={req.author.email}
                            //     title={req.title}
                            // />
                            <RequestCard page="sign" key={req.id} data={req} />
                        ))}
                    </ul>
                </Section>
            ) : isLoading === false ? (
                <Section>
                    <SectionName color="success">All documents are signed !</SectionName>
                </Section>
            ) : null}
        </Container>
    )
}

export default DashboardBody

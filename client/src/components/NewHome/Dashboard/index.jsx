import React from 'react'
import styled from 'styled-components'
import Date from './Date'
import DashboardBody from './DasbboardBody'

const Container = styled.div`
    display: flex;
    align-items: center;
    flex-direction: column;
    /* gap: 3rem; */
    height: 100%;
    padding: 2rem 0;
    & > * + * {
		margin-top: 3rem;
	}
`

const Dashboard = () => {
    return (
        <Container>
            <Date/>
            <DashboardBody/>
        </Container>
    )
}

export default Dashboard

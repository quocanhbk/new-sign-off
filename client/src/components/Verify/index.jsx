import { burstRequest } from 'api/request'
import React from 'react'
import styled from 'styled-components'

const Container = styled.div`
	background-color: red;
`

const Playground = () => {
    return (
        <Container>
            <button onClick={() => burstRequest()}>Play</button>
        </Container>
    )
}

export default Playground
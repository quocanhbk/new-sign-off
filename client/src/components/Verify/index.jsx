import React from 'react'
import styled from 'styled-components'
import {useQuery} from 'react-query'
import { getRequests } from 'api/request'
import useMediaQuery from 'hooks/useMediaQuery'
const Container = styled.div`
	background-color: red;
`

const Playground = () => {
    const {isStale} = useQuery('idk', () => getRequests(""))
    let width = useMediaQuery()
    console.log(isStale)
    return (
        <Container>
            {width}
        </Container>
    )
}

export default Playground
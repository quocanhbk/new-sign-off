import React, { useState } from 'react'
import styled from 'styled-components'
import DisplayContent from './DisplayContent'
import List from './List'
import sampleData from './sampleData'


const StyleContainer = styled.div`
    display:flex;
    width: 100%;
    height: 100%;
`
const Sign = () => {
    const [selectedId, setSelectedId] = useState()

    return (
        <StyleContainer>
            <List 
                data={sampleData} 
                setSelectedId={setSelectedId}
            />
            <DisplayContent data={sampleData.find(item => item.id === selectedId)}/>
        </StyleContainer>
    )
}

export default Sign
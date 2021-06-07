import React, { useState } from 'react'
import styled from 'styled-components'
import Detail from './Detail'
import List from './List'
import sampleData from './sampleData'

const StyleContainer = styled.div`
    display:flex;
    width: 100%;
    height: 100%;
`

const Search = () => {
    const [selectedId, setSelectedId] = useState()
    return (
        <StyleContainer>
            <List 
                data={sampleData} 
                setSelectedId={setSelectedId}
            />
            <Detail data={sampleData.find(item => item.id === selectedId)}/>
        </StyleContainer>
    )
}

export default Search
import React from 'react';
import styled from 'styled-components';

const StyleNodata = styled.div`
    display:flex;
    justify-content: center;
    flex-direction: column;
    align-items: center;
    width:100%;

    & img{
        max-width: 100%;
        height: auto;
        text-align:center;
    }
`
const Title  = styled.p`
    text-align:center;
    color: #666;
    font-size : 1.2rem;
`

function NoData() {
    return (
        <StyleNodata>
            <img src="preview.png"/>
            <Title>No data !!!</Title>
        </StyleNodata>
    );
}

export default NoData;
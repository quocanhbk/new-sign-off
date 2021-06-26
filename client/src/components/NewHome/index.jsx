/* eslint-disable no-unused-vars */
import React from 'react'
import styled, { css } from 'styled-components'
import { getFader } from 'utils/color'
import Feature from './Feature'
import Dashboard from './Dashboard'
const StyleContainer = styled.div`
    display:flex;
    width: 100%;
    height: 100%;
    padding: 2rem;
    gap: 2rem;
`
const Col = styled.div`
    flex: 1;
    
    ${props => props.right && css`
        background: ${props => "linear-gradient(to right," + 
            getFader(props.theme.color.background.primary, 1) + "," + 
            getFader(props.theme.color.background.primary, 0.8) + "," +
            getFader(props.theme.color.background.primary, 1) + 
            ")"}, url("/main.png");
        background-size: contain;
    `}
    
`
const Vertical = styled.div`
    height: 100%;
    width: 1px;
    background: ${props => props.theme.color.border.primary};
`
const Home = () => {
    return (
        <StyleContainer>
           <Col right><Dashboard/></Col>
           <Vertical/>
           <Col><Feature/></Col>
        </StyleContainer>
    )
}

export default Home
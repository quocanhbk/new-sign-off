import React from 'react'
import styled from 'styled-components'
import Detail from './Detail'
import List from './List'
import { getFader } from 'utils/color'
import { Router } from '@reach/router'
import Placeholder from 'components/Placeholder'

const StyleContainer = styled.div`
    display:flex;
    width: 100%;
    height: 100%;
`
const StyleContentWrapper = styled.div`
    flex: 10;
    height: 100%;
    background-color: ${(props) => props.theme.color.background.secondary};
    color: ${(props) => props.theme.color.text.primary};
    border-left: 1px solid ${(props) => props.theme.color.border.primary};
    height: 100%;
    position: relative;
    overflow-y: overlay;
    overflow-x: hidden;
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
    & .form-router {
        height: 100%;
    }

`;
const Procedure = () => {
    return (
        <StyleContainer>
            <List/>
            <StyleContentWrapper>
                <Router className="form-router">
                    <Detail path="/:id"/>
                    <Placeholder type="PROCEDURE_NOT_SELECTED" default/>
                </Router>
            </StyleContentWrapper>
        </StyleContainer>
    )
}

export default Procedure
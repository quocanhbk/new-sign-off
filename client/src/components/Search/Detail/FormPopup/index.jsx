/* eslint-disable react/prop-types */
/* eslint-disable no-unreachable */
/* eslint-disable no-unused-vars */
import React from 'react'
import styled from 'styled-components'
import {getFader} from 'utils/color'
import DocContent from './DocContent'

const Container = styled.div`
    display:flex;
    flex-direction: column;
    height: 100%;
    width: 100%;
    border: 2px solid ${props => props.theme.color.border.primary};
    overflow: hidden;
    border-radius: 0.5rem;
    background: ${props => (props.theme.color.background.primary)};
`
const DocWrapper = styled.div`
    flex: 1;
    position: relative;
    overflow: overlay;
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
`
const Title = styled.p`
    padding: 0.5rem;
    font-weight: 500;
    border-bottom: 1px solid ${props => props.theme.color.border.primary};
`
const FormPopup = ({attachment}) => {
    return (
        <Container>
            <Title>{attachment.name}</Title>
            <DocWrapper>
                <DocContent attachment={attachment}/>
            </DocWrapper>
        </Container>
    )
}

export default FormPopup
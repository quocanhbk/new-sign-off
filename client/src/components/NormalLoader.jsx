/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import React from 'react'
import {useStoreState} from 'easy-peasy'
import styled, { keyframes } from 'styled-components'
import {getFader} from "utils/color"

const Container = styled.div`
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;
    & > * + * {
		margin-top: 0.5rem;
	}
    z-index: 255;
    background: ${props => getFader(props.theme.color.background.primary, 0.5)};
`
const Logo = styled.div`
    width: 6rem;
    height: 6rem;
    padding: 1em;
    position: relative;
    display: flex;
    justify-content: center;
`
const spin = keyframes`
    from {transform: rotate(0deg)}
    to {transform: rotate(360deg)}
`
const Spinner = styled.div`
    position: absolute;
    border-top: 2px solid ${props => props.theme.color.fill.primary};
    border-bottom: 2px solid ${props => props.theme.color.fill.primary};
    width: 100%;
    height: 100%;
    top: 0;
    left: 0;
    border-radius: 99px;
    animation: ${spin} 1s linear 0s infinite forwards normal;
`


const ProgressLoader = () => {
    const theme = useStoreState(_ => _.theme)
    return (
        <Container>
            <Logo>
                <img src={theme ? '/iconNoTextDark.svg' : '/iconNoTextLight.svg'}/>
                <Spinner/>
            </Logo>
        </Container>
    )
}

export default ProgressLoader
/* eslint-disable react/prop-types */
import React, { useEffect, useState } from 'react'
import styled, { css, keyframes } from 'styled-components'
import {useStoreState} from 'easy-peasy'

const fadeOut = keyframes`
    to {
        transform: translateY(20px); 
        opacity: 0;
    }
`

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
    gap: 0.5rem;
    z-index: 255;
    background: ${props => props.theme.color.background.primary};
`
const Logo = styled.div`
    width: 8rem;
    height: 8rem;
    padding: 1em;
    position: relative;
    ${props => props.isOut && css`
        animation: ${fadeOut} 0.2s ease-in 0s 1 forwards normal;
    `}
`
const spin = keyframes`
    from {transform: rotate(0deg)}
    to {transform: rotate(360deg)}
`
const Spinner = styled.div`
    position: absolute;
    border-top: 2px solid ${props => props.theme.color.fill.primary};
    width: 100%;
    height: 100%;
    top: 0;
    left: 0;
    border-radius: 99px;
    animation: ${spin} 1s linear 0s infinite forwards normal;
`
const ProgressContainer = styled.div`
    margin-top: 1rem;
    height: 0.5rem;
    width: 8rem;
    background: ${props => props.theme.color.border.primary};
    border-radius: 99px;
    position: relative;
    overflow: hidden;
    ${props => props.isOut && css`
        animation: ${fadeOut} 0.2s ease-in 0s 1 forwards normal;
    `}
`
const ProgressBar = styled.div`
    position: absolute;
    height: 100%;
    width: ${props => props.percent + "%"};
    background: ${props => props.theme.color.fill.primary};
    border-radius: 99px;
    transition: all 0.25s ease-in-out;
    
`
const ProgressLoader = ({percent}) => {
    const theme = useStoreState(_ => _.theme)
    const [isOut, setIsOut] = useState(false)

    useEffect(() => {
        if (percent === 100) {
            setTimeout(() => setIsOut(true), 200)
            //setTimeout(() => setIsOut(false), 300)
        }
    }, [percent])

    return (
        <Container isOut={isOut}>
            <Logo isOut={isOut}>
                <img src={theme ? '/iconNoTextDark.svg' : '/iconNoTextLight.svg'}/>
                <Spinner/>
            </Logo>
            <ProgressContainer isOut={isOut}>
                <ProgressBar percent={percent}/>
            </ProgressContainer>
        </Container>
    )
}

export default ProgressLoader
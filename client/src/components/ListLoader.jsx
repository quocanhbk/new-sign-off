import React from 'react'
import styled, { keyframes } from 'styled-components'
import {useStoreState} from 'easy-peasy'
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
const ListLoader = () => {
    const theme = useStoreState(_ => _.theme)
    return (
        <Container>
            <Logo>
                <img src={theme ? '/iconNoTextDark.svg' : '/iconNoTextLight.svg'}/>
                <Spinner/>
            </Logo>
            Loading
        </Container>
    )
}

export default ListLoader
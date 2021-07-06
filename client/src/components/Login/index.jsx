/* eslint-disable react/prop-types */
import { useStoreState } from 'easy-peasy';
import React from 'react'
import styled from "styled-components";
import { getFader } from 'utils/color';
const Container = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    /* gap: 12rem; */
    & > * + * {
		margin-top: 12rem;
	}
    width: 100%;
    height: 100%;
    //background: ${props => props.theme.color.background.primary};
    //background: ${props => "linear-gradient(135deg, " + getFader(props.theme.color.background.primary, 0.5) + ", " + props.theme.color.fill.primary + ")"};
    background: ${props => "linear-gradient(to right," + 
            getFader(props.theme.color.background.primary, 1) + "," + 
            getFader(props.theme.color.background.primary, 0.9) + "," +
            getFader(props.theme.color.background.primary, 1) + 
            ")"}, url("/main.png");
    background-size: contain;
`
const AuthContainer = styled.div`
    
    background: ${props => props.theme.color.background.primary};
    border: 1px solid ${props => props.theme.color.border.primary};
    border-radius: 0.2rem;
    & h3 {
        font-size: 1rem;
        user-select: none;
        font-weight: 500;
    }
`
const IconContainer = styled.div`
    height: 1.5rem;

    & img {
        height: 100%;
    }
`
const Header = styled.div`
    flex: 2;
    display: flex;
    align-items: center;
    gap: 1rem;
    padding: 0 0.5rem;

    & img {
        height: 5rem;
    }
`
const Body = styled.div`
    flex: 8;
    display: flex;
    flex-direction: column;
    gap: 2rem;
    align-items: center;

`
const AuthWrapper = styled.div`
    display: flex;
    align-items: center;
    gap: 1rem;
    cursor: pointer;
    padding: 1rem;

    &:hover {
        background: ${props => getFader(props.theme.color.border.primary, 0.5)};
    }
    &:active {
        background: ${props => getFader(props.theme.color.border.primary, 1)};
    }
`
const Title = styled.h1`
    font-size: 2rem;
    color: ${props => props.theme.color.fill.primary};
    user-select: none;
    font-family: Campton;
    letter-spacing: 2px;
`
const Login = ({onLogin}) => {
    const theme = useStoreState(_ => _.theme)
    return (
        <Container>
            <Header>
                <img src={theme ? '/iconWithTextDark.svg' : '/iconWithTextLight.svg'} />
            </Header>
            <Body>
                <Title>APPROVAL ONLINE</Title>
                <AuthContainer onClick={onLogin}>
                    <AuthWrapper>
                        <IconContainer>
                            <img src="/microsoft.svg" alt=""/>
                        </IconContainer>
                        <h3>Log in with Microsoft</h3>
                    </AuthWrapper>
                </AuthContainer>
            </Body>
        </Container>
    )
}

export default Login
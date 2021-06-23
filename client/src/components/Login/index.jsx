/* eslint-disable react/prop-types */
import { useStoreState } from 'easy-peasy';
import React from 'react'
import styled from "styled-components";

const Container = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    gap: 5rem;
    width: 100%;
    height: 100%;
`
const AuthContainer = styled.div`
    display: flex;
    gap: 1rem;
    cursor: pointer;
    background: ${props => props.theme.color.background.secondary};
    border: 1px solid ${props => props.theme.color.border.primary};
    padding: 1rem;
    border-radius: 0.5rem;
    & h3 {
        font-size: 1.2rem;
        font-weight: 500;
    }
`
const IconContainer = styled.div`
    height: 2rem;

    & img {
        height: 100%;
    }
`
const Header = styled.div`
  display: flex;
  align-items: center;
  gap: 1rem;
  padding: 0 0.5rem;
  & h1 {
    font-size: calc(2.0rem);
    color: ${props => props.theme.color.fill.primary};
    font-family: Campton;
  }

  & img {
      height: 3rem;
  }
`
const Login = ({onLogin}) => {
    const theme = useStoreState(_ => _.theme)
    return (
        <Container>
            <Header>
                <img src={theme ? '/iconNoTextDark.svg' : '/iconNoTextLight.svg'} />
                <h1>TTG Approval Online</h1>
            </Header>
            <AuthContainer onClick={onLogin}>
                <IconContainer>
                    <img src="/microsoft.svg" alt=""/>
                </IconContainer>
                <h3>Login with Microsoft</h3>
            </AuthContainer>
        </Container>
    )
}

export default Login
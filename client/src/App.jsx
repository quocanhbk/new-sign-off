/* eslint-disable no-unused-vars */
import React, { useEffect } from 'react';
import { AuthenticatedTemplate, UnauthenticatedTemplate, useMsal } from "@azure/msal-react";
import styled, { ThemeProvider } from 'styled-components';
import MainPage from './components/MainPage';
import Login from 'components/Login'
import theme from './utils/theme';
import {StoreProvider, useStoreState, useStoreActions} from 'easy-peasy'
import store from './store';

const StyledApp = styled.div`
  background: ${(props) => props.theme.color.background.primary};
  color: ${props => props.theme.color.text.primary};
  height: 100vh;
  overflow: hidden;
  transition: background 0.25s ease-out;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const Container = () => {
  const isDark = useStoreState(s => s.theme)
  const getUsers = useStoreActions(s => s.getUsers)
  const getForms = useStoreActions(s => s.getForms)
  const { instance } = useMsal();
  useEffect(() => {
    getUsers()
    getForms()
  })
  return (
    <ThemeProvider theme={isDark ? theme.dark : theme.light}>
        <StyledApp className="App">
            <UnauthenticatedTemplate>
              <Login onLogin={() => instance.loginRedirect()}/>
            </UnauthenticatedTemplate>
            <AuthenticatedTemplate>
              <MainPage/>
            </AuthenticatedTemplate>
        </StyledApp>
    </ThemeProvider>
  );
};
const App = () => {
  return (
    <StoreProvider store={store}>
      <Container />
    </StoreProvider>
  );
}

export default App;

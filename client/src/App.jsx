/* eslint-disable no-unused-vars */
import React, {  } from 'react';
import { AuthenticatedTemplate, UnauthenticatedTemplate, useMsal } from "@azure/msal-react";
import styled, { ThemeProvider } from 'styled-components';
import MainPage from './components/MainPage';
import Login from 'components/Login'
import theme from './utils/theme';
import {StoreProvider, useStoreState} from 'easy-peasy'
import store from './store'
import { pdfjs } from 'react-pdf';
import {QueryClient, QueryClientProvider} from 'react-query'
pdfjs.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.min.js`;

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
const queryClient = new QueryClient({
	defaultOptions: {
		queries: {
			refetchOnWindowFocus: false
		}
	}
})
const Container = () => {
  const isDark = useStoreState(s => s.theme)
  
  const { instance } = useMsal();
  
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
			<QueryClientProvider client={queryClient}>
				<Container />
			</QueryClientProvider>
		</StoreProvider>
	);
}

export default App;

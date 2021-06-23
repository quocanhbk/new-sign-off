import React from 'react';
import ReactDOM from 'react-dom';
import * as msal from '@azure/msal-browser';
import { MsalProvider } from '@azure/msal-react';
import './index.css';
import App from './App';
import config from 'msalConfig';

export const msalInstance = new msal.PublicClientApplication(config);

ReactDOM.render(
  <React.StrictMode>
    <MsalProvider instance={msalInstance}>
      <App />
    </MsalProvider>
  </React.StrictMode>,
  document.getElementById('root')
);

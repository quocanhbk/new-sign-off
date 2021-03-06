import React from "react"
import ReactDOM from "react-dom"
import * as msal from "@azure/msal-browser"
import { MsalProvider } from "@azure/msal-react"
import "./index.css"
import App from "./App"
import * as serviceWorkerRegistration from "./serviceWorkerRegistration"
import { ColorModeScript } from "@chakra-ui/react"
import theme from "chakraTheme"
export const msalInstance = new msal.PublicClientApplication({
    auth: {
        clientId: "f8626081-3f81-4909-bcef-14f0a974f079",
        authority: "https://login.microsoftonline.com/801edb4c-29ba-4d07-80b1-16a955dbf20d",
        redirectUri: window.location.origin,
    },
    cache: {
        cacheLocation: "localStorage",
    },
})

ReactDOM.render(
    <React.StrictMode>
        <MsalProvider instance={msalInstance}>
            <ColorModeScript initialColorMode={theme.config.initialColorMode} />
            <App />
        </MsalProvider>
    </React.StrictMode>,
    document.getElementById("root")
)

serviceWorkerRegistration.register({})

import { AuthenticatedTemplate, UnauthenticatedTemplate, useMsal } from "@azure/msal-react"
import MainPage from "./components/MainPage"
import Login from "components/Login"
import { pdfjs } from "react-pdf"
import { Router } from "@reach/router"
import Export from "components/Export"
import Provider from "./Provider"
import { Flex } from "@chakra-ui/react"
pdfjs.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.min.js`

const App = () => {
    const { instance } = useMsal()
    return (
        <Provider>
            <Flex overflow="hidden" transition="background 0.25s ease-out" direction="column" align="center">
                <UnauthenticatedTemplate>
                    <Login onLogin={() => instance.loginRedirect()} />
                </UnauthenticatedTemplate>
                <AuthenticatedTemplate>
                    <Router style={{ height: "100%", width: "100%" }}>
                        <MainPage path="/*" />
                        <Export path="/export/*" />
                    </Router>
                </AuthenticatedTemplate>
            </Flex>
        </Provider>
    )
}
export default App

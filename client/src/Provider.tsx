import { StoreProvider } from "easy-peasy"
import { FC } from "react"
import { QueryClientProvider, QueryClient } from "react-query"
import store from "./store"
import { ChakraProvider } from "@chakra-ui/react"
import { ThemeProvider } from "styled-components"
import theme from "./utils/theme"
import chakraTheme from "./chakraTheme"
interface ProviderProps {
    children: JSX.Element
}
const queryClient = new QueryClient({
    defaultOptions: {
        queries: {
            refetchOnWindowFocus: false,
            retry: 1,
        },
    },
})
const Provider: FC<ProviderProps> = ({ children }) => {
    return (
        <StoreProvider store={store}>
            <QueryClientProvider client={queryClient}>
                <ThemeProvider theme={theme.light}>
                    <ChakraProvider theme={chakraTheme}>{children}</ChakraProvider>
                </ThemeProvider>
            </QueryClientProvider>
        </StoreProvider>
    )
}

export default Provider

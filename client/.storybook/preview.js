import React from "react"
import { ChakraProvider } from "@chakra-ui/react"
import chakraTheme from "../src/chakraTheme"
export const parameters = {
    actions: { argTypesRegex: "^on[A-Z].*" },
}

const withChakra = StoryFn => {
    return (
        <ChakraProvider theme={chakraTheme}>
            <StoryFn />
        </ChakraProvider>
    )
}

export const decorators = [withChakra]

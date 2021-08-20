import { extendTheme } from "@chakra-ui/react"
import editorTheme from "editorTheme"

const genColor = (lightColor: string, darkColor: string) => ({
    light: lightColor,
    dark: darkColor,
})

const theme = extendTheme({
    colors: {
        background: {
            primary: genColor("#FFFFFF", "#212223"),
            secondary: genColor("#F7F7F7", "#252627"),
        },
        text: {
            primary: genColor("#555555", "#E8DEC8"),
            secondary: genColor("#777777", "#9E9FA1"),
        },
        fill: genColor("#174091", "#E8DEC8"),
        success: genColor("#0A842F", "#56C26A"),
        warning: genColor("#FDB913", "#FFD54F"),
        danger: genColor("#CC1D33", "#ED323B"),
        info: genColor("#256EC2", "#76D7EA"),
        border: genColor("#E3E3E3", "#333333"),
        main: {
            "50": "#E9EFFC",
            "100": "#C1D3F5",
            "200": "#9AB6EF",
            "300": "#729AE9",
            "400": "#4B7EE2",
            "500": "#2361DC",
            "600": "#1C4EB0",
            "700": "#153A84",
            "800": "#0E2758",
            "900": "#07132C",
        },
    },
    components: {
        Button: {
            defaultProps: {
                colorScheme: "main",
            },
            baseStyle: {
                rounded: "md",
            },
        },
        Heading: {
            defaultProps: {
                size: "md",
                colorScheme: "main",
            },
        },
        Input: {
            defaultProps: {
                errorBorderColor: "base",
                focusBorderColor: "base",
                autoComplete: "off",
                spellCheck: "off",
            },
        },
        Tag: {
            defaultProps: {
                size: "sm",
            },
            baseStyle: {
                cursor: "pointer",
                borderRadius: "base",
                fontWeight: "bold",
                textTransform: "uppercase",
            },
        },
    },
    styles: {
        global: props => ({
            "html, body": {
                color: `text.primary.${props.colorMode}`,
                bg: `background.primary.${props.colorMode}`,
                borderColor: "gray.200",
            },

            ".background-2": {
                bg: `background.secondary.${props.colorMode}`,
            },

            ".text-2": {
                color: `text.secondary.${props.colorMode}`,
            },

            ".text-danger": {
                color: `danger.${props.colorMode}`,
            },
            ".background-danger": {
                bg: `danger.${props.colorMode}`,
            },
            ".text-warning": {
                color: `warning.${props.colorMode}`,
            },
            ".background-warning": {
                bg: `warning.${props.colorMode}`,
            },
            ".text-success": {
                color: `success.${props.colorMode}`,
            },
            ".background-success": {
                bg: `success.${props.colorMode}`,
            },
            ".text-info": {
                color: `info.${props.colorMode}`,
            },
            ".background-info": {
                bg: `info.${props.colorMode}`,
            },
            ".border": {
                borderColor: `border.${props.colorMode}`,
            },
            "div::-webkit-scrollbar": {
                width: "0.5rem",
            },
            "div::-webkit-scrollbar-track": {
                background: "transparent",
            },
            "div::-webkit-scrollbar-thumb": {
                borderRadius: "99px",
                background: "blackAlpha.500",
            },
            ".react-document": {
                minH: "100%",
                width: "200px",
            },
            ".infinite-scroll-component__outerdiv": {
                height: "100%",
            },
            ".form-document": {
                minH: "100%",
                position: "relative",
            },
            ...editorTheme,
        }),
    },
    config: {
        initialColorMode: "light",
        useSystemColorMode: false,
    },
})

export default theme

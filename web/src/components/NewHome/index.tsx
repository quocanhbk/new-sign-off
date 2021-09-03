import { useEffect } from "react"
import Dashboard from "./Dashboard"
import { useStoreActions } from "store"
import { Box, Flex } from "@chakra-ui/react"

// // FLex w="full" h="full" p={8}
// const StyleContainer = styled.div`
//     display: flex;
//     width: 100%;
//     height: 100%;
//     padding: 2rem;
//     /* gap: 2rem; */

//     // flex-gap work around, fuck this
//     & > * + * {
//         margin-left: 2rem;
//     }
// `
// const Col = styled.div`
//     flex: 1;

//     ${props =>
//         props.right &&
//         css`
//             background: ${props =>
//                     "linear-gradient(to right," +
//                     getFader(props.theme.color.background.primary, 1) +
//                     "," +
//                     getFader(props.theme.color.background.primary, 0.8) +
//                     "," +
//                     getFader(props.theme.color.background.primary, 1) +
//                     ")"},
//                 url("/main.png");
//             background-size: contain;
//         `}
// `

const Home = () => {
    const setPath = useStoreActions(action => action.setPath)
    useEffect(() => {
        setPath("/")
    }, [setPath])
    return (
        <Flex w="full" h="full" p={8}>
            <Box w="full" pos="relative">
                <Box
                    pos="absolute"
                    top={0}
                    left={0}
                    w="full"
                    h="full"
                    zIndex={2}
                    bgGradient="linear(to-r, white, whiteAlpha.800, white)"
                >
                    <Dashboard />
                </Box>
                <Box
                    pos="absolute"
                    top={0}
                    left={0}
                    w="full"
                    h="full"
                    bgImage="url('main.png')"
                    backgroundSize="20rem"
                ></Box>
            </Box>
        </Flex>
    )
}

export default Home

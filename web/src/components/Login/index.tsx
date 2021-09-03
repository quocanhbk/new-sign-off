/* eslint-disable react/prop-types */
import { Flex, Heading, Image } from "@chakra-ui/react"
import { useStoreState } from "store"

const Login = ({ onLogin }) => {
    const theme = useStoreState(_ => _.theme)
    return (
        <Flex
            direction="column"
            align="center"
            height="100vh"
            width="full"
            background={`linear-gradient(to right, rgba(255,255,255,1), rgba(255,255,255,0.8), rgba(255,255,255,1)), url("/main.png")`}
            backgroundSize="contain"
        >
            <Flex flex={2} align="center" px={2}>
                <Image h="5rem" src={theme ? "/iconWithTextDark.svg" : "/iconWithTextLight.svg"} />
            </Flex>
            <Flex flex={8} direction="column" align="center" mt="8rem">
                <Heading fontFamily="Campton" letterSpacing={2} color="fill.light" mb={8}>
                    APPROVAL ONLINE
                </Heading>
                <Flex
                    onClick={onLogin}
                    bg="fill.light"
                    border="1px"
                    borderColor="blackAlpha.300"
                    p={4}
                    align="center"
                    rounded="md"
                    color="background.primary.light"
                    cursor="pointer"
                >
                    <Image h="2rem" src="/microsoft.svg" alt="" />
                    <Heading size="md" ml={4}>
                        Log in with Microsoft
                    </Heading>
                </Flex>
            </Flex>
        </Flex>
    )
}

export default Login

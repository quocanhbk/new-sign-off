import { useRef, useState } from "react"
import { BsPower, BsThreeDotsVertical } from "react-icons/bs"
import pageList from "pageList"
import { useStoreActions, useStoreState } from "store"
import { useMsal } from "@azure/msal-react"
import LazyImage from "components/Base/LazyImage"
import { getAvatar } from "api/user"
import { adminEmails } from "constant"
import { Box, Flex, Heading, Image, Text, VStack, useOutsideClick } from "@chakra-ui/react"

const SideBar = () => {
    const theme = useStoreState(_ => _.theme)
    const setPath = useStoreActions(_ => _.setPath)
    const path = useStoreState(_ => _.path)
    const [popup, setPopup] = useState(false)
    const { instance, accounts } = useMsal()
    const name = accounts[0].name ? accounts[0].name.split("-")[accounts[0].name.split("-").length - 1] : ""
    const popupRef = useRef<HTMLDivElement>(null)

    useOutsideClick({
        ref: popupRef,
        handler: () => setPopup(false),
    })

    return (
        <Flex direction="column" flex={5} maxW="25rem" px={4} py={2} shadow="base">
            <Flex align="center" px={2}>
                <Image h="4rem" src={theme ? "/iconNoTextDark.svg" : "/iconNoTextLight.svg"} />
                <Heading size="lg" color="fill.light" fontFamily="Campton">
                    Approval Online
                </Heading>
            </Flex>
            <Flex align="center" p={4} mt={2} mb={0} rounded="md" color="fill.primary" pos="relative" shadow="base">
                <Box rounded="full" overflow="hidden">
                    <LazyImage src={getAvatar(accounts[0].username)} size="md" />
                </Box>
                <Flex direction="column" justify="center" ml={4} flex={1}>
                    <Text fontWeight="semibold">{name}</Text>
                    <Text fontSize="sm">{accounts[0].username}</Text>
                </Flex>
                {/* <BsPower className="user-logout" size="20px" onClick={() => instance.logoutRedirect()}/> */}
                <Box userSelect="none" cursor="pointer" ref={popupRef} onClick={() => setPopup(!popup)} pos="relative">
                    <BsThreeDotsVertical size="20px" />
                    {popup && (
                        <Flex
                            onClick={() => instance.logoutRedirect()}
                            pos="absolute"
                            bg="background.primary.light"
                            shadow="base"
                            right={0}
                            top="100%"
                            transform="auto"
                            translateY="0.5rem"
                            width="10rem"
                            align="center"
                            p={2}
                            rounded="md"
                        >
                            <Box color="danger.light">
                                <BsPower size="1.2rem" />
                            </Box>
                            <Text ml={2}>Log out</Text>
                        </Flex>
                    )}
                </Box>
            </Flex>

            <VStack mt={4} color="text.secondary.light" spacing={2}>
                {pageList
                    .filter(p => !p.notVisible)
                    .filter(page => !page.admin || adminEmails.includes(accounts[0].username))
                    .map(item => (
                        <Flex
                            w="full"
                            key={item.text}
                            onClick={() => {
                                setPath(item.link)
                            }}
                            px={8}
                            py={4}
                            _hover={{ bg: "gray.100" }}
                            rounded="md"
                            cursor="pointer"
                            color={item.link === path ? "fill.light" : "inherit"}
                            fontWeight={item.link === path ? "bold" : "normal"}
                        >
                            {item.icon}
                            <Text flex={1} ml={4}>
                                {item.text}
                            </Text>
                        </Flex>
                    ))}
            </VStack>
        </Flex>
    )
}

export default SideBar

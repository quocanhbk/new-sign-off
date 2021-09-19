// * DESCRIPTION: Display user avatar, name, email, and loggout popup

import { useMsal } from "@azure/msal-react"
import { Flex, Box, Text, useOutsideClick } from "@chakra-ui/react"
import { getAvatar } from "api"
import { LazyImage } from "components/Base"
import { useRef, useState } from "react"
import { BsThreeDotsVertical, BsPower } from "react-icons/bs"

const UserCard = () => {
    const { instance, accounts } = useMsal()
    const name = accounts[0].name ? accounts[0].name.split("-")[accounts[0].name.split("-").length - 1] : ""
    const popupRef = useRef<HTMLDivElement>(null)
    const [popup, setPopup] = useState(false)
    useOutsideClick({
        ref: popupRef,
        handler: () => setPopup(false),
    })
    return (
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
    )
}

export default UserCard

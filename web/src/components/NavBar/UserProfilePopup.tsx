import { useMsal } from "@azure/msal-react"
import { getAvatar } from "api/user"
import { BsPower } from "react-icons/bs"
import { Avatar, Flex, IconButton, Text } from "@chakra-ui/react"

const UserProfilePopup = () => {
    const { instance, accounts } = useMsal()
    const name = accounts[0].name ? accounts[0].name.split("-")[accounts[0].name.split("-").length - 1] : ""

    return (
        <Flex h="full" p={4}>
            <Flex
                p={4}
                bg="white"
                border="1px"
                borderColor="gray.50"
                shadow="base"
                w="full"
                rounded="md"
                align="center"
            >
                <Avatar src={getAvatar(accounts[0].username)} size="md" />
                <Flex direction="column" ml={4}>
                    <Text fontWeight="semibold">{name}</Text>
                    <Text>{accounts[0].username}</Text>
                </Flex>
                <IconButton
                    ml="auto"
                    colorScheme="red"
                    icon={<BsPower size="1.2rem" />}
                    variant="ghost"
                    rounded="full"
                    aria-label="log-out"
                    onClick={() => instance.logout()}
                />
            </Flex>
        </Flex>
    )
}

export default UserProfilePopup

import { useState } from "react"
import { BsBellFill, BsCheck, BsEyeFill, BsFillCircleFill, BsPlayFill, BsThreeDots, BsX } from "react-icons/bs"
import { getAvatar } from "api/user"
import { Avatar, Box, chakra, Flex, IconButton, Text } from "@chakra-ui/react"

const FlowTag = ({ data, last, isCurrent, remindApprover }) => {
    const [reminded, setReminded] = useState(false)
    const genBackground = () => {
        if (data.decision === "Approved")
            return {
                color: ["green.100", "green.400"],
                icon: <BsCheck />,
            }
        if (data.decision === "Rejected")
            return {
                color: ["red.100", "red.400"],
                icon: <BsX />,
            }
        if (isCurrent)
            return {
                color: ["yellow.100", "yellow.400"],
                icon: <BsPlayFill />,
            }
        if (data.decision === "Pending")
            return {
                color: ["yellow.100", "yellow.200"],
                icon: <BsThreeDots />,
            }
        return {
            color: ["gray.100", "gray.400"],
            icon: <BsEyeFill />,
        }
    }
    const theme = genBackground()
    return (
        <tr>
            <chakra.td overflow="hidden" pos="relative">
                <Flex align="center" justify="center" p={2}>
                    <Flex
                        align="center"
                        justify="center"
                        color="gray.600"
                        rounded="full"
                        pos="relative"
                        zIndex={2}
                        background="white"
                    >
                        <BsFillCircleFill size="12px" />
                    </Flex>
                </Flex>
                <Box
                    pos="absolute"
                    left="50%"
                    top={0}
                    w="2px"
                    h={last ? "50%" : "150%"}
                    transform="translate(-50%, 0%)"
                    bg="gray.600"
                />
            </chakra.td>
            <chakra.td p={1}>
                <Flex
                    align="center"
                    rounded="md"
                    overflow="hidden"
                    bg={theme.color[0]}
                    status={data.decision}
                    isCurrent={isCurrent}
                >
                    <Flex align="center" justify="center" p={2} alignSelf="stretch" bg={theme.color[1]} color="white">
                        {theme.icon}
                    </Flex>
                    <Flex px={4} py={2} align="center" flex={1}>
                        <Avatar src={getAvatar(data.email)} size="sm" />
                        <Flex direction="column" ml={4}>
                            <Text fontSize="sm" fontWeight="semibold">
                                {data.fullname}
                            </Text>
                            <Text fontSize="xs">{data.email}</Text>
                        </Flex>
                        {data.decision === "Pending" && isCurrent && (
                            <Box ml="auto" p={2}>
                                <IconButton
                                    icon={<BsBellFill />}
                                    color="blackAlpha.900"
                                    onClick={() => {
                                        remindApprover(data.userId)
                                        setReminded(true)
                                    }}
                                    isDisabled={reminded}
                                    aria-label="remind-approve"
                                    size="sm"
                                    rounded="full"
                                    variant="ghost"
                                />
                            </Box>
                        )}
                    </Flex>
                </Flex>
            </chakra.td>
        </tr>
    )
}

export default FlowTag

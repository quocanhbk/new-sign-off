/* eslint-disable no-unused-vars */
import { useState } from "react"
import { BsChevronUp, BsChevronDown } from "react-icons/bs"
import ApprovalOpinionCard from "./ApprovalOpinionCard"
import Tippy from "@tippyjs/react"
import "tippy.js/dist/tippy.css" // optional
import "tippy.js/animations/perspective-subtle.css"
import { Box, Button, Flex, Heading, HStack } from "@chakra-ui/react"
import { useRequestContext } from "../RequestProvider"

const ApproveWindow = () => {
    const [expand, setExpand] = useState(false)

    const { setConfirmPopup, request } = useRequestContext()
    const req = request!
    return (
        <Box
            pos="relative"
            w="calc(100% - 2rem)"
            transform="translateX(1rem)"
            zIndex="banner"
            maxH={expand ? "25rem" : "3rem"}
            transition="max-height 0.25s ease-in-out"
            bg="gray.50"
            shadow="base"
            roundedTop="md"
            overflow="hidden"
        >
            <Box h="25rem">
                <Flex
                    h="3rem"
                    px={4}
                    align="center"
                    justify="space-between"
                    onClick={() => setExpand(!expand)}
                    bg="gray.900"
                    color="whiteAlpha.900"
                >
                    <Heading fontWeight="semibold" size="sm">
                        Approve Window
                    </Heading>
                    {expand ? <BsChevronDown size="1.2rem" /> : <BsChevronUp size="1.2rem" />}
                </Flex>
                <Flex direction="column" h="27rem" p={4} pb={0}>
                    <HStack spacing={4}>
                        <Tippy
                            content="Approve and close this request"
                            placement="bottom"
                            delay={250}
                            animation="perspective-subtle"
                        >
                            <Button flex={1} onClick={() => setConfirmPopup({ code: "APPROVE" })} colorScheme="green">
                                Approve
                            </Button>
                        </Tippy>
                        <Tippy
                            content="Approve with an opinion for submitter to revise later"
                            placement="bottom"
                            delay={250}
                            animation="perspective-subtle"
                        >
                            <Button
                                flex={2}
                                onClick={() => setConfirmPopup({ code: "APPROVE_WITH_OPINION" })}
                                colorScheme="yellow"
                            >
                                Approve With New Opinion
                            </Button>
                        </Tippy>
                        <Tippy
                            content="Reject and close this request"
                            placement="bottom"
                            delay={250}
                            animation="perspective-subtle"
                        >
                            <Button flex={1} onClick={() => setConfirmPopup({ code: "REJECT" })} colorScheme="red">
                                Reject
                            </Button>
                        </Tippy>
                    </HStack>
                    <Box overflow="overlay">
                        {req.opinions.map(o => (
                            <ApprovalOpinionCard
                                key={o.id}
                                opinion={o}
                                onApproveClick={id => {
                                    setConfirmPopup({ code: "APPROVE_WITH_EXISTING_OPINION", opinionId: id })
                                }}
                            />
                        ))}
                    </Box>
                </Flex>
            </Box>
        </Box>
    )
}

export default ApproveWindow

import { BsChevronRight, BsPlayFill, BsStopFill } from "react-icons/all"
import { Box, Flex, IconButton, Tag, TagLabel, TagLeftIcon, Text } from "@chakra-ui/react"

const Card = ({ title, isActive, createdBy, active, onClick }) => {
    return (
        <Flex
            mb={2}
            rounded="md"
            background="gray.50"
            shadow={active ? "md" : "base"}
            border="1px"
            borderColor={active ? "fill.light" : "transparent"}
        >
            <Flex direction="column" flex={1} py={2} px={2}>
                <Text isTruncated fontWeight="semibold" color="fill.light">
                    {title}
                </Text>
                <Text mt={1} fontSize="xs">
                    Created by: {createdBy && createdBy.name}
                </Text>
                <Box mt={2}>
                    {isActive ? (
                        <Tag colorScheme="green">
                            <TagLeftIcon as={BsPlayFill} />
                            <TagLabel>Running</TagLabel>
                        </Tag>
                    ) : (
                        <Tag colorScheme="red">
                            <TagLeftIcon as={BsStopFill} />
                            <TagLabel>Stopped</TagLabel>
                        </Tag>
                    )}
                </Box>
            </Flex>
            <Flex align="center" p={2}>
                <IconButton
                    icon={<BsChevronRight />}
                    variant="ghost"
                    rounded="full"
                    aria-label="view-detail"
                    onClick={onClick}
                />
            </Flex>
        </Flex>
    )
}

export default Card

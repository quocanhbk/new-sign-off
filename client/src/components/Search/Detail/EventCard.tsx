import LazyImage from "components/Base/LazyImage"
import { getAvatar } from "api/user"
import { Badge, Box, Flex, HStack, Text } from "@chakra-ui/react"

const EventCard = ({ createdAt, createdBy, description, last }) => {
    return (
        <Flex w="full">
            <Box mr={2}>
                <LazyImage src={getAvatar(createdBy.email)} size="sm" />
            </Box>
            <Box>
                <HStack spacing={2} align="center">
                    <Text fontWeight="semibold">{createdBy.name}</Text>
                    {last && <Badge colorScheme="blue">Last Approver</Badge>}
                    <Text fontSize="xs">{createdAt}</Text>
                </HStack>
                <Text>{description}</Text>
            </Box>
        </Flex>
    )
}

export default EventCard

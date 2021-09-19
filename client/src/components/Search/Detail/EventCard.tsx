import LazyImage from "components/Base/LazyImage"
import { getAvatar } from "api/user"
import { Badge, Box, Flex, HStack } from "@chakra-ui/react"
import { MyText } from "components/Base"

const EventCard = ({ createdAt, createdBy, description, last }) => {
    return (
        <Flex w="full">
            <Box mr={2}>
                <LazyImage src={getAvatar(createdBy.email)} size="sm" />
            </Box>
            <Box>
                <HStack spacing={2} align="center">
                    <MyText textSize="small" fontWeight="semibold">
                        {createdBy.name}
                    </MyText>
                    {last && (
                        <Badge colorScheme="blue" fontSize={["xs", "sm"]}>
                            Last Approver
                        </Badge>
                    )}
                    <MyText textSize="small">{createdAt}</MyText>
                </HStack>
                <MyText>{description}</MyText>
            </Box>
        </Flex>
    )
}

export default EventCard

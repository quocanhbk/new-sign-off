import { Flex, Text } from "@chakra-ui/react"
import { FC } from "react"
interface UserTagProps {
    jobTitle: string
    name: string
}

const PositionTag: FC<UserTagProps> = ({ jobTitle, name }) => {
    return (
        <Flex direction="column">
            <Text fontSize="sm">{jobTitle}</Text>
            <Text fontSize="xs">{name}</Text>
        </Flex>
    )
}

export default PositionTag

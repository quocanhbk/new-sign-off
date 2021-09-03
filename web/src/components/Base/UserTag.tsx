import { Flex, Text } from "@chakra-ui/react"
import { FC } from "react"
import LazyImage from "./LazyImage"
import { getAvatar } from "api/user"
interface UserTagProps {
    email: string
    name: string
}

const UserTag: FC<UserTagProps> = ({ email, name }) => {
    return (
        <Flex align="center">
            <LazyImage src={getAvatar(email)} size="2xs" />
            <Text pl={2}>{name}</Text>
        </Flex>
    )
}

export default UserTag

import { Flex, Text } from "@chakra-ui/react"
import { FC } from "react"
import LazyImage from "./LazyImage"
import { getAvatar } from "api/user"
interface UserTagProps {
    /**
     * Email of user, used to retrieve avatar
     * @type string
     */
    email: string
    /**
     * Name of user
     * @type string
     */
    name: string
}
/** Display user avatar along with name */
const UserTag: FC<UserTagProps> = ({ email, name }) => {
    return (
        <Flex align="center">
            <LazyImage src={getAvatar(email)} size="2xs" />
            <Text pl={2}>{name}</Text>
        </Flex>
    )
}

export default UserTag

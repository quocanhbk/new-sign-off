// * DESCRIPTION: Urgent tag

import { Tag, TagLeftIcon, TagLabel } from "@chakra-ui/react"
import { BsStarFill } from "react-icons/bs"

interface UrgentTagProps {
    onClick?: () => void
}

export const UrgentTag = ({ onClick }: UrgentTagProps) => {
    return (
        <Tag cursor="pointer" colorScheme="red" onClick={onClick}>
            <TagLeftIcon as={BsStarFill} />
            <TagLabel>Urgent</TagLabel>
        </Tag>
    )
}

export default UrgentTag

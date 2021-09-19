// * DESCRIPTION: Overdue request tag

import { Tag } from "@chakra-ui/react"

interface OverdueTagProps {
    /**
     * onClick handler
     * @type: () => void
     */
    onClick?: () => void
}

export const OverdueTag = ({ onClick }: OverdueTagProps) => {
    return (
        <Tag cursor="pointer" colorScheme="red" onClick={onClick}>
            Overdue
        </Tag>
    )
}

export default OverdueTag

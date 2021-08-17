// * DESCRIPTION: Request type tag

import { Tag } from "@chakra-ui/react"

interface TypeTagProps {
    type: "Flexible" | "Procedure"
    onClick?: () => void
}

export const TypeTag = ({ onClick, type }: TypeTagProps) => {
    return (
        <Tag cursor="pointer" onClick={onClick}>
            {type}
        </Tag>
    )
}

export default TypeTag

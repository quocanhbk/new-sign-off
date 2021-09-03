import { Box, Text } from "@chakra-ui/react"
import { IField } from "api"
import { forwardRef, MouseEventHandler } from "react"

interface FieldTagProps {
    readOnly?: boolean
    data: Pick<IField, "name" | "content" | "position" | "size">
    onMouseDown?: MouseEventHandler<HTMLDivElement>
    onMouseDownResizer?: MouseEventHandler<HTMLDivElement>
    fontSize?: string
}

const FieldTag = forwardRef<HTMLDivElement, FieldTagProps>(
    ({ readOnly, data, onMouseDown, onMouseDownResizer, fontSize }, ref) => {
        return (
            <Box
                zIndex="docked"
                pos="absolute"
                ref={ref}
                onMouseDown={onMouseDown}
                sx={{ fontSize: fontSize || "1rem" }}
                cursor={readOnly ? "default" : "pointer"}
                style={{
                    left: data.position.X + "%",
                    top: data.position.Y + "%",
                    width: data.size.width + "%",
                    height: data.size.height + "%",
                }}
                minW="6rem"
                minH="2rem"
            >
                {!readOnly && (
                    <Box
                        pos="absolute"
                        cursor="se-resize"
                        right={0}
                        bottom={0}
                        h="8px"
                        w="8px"
                        rounded="full"
                        transform="translate(45%, 45%)"
                        bg="white"
                        border="2px"
                        borderColor="#3F3CFF"
                        onMouseDown={onMouseDownResizer}
                    />
                )}
                <Text pos="absolute" top={0} transform="translateY(-100%)" fontSize="xs">
                    {data.name}
                </Text>
                <Text>{data.content}</Text>
                <Box
                    pos="absolute"
                    top={0}
                    left={0}
                    w="full"
                    h="full"
                    rounded="base"
                    bg="#1B97FC39"
                    zIndex="-1"
                    border={readOnly ? "0px" : "1px"}
                    borderColor="#3F3CFF"
                />
            </Box>
        )
    }
)

export default FieldTag

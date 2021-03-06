import { chakra } from "@chakra-ui/react"
import { MyText } from "components/Base"
interface InfoLineProps {
    headline: string
    content?: string | number
    span?: boolean
}

const InfoLine = ({ headline, content, span }: InfoLineProps) => {
    return (
        <chakra.tr>
            <chakra.td
                verticalAlign="top"
                pb={1}
                pos="relative"
                pl={4}
                _before={{
                    content: `""`,
                    pos: "absolute",
                    w: "5px",
                    h: "5px",
                    rounded: "full",
                    left: 0,
                    top: "50%",
                    transform: "translateY(-50%)",
                    bg: "gray.800",
                }}
                colSpan={span ? 2 : 1}
            >
                <MyText>{headline}</MyText>
            </chakra.td>
            {content ? (
                <chakra.td textAlign="right">
                    <MyText>{content}</MyText>
                </chakra.td>
            ) : null}
        </chakra.tr>
    )
}

export default InfoLine

// * DESCRIPTION:
import { TextProps, HeadingProps, Text, Heading } from "@chakra-ui/react"

interface MyTextProps extends TextProps {
    textSize?: "large" | "medium" | "small"
}

export const MyText = ({ textSize = "medium", ...rest }: MyTextProps) => {
    const size = textSize === "large" ? ["lg", "xl"] : textSize === "small" ? ["xs", "sm"] : ["sm", "md"]
    return <Text fontSize={size} {...rest} />
}

interface MyHeadingProps extends HeadingProps {
    textSize?: "large" | "medium"
}

export const MyHeading = ({ textSize = "medium", ...rest }: MyHeadingProps) => {
    const size = textSize === "medium" ? ["lg", "xl"] : ["2xl", "3xl"]
    return <Heading fontSize={size} {...rest} />
}

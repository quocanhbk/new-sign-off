import { FC } from "react"
import { Box, Flex, Heading } from "@chakra-ui/react"
interface SectionContainerProps {
    title: string
    children: JSX.Element[] | JSX.Element | string
}

const SectionContainer: FC<SectionContainerProps> = ({ title, children }) => {
    return (
        <Flex direction="column" mb={2}>
            <Heading size="sm" fontWeight="bold" color="fill.light" mb={1}>
                {title}
            </Heading>
            <Box>{children}</Box>
        </Flex>
    )
}

export default SectionContainer

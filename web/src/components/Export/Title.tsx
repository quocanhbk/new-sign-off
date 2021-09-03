import { Box, Flex, Heading } from "@chakra-ui/react"

const Title = ({ qrCode, title }) => {
    return (
        <Flex borderBottom="1px" borderColor="gray.200" align="center" mb={4}>
            <Heading flex={1} fontWeight="semibold" color="fill.light">
                {title}
            </Heading>
            <Box ml={2}>
                <img src={qrCode} width={56} height={56} alt="qrcode" onLoad={() => window.print()} />
            </Box>
        </Flex>
    )
}

export default Title

import { FC } from "react"
import { BsInfoCircle, BsXCircle } from "react-icons/bs"
import { Box, Flex, Text } from "@chakra-ui/react"
import { RouteComponentProps } from "@reach/router"

const types = [
    { id: "NOT_FOUND", text: "Data not found", sub: "Try again later", Icon: BsXCircle, color: "red.500" },
    {
        id: "PROCEDURE_NOT_SELECTED",
        text: "Select procedure to view",
        sub: "No procedure is selected",
        Icon: BsInfoCircle,
        color: "base",
    },
    {
        id: "FORM_NOT_SELECTED",
        text: "Select form to view",
        sub: "No form is selected",
        Icon: BsInfoCircle,
        color: "base",
    },
    {
        id: "REQUEST_NOT_SELECTED",
        text: "Select request to view",
        sub: "No request is selected",
        Icon: BsInfoCircle,
        color: "base",
    },
]

interface PlaceholderProps extends RouteComponentProps {
    type: "NOT_FOUND" | "PROCEDURE_NOT_SELECTED" | "FORM_NOT_SELECTED" | "REQUEST_NOT_SELECTED"
}

const Placeholder: FC<PlaceholderProps> = ({ type }) => {
    const myType = types.find(_ => _.id === type)

    return myType ? (
        <Flex pos="absolute" top={0} left={0} h="full" w="full" align="center" justify="center" direction="column">
            <Box color={myType.color}>
                <myType.Icon size="3rem" />
            </Box>
            <Text mt={2}>{myType.text}</Text>
            <Text fontWeight="thin">{myType.sub}</Text>
        </Flex>
    ) : null
}

export default Placeholder

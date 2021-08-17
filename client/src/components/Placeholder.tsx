import { FC } from "react"
import { BsInfoCircle, BsX } from "react-icons/bs"
import { Flex } from "@chakra-ui/react"
import { RouteComponentProps } from "@reach/router"

const types = [
    { id: "NOT_FOUND", text: "Data not found", sub: "Try again later", Icon: BsX, color: "danger" },
    {
        id: "PROCEDURE_NOT_SELECTED",
        text: "Select procedure to view",
        sub: "No procedure is selected",
        Icon: BsInfoCircle,
        color: "secondary",
    },
    {
        id: "FORM_NOT_SELECTED",
        text: "Select form to view",
        sub: "No form is selected",
        Icon: BsInfoCircle,
        color: "secondary",
    },
    {
        id: "REQUEST_NOT_SELECTED",
        text: "Select request to view",
        sub: "No request is selected",
        Icon: BsInfoCircle,
        color: "secondary",
    },
]

interface PlaceholderProps extends RouteComponentProps {
    type: "NOT_FOUND" | "PROCEDURE_NOT_SELECTED" | "FORM_NOT_SELECTED" | "REQUEST_NOT_SELECTED"
}

const Placeholder: FC<PlaceholderProps> = ({ type }) => {
    const myType = types.find(_ => _.id === type)

    return myType ? (
        <Flex pos="absolute" top={0} left={0} h="full" w="full" align="center" justify="center" direction="column">
            <myType.Icon size="3rem" />
            <p className="headline">{myType.text}</p>
            <p className="sub">{myType.sub}</p>
        </Flex>
    ) : null
}

export default Placeholder

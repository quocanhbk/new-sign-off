import { navigate } from "@reach/router"
import { BsChevronLeft } from "react-icons/bs"
import { Button, Flex, Heading, IconButton } from "@chakra-ui/react"
import { Id } from "types"

interface HeaderProps {
    onSubmit: () => void
    id?: Id
}

const Header = ({ onSubmit, id }: HeaderProps) => {
    return (
        <Flex p={4} align="center" borderBottom="1px" borderColor="gray.200">
            <IconButton
                icon={<BsChevronLeft size="1.2rem" />}
                aria-label="go-back"
                onClick={() => navigate("/form")}
                rounded="full"
                variant="ghost"
            />
            <Heading ml={2} color="fill.light" fontWeight="semibold">
                {id ? "Edit Procedure" : "Create Procedure"}
            </Heading>
            <Button onClick={onSubmit} ml="auto">
                Submit
            </Button>
        </Flex>
    )
}

export default Header

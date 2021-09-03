import { Flex, Heading, HStack, IconButton } from "@chakra-ui/react"
import { BsPen, BsTrash } from "react-icons/bs"

interface HeaderProps {
    title: string
    onDeleteClick: () => void
    onEditClick: () => void
}

const Header = ({ title, onDeleteClick, onEditClick }: HeaderProps) => {
    return (
        <Flex justify="space-between" align="center" p={4} borderBottom="1px" borderColor="gray.200">
            <Heading color="fill.light" fontWeight="semibold">
                {title}
            </Heading>
            <HStack>
                <IconButton
                    icon={<BsPen />}
                    rounded="full"
                    onClick={onEditClick}
                    aria-label="edit-form"
                    title="Edit this form"
                />
                <IconButton
                    colorScheme="red"
                    icon={<BsTrash />}
                    rounded="full"
                    onClick={onDeleteClick}
                    aria-label="delete-form"
                    title="Delete this form"
                />
            </HStack>
        </Flex>
    )
}

export default Header

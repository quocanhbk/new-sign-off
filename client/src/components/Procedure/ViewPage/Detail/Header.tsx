import { Flex, FormLabel, Heading, HStack, IconButton, Switch } from "@chakra-ui/react"
import { BsPen, BsTrash } from "react-icons/bs"

interface HeaderProps {
    title: string
    isActive: boolean
    onDeleteClick: () => void
    onEditClick: () => void
    onToggleActive: (checked: boolean) => void
}

const Header = ({ title, isActive, onDeleteClick, onEditClick, onToggleActive }: HeaderProps) => {
    return (
        <Flex justify="space-between" align="center" p={4} borderBottom="1px" borderColor="gray.200">
            <Heading color="fill.light" fontWeight="semibold">
                {title}
            </Heading>
            <HStack>
                <Flex py={2} px={4} rounded="full" bg={"gray.100"} align="center">
                    <FormLabel htmlFor="email-alerts" mb="0">
                        {isActive ? "Running" : "Stopped"}
                    </FormLabel>
                    <Switch colorScheme="green" isChecked={isActive} onChange={e => onToggleActive(e.target.checked)} />
                </Flex>
                <IconButton
                    icon={<BsPen />}
                    rounded="full"
                    onClick={onEditClick}
                    aria-label="edit-procedure"
                    title="Edit this procedure"
                />
                <IconButton
                    colorScheme="red"
                    icon={<BsTrash />}
                    rounded="full"
                    onClick={onDeleteClick}
                    aria-label="delete-procedure"
                    title="Delete this procedure"
                />
            </HStack>
        </Flex>
    )
}

export default Header

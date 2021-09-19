import {
    Flex,
    FormLabel,
    Heading,
    HStack,
    Button,
    Switch,
    useOutsideClick,
    Box,
    Collapse,
    VStack,
    IconButton,
} from "@chakra-ui/react"
import { useUserRoles } from "hooks"
import { useRef, useState } from "react"
import { BsPen, BsThreeDots, BsTrash } from "react-icons/bs"

interface HeaderProps {
    title: string
    isActive: boolean
    onDeleteClick: () => void
    onEditClick: () => void
    onActivateProcedure: () => void
}

const Header = ({ title, isActive, onDeleteClick, onEditClick, onActivateProcedure }: HeaderProps) => {
    const userRoles = useUserRoles()
    const [morePopup, setMorePopup] = useState(false)
    const moreButtonRef = useRef<HTMLDivElement>(null)
    useOutsideClick({
        ref: moreButtonRef,
        handler: () => setMorePopup(false),
    })
    return (
        <Flex justify="space-between" align="center" p={4} borderBottom="1px" borderColor="gray.200">
            <Heading color="fill.light" fontWeight="semibold">
                {title}
            </Heading>
            <HStack>
                {userRoles.canActivateProcedure && (
                    <Flex py={2} px={4} rounded="full" bg={"gray.100"} align="center">
                        <FormLabel htmlFor="email-alerts" mb="0">
                            {isActive ? "Running" : "Stopped"}
                        </FormLabel>
                        <Switch colorScheme="green" isChecked={isActive} onChange={() => onActivateProcedure()} />
                    </Flex>
                )}
                <Box pos="relative" ref={moreButtonRef}>
                    <IconButton
                        icon={<BsThreeDots />}
                        aria-label="more"
                        rounded="full"
                        colorScheme="gray"
                        bg="white"
                        onClick={() => setMorePopup(!morePopup)}
                    />
                    <Box pos="absolute" right={0} top="100%" transform="translateY(0.5rem)">
                        <Collapse in={morePopup} animateOpacity unmountOnExit>
                            <Box p={2} rounded="md" bg="gray.50" shadow="base">
                                <VStack align="flex-start">
                                    <Button size="sm" variant="ghost" leftIcon={<BsPen />} onClick={onEditClick}>
                                        Edit
                                    </Button>
                                    <Button
                                        size="sm"
                                        variant="ghost"
                                        leftIcon={<BsTrash />}
                                        onClick={onDeleteClick}
                                        colorScheme="red"
                                    >
                                        Delete
                                    </Button>
                                </VStack>
                            </Box>
                        </Collapse>
                    </Box>
                </Box>
            </HStack>
        </Flex>
    )
}

export default Header

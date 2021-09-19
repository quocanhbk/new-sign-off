import { format } from "date-fns"
import { BsChevronLeft, BsDownload, BsPen, BsThreeDots, BsTrash, BsX } from "react-icons/bs"
import { navigate } from "@reach/router"
import useMediaQuery from "hooks/useMediaQuery"
import { useMsal } from "@azure/msal-react"
import { StatusTag, TypeTag } from "components/Base/Tags"
import { useRef, useState } from "react"
import { DeviceRenderer, MyHeading, MyText } from "components/Base"
import { Flex, HStack, IconButton, Box, Collapse, useOutsideClick, VStack, Button } from "@chakra-ui/react"
import { useRequestContext } from "./RequestProvider"
import { useUserRoles } from "hooks"

const Header = () => {
    // const { id, title, status, type, updatedAt, submitter } = request
    const { request: req, id, mode, setPopup } = useRequestContext()
    const { submitter, updatedAt, title, status, type } = req!
    let device = useMediaQuery()
    const userRoles = useUserRoles()
    const { accounts } = useMsal()
    const [morePopup, setMorePopup] = useState(false)
    const isAuthor = () => accounts[0].username === submitter[0].email
    const moreButtonRef = useRef<HTMLDivElement>(null)
    useOutsideClick({
        ref: moreButtonRef,
        handler: () => setMorePopup(false),
    })

    const genButton = () => {
        let buttons: React.ReactNode[] = []
        if (device !== "PC") return []
        if (mode === "search") {
            if (status === "Draft" && isAuthor()) {
                buttons.push(
                    <Button
                        key="edit"
                        leftIcon={<BsPen />}
                        size="sm"
                        variant="ghost"
                        onClick={() => navigate("/draft/" + id)}
                    >
                        Edit
                    </Button>,
                    <Button
                        key="delete"
                        leftIcon={<BsTrash />}
                        size="sm"
                        colorScheme="red"
                        variant="ghost"
                        onClick={() => setPopup("delete")}
                    >
                        Delete
                    </Button>
                )
            } else if (status === "Revising" && accounts[0].username === submitter[0].email) {
                buttons.push(
                    <Button
                        key="revise"
                        leftIcon={<BsPen />}
                        size="sm"
                        variant="ghost"
                        onClick={() => navigate("/revise/" + id)}
                    >
                        Revise
                    </Button>
                )
            }
        }
        if (status === "Pending" && userRoles.canCancelRequest && mode === "search") {
            buttons.push(
                <Button
                    key="cancel"
                    leftIcon={<BsX />}
                    size="sm"
                    variant="ghost"
                    colorScheme="red"
                    onClick={() => setPopup("cancel")}
                >
                    Cancel
                </Button>
            )
        }
        if (status === "Approved") {
            buttons.push(
                <Button
                    key="export"
                    leftIcon={<BsDownload />}
                    size="sm"
                    variant="ghost"
                    as="a"
                    target="_blank"
                    rel="noreferrer"
                    href={`/export/${id}`}
                >
                    Export
                </Button>
            )
        }
        return buttons
    }
    const buttons = genButton()
    return (
        <Flex borderBottom="1px" borderColor="gray.200" pl={2} align="center">
            <DeviceRenderer device="PHONE">
                <IconButton
                    icon={<BsChevronLeft />}
                    aria-label="back"
                    variant="ghost"
                    rounded="full"
                    onClick={() => navigate("/" + mode)}
                />
            </DeviceRenderer>
            <Flex flex={1} p={4} align="center">
                <Flex direction="column" flex={1}>
                    <MyText mb={2} textSize="small">
                        {format(updatedAt as Date, "'Last updated at ' HH:mm dd/MM/yyyy")}
                    </MyText>
                    <MyHeading mb={2} fontWeight="semibold" color="fill.light">
                        {title}
                    </MyHeading>
                    <HStack spacing={2}>
                        <StatusTag readOnly status={status} />
                        <TypeTag type={type} />
                    </HStack>
                </Flex>
                {buttons.length > 0 && (
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
                                    <VStack align="flex-start">{genButton()}</VStack>
                                </Box>
                            </Collapse>
                        </Box>
                    </Box>
                )}
            </Flex>
        </Flex>
    )
}

export default Header

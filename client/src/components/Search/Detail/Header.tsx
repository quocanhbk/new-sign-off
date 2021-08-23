import { format } from "date-fns"
import { BsChevronLeft, BsDownload, BsPen, BsTrash, BsX } from "react-icons/bs"
import { navigate } from "@reach/router"
import useMediaQuery from "hooks/useMediaQuery"
import { admins } from "constant"
import { useMsal } from "@azure/msal-react"
import { StatusTag, TypeTag } from "components/Base/Tags"
import { useQuery } from "react-query"
import { getUsers, IUser } from "api"
import { useState } from "react"
import { DeviceRenderer } from "components/Base"
import { Flex, Heading, HStack, IconButton, Text } from "@chakra-ui/react"
import { useRequestContext } from "./RequestProvider"

const Header = () => {
    // const { id, title, status, type, updatedAt, submitter } = request
    const { request: req, id, mode, setPopup } = useRequestContext()
    const { submitter, updatedAt, title, status, type } = req!
    let device = useMediaQuery()
    const [currentUser, setCurrentUser] = useState<IUser>()
    const { accounts } = useMsal()
    useQuery("users", getUsers, {
        onSuccess: data => setCurrentUser(data.find(u => u.email === accounts[0].username)),
    })
    const isAuthor = () => accounts[0].username === submitter[0].email
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
            <Flex flex={1} p={4}>
                <Flex direction="column" flex={1}>
                    <Text fontSize="sm" mb={2}>
                        {format(updatedAt as Date, "'Last updated at ' HH:mm dd/MM/yyyy")}
                    </Text>
                    <Heading size="md" mb={2} fontWeight="semibold" color="fill.light">
                        {title}
                    </Heading>
                    <HStack spacing={2}>
                        <StatusTag readOnly status={status} />
                        <TypeTag type={type} />
                    </HStack>
                </Flex>
                <HStack>
                    {device === "PC" &&
                        mode === "search" &&
                        (status === "Draft" && isAuthor() ? (
                            <>
                                <IconButton
                                    icon={<BsPen />}
                                    aria-label="edit-request"
                                    rounded="full"
                                    colorScheme="blue"
                                    onClick={() => navigate("/draft/" + id)}
                                    title="Edit this request"
                                />
                                <IconButton
                                    icon={<BsTrash />}
                                    aria-label="delete-request"
                                    rounded="full"
                                    colorScheme="red"
                                    onClick={() => setPopup("delete")}
                                    title="Delete this request"
                                />
                            </>
                        ) : status === "Revising" && accounts[0].username === submitter[0].email ? (
                            <IconButton
                                icon={<BsPen />}
                                aria-label="revise-request"
                                rounded="full"
                                colorScheme="blue"
                                onClick={() => navigate("/revise/" + id)}
                                title="Revise this request"
                            />
                        ) : null)}
                    {device === "PC" &&
                        status === "Pending" &&
                        admins.includes((currentUser?.id as string) || "") &&
                        mode === "search" && (
                            <IconButton
                                icon={<BsX />}
                                aria-label="delete-request"
                                rounded="full"
                                colorScheme="red"
                                onClick={() => setPopup("cancel")}
                                title="Cancel this request"
                            />
                        )}
                    {device === "PC" && status === "Approved" && (
                        <IconButton
                            as="a"
                            href={`/export/${id}`}
                            target="_blank"
                            rel="noreferrer"
                            aria-label="export-request"
                            icon={<BsDownload />}
                            rounded="full"
                            colorScheme="blue"
                            title="Request this request"
                        />
                    )}
                </HStack>
            </Flex>
        </Flex>
    )
}

export default Header

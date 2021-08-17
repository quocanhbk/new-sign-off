// * DESCRIPTION: use to display request in a list

import { memo } from "react"
import { BsChevronRight, BsDot } from "react-icons/all"
import { navigate } from "@reach/router"
import { OverdueTag, StatusTag, TypeTag, UrgentTag } from "components/Base/Tags"
import { Flex, HStack, IconButton, Text } from "@chakra-ui/react"
import { IRequestItem } from "api"
import { RequestQueryKey } from "./useRequestQuery"

const formatDate = dateString => {
    let date = new Date(dateString)
    return date.getDate() + "/" + (date.getMonth() + 1) + "/" + date.getFullYear()
}

interface RequestCardProps {
    page: "search" | "sign"
    active: boolean
    data: IRequestItem
    setQueryParam: (field: RequestQueryKey, value: string | null, text: string) => void
}

const Card = ({ page, active, data, setQueryParam }: RequestCardProps) => {
    const { id, title, status, priority, type, deadline, author } = data
    const overdue = new Date(deadline).getTime() < new Date().getTime()
    return (
        <Flex shadow="base" rounded="md" bg={active ? "gray.100" : "gray.50"} mb={2}>
            <Flex direction="column" flex={1} py={2} px={2}>
                <Text isTruncated fontWeight="semibold" color="fill.light">
                    {title}
                </Text>
                <HStack spacing={1} mt={1}>
                    <Text fontSize="xs" onClick={() => setQueryParam("createdBy", author.id.toString(), author.name)}>
                        {author.name}
                    </Text>
                    {(status === "Pending" || status === "Revising") && (
                        <>
                            <BsDot size="0.8rem" />
                            <Text fontSize="xs">Deadline: {formatDate(deadline)}</Text>
                        </>
                    )}
                </HStack>
                <HStack spacing={2} mt={2}>
                    <StatusTag status={status} onClick={() => setQueryParam("status", status, status)} />
                    <TypeTag onClick={() => setQueryParam("type", type, type)} type={type} />
                    {priority === "Urgent" && status === "Pending" && (
                        <UrgentTag onClick={() => setQueryParam("priority", priority, priority)} />
                    )}
                    {overdue && <OverdueTag />}
                </HStack>
            </Flex>
            <Flex align="center" p={2}>
                <IconButton
                    icon={<BsChevronRight />}
                    variant="ghost"
                    rounded="full"
                    aria-label="view-detail"
                    onClick={() => navigate(`/${page}/${id}`)}
                />
            </Flex>
        </Flex>
    )
}

// memo is a higher order component that help reduces render times
export default memo(Card)

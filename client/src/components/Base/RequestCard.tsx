// * DESCRIPTION: use to display request in a list

import { memo } from "react"
import { BsChevronRight, BsDot } from "react-icons/all"
import { navigate } from "@reach/router"
import { OverdueTag, StatusTag, TypeTag, UrgentTag } from "components/Base/Tags"
import { Box, Flex, HStack, IconButton, Text } from "@chakra-ui/react"
import { IRequestItem } from "api"
import { RequestQueryKey } from "../Search/List/useRequestQuery"
import { format } from "date-fns"

interface RequestCardProps {
    page: "search" | "sign"
    active?: boolean
    data: IRequestItem
    setQueryParam?: (field: RequestQueryKey, value: string | null, text: string) => void
}

const RequestCard = memo(({ page, active, data, setQueryParam }: RequestCardProps) => {
    const { id, title, status, priority, type, deadline, author } = data
    const overdue = deadline && data.status === "Pending" ? new Date(deadline).getTime() < new Date().getTime() : false
    return (
        <Flex
            shadow={active ? "md" : "base"}
            border="1px"
            borderColor={active ? "fill.light" : "transparent"}
            rounded="md"
            bg="gray.50"
            mb={2}
            overflow="hidden"
            w="full"
        >
            <Box flex={1} overflow="hidden">
                <Flex direction="column" py={2} px={2} w="full" className="Flex">
                    <Text isTruncated fontWeight="semibold" color="fill.light" w="full" maxw="3rem">
                        {title}
                    </Text>
                    <HStack spacing={1} mt={1}>
                        <Text
                            fontSize="xs"
                            onClick={() =>
                                setQueryParam && setQueryParam("createdBy", author.id.toString(), author.name)
                            }
                        >
                            {author.name}
                        </Text>
                        {(status === "Pending" || status === "Revising") && deadline && (
                            <>
                                <BsDot size="0.8rem" />
                                <Text fontSize="xs">Deadline: {format(new Date(deadline), "dd/MM/yyyy")}</Text>
                            </>
                        )}
                    </HStack>
                    <HStack spacing={2} mt={2}>
                        <StatusTag
                            status={status}
                            onClick={() => setQueryParam && setQueryParam("status", status, status)}
                        />
                        <TypeTag onClick={() => setQueryParam && setQueryParam("type", type, type)} type={type} />
                        {priority === "Urgent" && status === "Pending" && (
                            <UrgentTag onClick={() => setQueryParam && setQueryParam("priority", priority, priority)} />
                        )}
                        {overdue && <OverdueTag />}
                    </HStack>
                </Flex>
            </Box>

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
})

export default RequestCard

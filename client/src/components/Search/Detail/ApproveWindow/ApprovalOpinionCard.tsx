import { BsCheckCircle } from "react-icons/bs"
import { getAvatar, getUsers, IUser } from "api/user"
import { useQuery } from "react-query"
import { useState } from "react"
import { Avatar, Box, Button, chakra, Flex, Text, VStack } from "@chakra-ui/react"

function ApprovalOpinionCard({ opinion, onApproveClick }) {
    const [curUser, setCurUser] = useState<Pick<IUser, "id" | "email" | "name">>()
    const { data: users } = useQuery("users", () => getUsers(), {
        onSuccess: users => setCurUser(users.find(_ => _.id === opinion.createdBy)),
    })
    return users ? (
        <Flex px={4} py={2} bg="white" rounded="md" shadow="base" w="full">
            <Avatar size="sm" src={getAvatar(curUser ? curUser.email : "")} />
            <Flex direction="column" flex={1} ml={4}>
                <Text fontWeight="semibold">{curUser ? curUser.name : ""}</Text>
                <Text>{opinion.comment}</Text>
                <VStack mt={2}>
                    {opinion.inAgreement.map(userId => (
                        <Flex key={userId} align="center" w="full">
                            <Box color="green.500">
                                <BsCheckCircle />
                            </Box>
                            <Avatar
                                ml={2}
                                size="xs"
                                src={getAvatar(users.find(u => u.id === userId)!.email, { resolution: "48x48" })}
                            />
                            <Text ml={2} fontSize="xs">
                                <chakra.span fontWeight="semibold">
                                    {users.find(u => u.id === userId)!.name}
                                </chakra.span>{" "}
                                approved with this opinion
                            </Text>
                        </Flex>
                    ))}
                </VStack>
            </Flex>
            {!opinion.isFinal && (
                <Button colorScheme="yellow" variant="ghost" size="sm" onClick={() => onApproveClick(opinion.id)}>
                    Approve With This Opinion
                </Button>
            )}
        </Flex>
    ) : null
}

export default ApprovalOpinionCard

import { getRequests } from "api/request"
import { useQuery } from "react-query"
import { RequestCard } from "components/Base"
import { Box, Flex, Text } from "@chakra-ui/react"

const DashboardBody = () => {
    const { data: requests, isLoading } = useQuery("dashboard_request", () => getRequests("start=0&end=5&sign=true"))
    return (
        <Flex direction="column" w="80%" minW="15rem" align="center" mt={8}>
            {requests && requests.length > 0 ? (
                <Flex direction="column" align="center">
                    <Text fontSize="xl" color="yellow.400">
                        You have documents to sign
                    </Text>
                    <Flex direction="column" maxW="25rem" p={4}>
                        {requests.map(req => (
                            <RequestCard page="sign" key={req.id} data={req} />
                        ))}
                    </Flex>
                </Flex>
            ) : isLoading === false ? (
                <Box>
                    <Text color="green.400" fontSize="xl">
                        All documents are signed !
                    </Text>
                </Box>
            ) : null}
        </Flex>
    )
}

export default DashboardBody
